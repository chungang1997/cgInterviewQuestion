# 360 安全大屏项目技术分析文档

## 📋 项目概述

**项目名称**：360safeBigScreen（360 安全大屏）  
**项目类型**：安全管理数据可视化大屏系统  
**应用场景**：针对动火作业、安全检查、隐患管理等安全管理的三级（省/市/县）数据展示平台

## 🛠️ 技术栈分析

### 前端核心技术

| 技术             | 版本                     | 用途                               |
| ---------------- | ------------------------ | ---------------------------------- |
| **Vue.js**       | 3.5.3                    | 前端核心框架，使用 Composition API |
| **TypeScript**   | 5.5.3                    | 类型安全，增强代码可维护性         |
| **Vite**         | 5.4.1                    | 现代化构建工具，快速热更新         |
| **Pinia**        | 2.2.2                    | 状态管理，替代 Vuex                |
| **Vue Router**   | 4.x                      | 路由管理                           |
| **Element Plus** | 2.8.2                    | UI 组件库                          |
| **ECharts**      | 5.5.1 + ECharts GL 2.0.9 | 数据可视化图表                     |

### 工具链与依赖

| 类别             | 技术                        | 版本    | 说明               |
| ---------------- | --------------------------- | ------- | ------------------ |
| **包管理器**     | pnpm                        | -       | 高性能包管理工具   |
| **CSS 预处理器** | Sass                        | 1.78.0  | 样式预处理         |
| **HTTP 客户端**  | Axios                       | 1.7.7   | API 请求           |
| **时间处理**     | DayJS                       | 1.11.13 | 轻量级时间库       |
| **动画**         | Animate.css                 | 4.1.1   | CSS 动画库         |
| **响应式适配**   | postcss-px-to-viewport      | 1.1.1   | 像素到视口单位转换 |
| **数据持久化**   | pinia-plugin-persistedstate | 4.0.0   | Pinia 状态持久化   |

## 🏗️ 项目架构

### 目录结构

```
360safeBigScreen/
├── src/
│   ├── api/                    # API接口定义
│   │   ├── home/              # 主页相关API
│   │   ├── work_order/        # 工单管理API
│   │   ├── certificate/       # 证书管理API
│   │   └── ...               # 其他业务模块API
│   ├── components/            # 组件库
│   │   ├── Province/         # 省级页面组件
│   │   ├── CenterBox/        # 中心区域组件
│   │   ├── Map/              # 地图组件
│   │   └── ...              # 其他公共组件
│   ├── views/                # 页面视图
│   ├── store/                # Pinia状态管理
│   ├── router/               # 路由配置
│   ├── utils/                # 工具函数
│   ├── assets/               # 静态资源
│   └── style/                # 全局样式
├── public/                   # 公共资源
├── package.json             # 项目依赖配置
├── vite.config.ts           # Vite配置
└── tsconfig.json           # TypeScript配置
```

### 核心架构特点

1. **多级展示架构**：支持省/市/县三级数据展示切换
2. **组件化设计**：高度模块化的组件结构，便于维护
3. **响应式布局**：使用 px-to-viewport 实现大屏适配
4. **状态管理**：基于 Pinia 的响应式状态管理
5. **类型安全**：完整的 TypeScript 类型定义

## 🎯 核心功能模块

### 1. 数据展示层级

- **省级大屏**：省级数据概览，包含各市统计信息
- **市级大屏**：市级详细数据，包含各区县信息
- **县级大屏**：县级具体数据，包含企业和作业点详情

### 2. 主要功能模块

#### 🔥 动火作业管理

- 动火作业统计分析
- 作业人员管理
- 设备信息管理
- 作业地点验证

#### 📊 数据分析功能

- 底层管理分析
- 工作落实情况分析
- 一键分析功能
- 隐患情况统计

#### 🗺️ 地图可视化

- 腾讯地图集成（TMap）
- 区域数据可视化
- 工单地图分布
- 实时位置展示

#### 🏆 奖励分发系统

- 奖励统计分析
- 发放记录管理
- 分发情况可视化

#### ⚠️ 预警与监管

- 超时任务监控
- 预警工单管理
- 一键提醒功能
- 合规性检查

## 🔧 开发配置

### 环境配置

#### 开发环境

- **端口**：3002
- **代理配置**：
  - `/api` → 测试环境：`https://sn.zszhyl.com:1375/360safe`
  - `/otherApi` → 测试环境：`https://sn.zszhyl.com:1375`

#### 生产环境

- **输出目录**：`360safeScreen`
- **代理配置**：
  - `/api` → 正式环境：`https://shuanhan.scasst.net/360safe`
  - `/otherApi` → 正式环境：`https://shuanhan.scasst.net`

### 构建配置

#### Vite 配置特点

```typescript
// vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => ({
  base: VITE_BASE_URL,
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  css: {
    postcss: {
      plugins: [pxtovw], // px自动转vw，适配1920px设计稿
    },
  },
  build: {
    outDir: "360safeScreen",
  },
});
```

## 📱 响应式设计

### 大屏适配策略

