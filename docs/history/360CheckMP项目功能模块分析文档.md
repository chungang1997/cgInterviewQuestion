# 360CheckMP 项目功能模块分析文档

## 功能模块

#### 负责功能模块：

- **待派发工单系统**
- **核查记录管理**
- **用户认证与权限**
- **文件上传组件**
- **个人中心功能**

#### 关键代码实现：

##### 1.1 待派发工单 Hook（useWaitDistribute.ts）

```typescript
import { useUserStore } from "@/store/user";
import { unAssignEvents } from "@/api/home";
import { ref } from "vue";

/**
 * 待派发工单列表
 * @returns
 */
export const useWaitDistribute = () => {
  const userUser = useUserStore();
  const data = ref<any[]>([]);
  const total = ref(0);
  const size = ref(5);

  /**
   * 下拉加载更多
   */
  const lower = async () => {
    if (data.value.length >= total.value) {
      return;
    }
    size.value += 5;
    await getList();
  };

  // 获取未核查的事件
  const getList = async () => {
    const res = await unAssignEvents({
      areaCode: userUser.loginInfo?.regionCode,
      size: size.value,
    });
    data.value = res.list;
    total.value = res.total;
  };

  const openMap = (val: any) => {
    uni.openLocation({
      longitude: Number(val.workLongitude),
      latitude: Number(val.workLatitude),
      name: "作业地点",
      address: val.workAddr,
    });
  };

  return {
    data,
    total,
    size,
    getList,
    lower,
    openMap,
    reset,
  };
};
```

**注意事项：**

- 使用分页加载机制，避免一次性加载大量数据
- 集成地图功能，需要确保小程序具有位置权限
- 状态管理使用 Pinia，注意响应式数据的正确使用

##### 1.2 派单 API 接口（waitDistribute/index.ts）

```typescript
import request from "@/utils/request";

/**
 * 未派发事件详情
 * @param id
 * @returns
 */
export const getEventInfo = (id: string) => {
  return request.get(`/web/wx/checkHome/getEventInfo/${id}`);
};

/**
 * 未派发事件的派单
 * @param data
 * @returns
 */
export const dispatchCheck = (data: {
  checkId: string;
  childEventIds: Array<string>;
  eventId: string;
  linkType: number;
  userId: string;
}) => {
  return request.post(`/web/wx/checkHome/dispatchCheck`, data);
};
```

**注意事项：**

- API 接口统一使用封装的 request 工具
- 参数类型定义清晰，便于维护
- 错误处理在 request 层统一处理

##### 1.3 视频上传组件（uploadVideo/index.vue）

```vue
<template>
  <view class="file_list_box">
    <view class="item_box" v-for="(item, index) in fileList" :key="index">
      <video class="item_data" :src="item.url"></video>
      <image class="item_btn" :src="delIcon" @click="delFile(item, index)" />
    </view>
    <image
      v-if="fileList.length < limit"
      class="item_box"
      :src="addIcon"
      @click="addFile"
    />
  </view>
</template>
```

**注意事项：**

- 支持多文件上传，有数量限制
- 提供删除功能，用户体验友好
- 视频预览功能完整

##### 1.4 请求工具封装（utils/request.ts）

```typescript
import { useUserStore } from "@/store/user/index";
import config from "./config";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { loginCode } = storeToRefs(userStore);

export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

class Request {
  public request(method: MethodType, url: string, data?: any) {
    const loginInfo = userStore.getLoginInfo();
    return new Promise((resolve, reject) => {
      // 统一处理请求头、错误处理等
    });
  }
}
```

**注意事项：**

- 统一的请求响应格式
- 自动添加用户认证信息
- 完善的错误处理机制
- 支持重复登录检测

## 核心功能模块

### 1. 待派发工单系统

- **功能描述**：管理未分配的工单，支持派单、关联、创建等操作
- **主要文件**：
  - `src/subPackages/waitDistribute/`
  - `src/api/waitDistribute/`
  - `src/pages/home/hooks/useWaitDistribute.ts`

### 2. 核查记录管理

- **功能描述**：核查记录的创建、编辑、查看、审核等功能
- **主要文件**：
  - `src/subPackages/checkRecord/`
  - `src/api/checkRecord/`

### 3. 文件上传系统

- **功能描述**：支持图片、视频、音频等多媒体文件上传
- **主要文件**：
  - `src/components/uploadImage/`
  - `src/components/uploadVideo/`
  - `src/components/uploadAudio/`

### 4. 用户认证与权限

- **功能描述**：用户登录、权限验证、状态管理
- **主要文件**：
  - `src/pages/login/`
  - `src/store/user/`
  - `src/utils/request.ts`

## 开发注意事项

### 1. 代码规范

- 使用 TypeScript 进行类型约束
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- API 接口统一使用封装的 request 工具

### 2. 性能优化

- 使用分包加载，减少主包体积
- 图片资源使用适当的压缩和格式
- 列表数据采用分页加载
- 合理使用缓存机制

### 3. 用户体验

- 提供加载状态提示
- 错误信息友好展示
- 支持下拉刷新和上拉加载
- 文件上传提供进度反馈

### 4. 安全考虑

- 用户登录状态检查
- API 接口权限验证
- 敏感信息加密传输
- 防止重复提交

### 5. 兼容性

- 小程序平台兼容性测试
- 不同设备屏幕适配
- 网络异常处理
- 版本更新机制