- **设计基准**：1920px 宽度设计稿
- **适配方案**：postcss-px-to-viewport 自动转换 px 为 vw
- **字体支持**：多种中文字体资源，包括黑体、仿宋、楷体等
- **背景适配**：固定背景图片，100%覆盖视口

### CSS 架构

```scss
// 全局字体定义
@font-face {
  font-family: "DINAlternate";
  src: url("@/assets/font/DIN REGULAR.OTF") format("opentype");
}

// 响应式配置（自动转换）
viewportWidth: 1920  // 设计稿宽度
unitPrecision: 3     // 转换精度
viewportUnit: "vw"   // 目标单位
```

## 🔐 安全与认证

### 认证机制

1. **Token 认证**：基于 Token 的用户身份验证
2. **iframe 通信**：通过 postMessage 实现与父页面的安全通信
3. **自动跳转**：Token 失效时自动跳转到登录页面
4. **权限控制**：基于 areaCode 的区域权限控制

### 请求拦截器

```typescript
// 自动添加Token和areaCode
instance.interceptors.request.use((config) => {
  if (useIndex.token) {
    config.headers.Token = useIndex.token;
  }
  if (config.method === "post") {
    config.data = { areaCode: useIndex.areaCode, ...config.data };
  }
  return config;
});
```

## 📊 数据流架构

### 状态管理设计

```typescript
// 核心状态结构
interface IndexState {
  type: "province" | "city" | "county"; // 当前展示层级
  areaCode: string; // 区域代码
  token: string; // 认证令牌
  headerInfo: HeaderInfo; // 头部信息
  activeCode: string; // 当前激活区域
  // ... 其他状态
}
```

### API 架构设计

- **模块化 API**：按业务功能模块化 API 接口
- **统一请求**：基于 Axios 的统一请求封装
- **错误处理**：统一的错误处理和用户提示
- **请求取消**：支持请求取消机制，避免重复请求

## 🚀 部署与运行

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

### 构建配置

- **开发构建**：`pnpm dev`
- **生产构建**：`pnpm build`
- **测试构建**：`pnpm build:test`

## ⚠️ 使用注意事项

### 🔧 开发注意事项

1. **环境配置**

   - 确保正确配置环境变量（VITE_BASE_URL 等）
   - 开发环境下 Token 验证被跳过，生产环境需要有效 Token

2. **依赖管理**

   - 项目使用 pnpm 包管理器，建议统一使用 pnpm
   - 注意 ECharts 和 ECharts-GL 版本兼容性

3. **样式开发**

   - 使用 1920px 作为设计基准，px 会自动转换为 vw
   - 需要固定像素值时，可使用 Px（大写 P）避免转换
   - 注意字体文件的加载和引用路径

4. **TypeScript 配置**

   - 已关闭隐式 any 检查（noImplicitAny: false）
   - 注意类型定义的完整性和准确性

### 🌐 部署注意事项

1. **网络配置**

   - 确保服务器可访问 API 代理目标地址
   - 检查跨域配置是否正确
   - 验证 WebSocket 连接（如果使用）

2. **性能优化**

   - 大屏应用注意内存使用，避免内存泄漏
   - 定时刷新数据时注意请求频率控制
   - 图表组件适当使用防抖优化

3. **浏览器兼容性**

   - 主要支持现代浏览器（Chrome, Edge, Firefox 等）
   - 大屏展示通常使用 Chrome 浏览器
   - 注意 CSS Grid 和 Flexbox 的兼容性

### 🔒 安全注意事项

1. **数据安全**

   - 敏感信息不要在前端硬编码
   - Token 要正确处理过期和刷新
   - API 接口要有适当的权限验证

2. **运行安全**

   - 生产环境关闭开发者工具插件
   - 注意防止 XSS 和 CSRF 攻击
   - 定期更新依赖包，修复安全漏洞

### 📱 使用体验注意事项

1. **大屏适配**

   - 推荐使用 1920×1080 或更高分辨率显示器
   - 全屏模式下效果最佳
   - 注意不同比例屏幕的适配效果

2. **数据更新**

   - 注意数据刷新频率，避免过于频繁请求
   - 长时间运行要考虑内存清理
   - 网络异常时的降级处理

3. **用户交互**

   - 大屏主要用于展示，交互操作相对简单
   - 鼠标悬停和点击效果要明显
   - 考虑触摸屏操作的兼容性

## 📈 扩展建议

### 功能扩展

1. **数据导出**：支持 Excel、PDF 等格式的数据导出
2. **历史数据**：增加历史数据对比和趋势分析
3. **实时推送**：接入 WebSocket 实现实时数据推送
4. **移动端适配**：考虑平板和手机端的访问支持

### 技术优化

1. **性能监控**：接入性能监控工具（如 Sentry）
2. **代码分割**：优化打包体积，实现按需加载
3. **缓存策略**：实现更好的数据缓存机制
4. **测试覆盖**：增加单元测试和集成测试

### 维护建议

1. **文档完善**：完善 API 文档和组件使用文档
2. **代码规范**：统一代码风格和提交规范
3. **版本管理**：建立清晰的版本发布流程
4. **监控告警**：建立生产环境监控和告警机制

---
