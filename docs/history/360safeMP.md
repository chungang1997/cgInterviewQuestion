# 360 安全焊接小程序项目技术文档

## 项目概述

**项目名称**: 蜀安.焊小程序端（C 端：公众及行政管理人员）  
**项目版本**: 1.0.0  
**开发框架**: uni-app (Vue 3)  
**目标平台**: 微信小程序（主要）、支付宝小程序、H5、App 等多端适配

### 项目简介

这是一个基于 uni-app 框架开发的跨平台小程序应用，主要面向公众和行政管理人员，提供安全焊接相关的申报、举报、公示、排查等功能。

## 技术栈分析

### 核心框架与语言

- **uni-app**: `3.0.0-alpha` - DCloud 出品的跨平台开发框架
- **Vue.js**: `^3.2.45` - 前端 MVVM 框架，使用 Vue 3 Composition API
- **TypeScript**: `^4.9.4` - 提供类型安全和更好的开发体验
- **Vite**: `4.0.3` - 现代化的前端构建工具

### 状态管理

- **Pinia**: `^2.0.29` - Vue 3 官方推荐的状态管理库
- **pinia-plugin-persistedstate**: `^3.0.2` - Pinia 状态持久化插件

### UI 组件库

- **vk-uview-ui**: uni-app 生态的 UI 组件库
- **Vant Weapp**: `^1.10.12` - 有赞团队微信小程序组件库
- **自定义组件**: 项目包含多个业务相关的自定义组件

### 工具库

- **dayjs**: `^1.11.13` - 轻量级日期处理库
- **vue-i18n**: `^9.1.9` - 国际化支持
- **postcss**: CSS 后处理器
- **sass**: `^1.57.1` - CSS 预处理器

### 地图服务

- **腾讯地图 SDK**: 集成 qqmap-wx-jssdk 1.1 和 1.2 版本

### 开发工具

- **@vue/tsconfig**: Vue TypeScript 配置
- **vue-tsc**: Vue TypeScript 类型检查器

## 项目结构说明

```
src/
├── api/                    # API接口定义
│   ├── common/            # 通用接口
│   ├── home/              # 首页接口
│   ├── mine/              # 个人中心接口
│   ├── myFile/            # 我的文件相关接口
│   ├── proactivelyDeclare/# 主动申报接口
│   ├── PublicNotice/      # 公示接口
│   ├── study/             # 学习模块接口
│   ├── uploadFile/        # 文件上传接口
│   ├── user/              # 用户接口
│   └── whiteList/         # 白名单接口
├── components/            # 公共组件
│   ├── article/           # 文章组件
│   ├── Audio/             # 音频组件
│   ├── DynamicForm/       # 动态表单组件
│   ├── uploadImage/       # 图片上传组件
│   ├── uploadVideo/       # 视频上传组件
│   └── ...               # 其他业务组件
├── pages/                 # 主包页面
│   ├── authorization/     # 授权页面
│   ├── home/              # 首页
│   ├── index/             # 入口页面
│   ├── mine/              # 个人中心
│   └── study/             # 学习页面
├── subPackages/           # 分包页面
│   ├── proactivelyDeclare/# 主动申报分包
│   ├── code/              # 扫码分包
│   ├── reportAndReport/   # 群众举报分包
│   ├── PublicNotice/      # 动火作业公示分包
│   ├── socialInvestigation/# 社会排查分包
│   ├── myFile/            # 个人文件分包
│   └── whiteList/         # 白名单分包
├── store/                 # 状态管理
│   ├── global/            # 全局状态
│   └── user/              # 用户状态
├── utils/                 # 工具函数
│   ├── config.ts          # 配置文件
│   ├── request.ts         # 网络请求封装
│   └── version.ts         # 版本管理
├── static/                # 静态资源
├── uni_modules/           # uni-app插件
├── wxcomponents/          # 微信小程序组件
├── App.vue                # 应用主组件
├── main.ts                # 应用入口
├── manifest.json          # 应用配置
└── pages.json             # 页面配置
```

## 开发环境配置

### 环境要求

- **Node.js**: >= 14.x
- **包管理器**: pnpm (推荐)
- **开发工具**: HBuilderX 或 VS Code + uni-app 插件

### 安装依赖

```bash
# 使用pnpm安装依赖
pnpm install

# 或使用npm
npm install
```

### 开发命令

```bash
# 微信小程序开发
pnpm dev:mp-weixin

# H5开发
pnpm dev:h5

# App开发
pnpm dev:app

# 支付宝小程序开发
pnpm dev:mp-alipay

# 类型检查
pnpm type-check
```

### 构建命令

```bash
# 微信小程序构建
pnpm build:mp-weixin

# H5构建
pnpm build:h5

# App构建
pnpm build:app
```

### 环境变量配置

项目使用环境变量区分开发和生产环境：

- 开发环境接口: `https://sn.zszhyl.com:1375/360safe`
- 生产环境接口: `https://shuanhan.scasst.net/360safe`
- AgentCode: 通过环境变量`VITE_AGENT_CODE`配置

## 核心功能模块

### 1. 用户认证与授权

- 微信登录集成
- Token 和 Session 管理
- 登录状态持久化

### 2. 主要业务模块

- **主动申报**: 用户主动申报安全问题
- **群众举报**: 公众举报功能
- **动火作业公示**: 作业信息公示展示
- **社会排查**: 社会安全排查功能
- **个人中心**: 用户信息管理、申报记录等
- **白名单管理**: 企业白名单申请

### 3. 通用功能

- 文件上传（图片、视频、音频）
- 地理位置服务
- 扫码功能
- 消息推送

## 开发注意事项

### 1. 代码规范

- **TypeScript**: 项目使用 TypeScript，确保类型安全
- **组件规范**: 使用 Vue 3 Composition API 编写组件
- **命名规范**: 文件和目录使用 camelCase 或 kebab-case 命名
- **API 接口**: 统一使用封装的 request 工具进行网络请求

### 2. 小程序开发约束

- **包大小限制**: 主包不超过 2MB，总包不超过 20MB
- **分包设计**: 合理使用分包减少主包体积
- **权限申请**: 需要的权限在`manifest.json`中提前声明
- **兼容性**: 注意微信小程序 API 的版本兼容性

### 3. 状态管理

- 使用 Pinia 进行状态管理
- 重要状态使用持久化插件自动保存
- 登录失效时自动清理本地存储

### 4. 网络请求

- 统一的错误处理机制
- 自动添加认证头信息
- 登录失效自动跳转登录页
- 支持文件上传功能

### 5. UI 组件使用

- 优先使用 vk-uview-ui 组件
- 微信小程序特定功能使用 Vant Weapp 组件
- 自定义组件放在 components 目录下

### 6. 性能优化建议

- **图片优化**: 使用 webp 格式，合理设置图片尺寸
- **懒加载**: 长列表使用虚拟滚动或分页加载
- **分包策略**: 按功能模块合理分包
- **缓存策略**: 合理使用本地缓存减少网络请求

## 调试与测试

### 开发调试

- 使用微信开发者工具进行小程序调试
- 浏览器调试 H5 版本
- 真机调试 App 版本

### 常见问题

1. **网络请求跨域**: 小程序需要在后台配置合法域名
2. **权限问题**: 地理位置等敏感权限需要用户授权
3. **兼容性问题**: 不同平台 API 差异需要条件编译处理

## 部署说明

### 微信小程序部署

1. 使用微信开发者工具打开`dist/dev/mp-weixin`目录
2. 配置小程序 appid: `wx0b308978c6f22e14`
3. 上传代码到微信后台
4. 提交审核并发布

### H5 部署

1. 执行`pnpm build:h5`构建
2. 将`dist/build/h5`目录部署到服务器
3. 配置 nginx 或其他服务器

### 版本管理

- 版本号在`manifest.json`中配置
- 遵循语义化版本规范
- 发布前确保通过类型检查: `pnpm type-check`

## 依赖管理

### 主要依赖说明

- **@dcloudio 系列**: uni-app 核心依赖，版本需保持一致
- **Vue 生态**: Vue 3 + Pinia + TypeScript 技术栈
- **UI 组件**: 主要使用 vk-uview-ui，辅助使用 Vant Weapp
- **工具库**: 选择轻量级库减少包体积

### 版本升级注意事项

- uni-app 版本升级需谨慎，可能影响平台兼容性
- Vue 和 TypeScript 版本升级需要全面测试
- UI 组件库升级可能有破坏性变更

## 安全考虑

### 数据安全

- 敏感数据传输使用 HTTPS
- 用户认证信息加密存储
- 文件上传限制文件类型和大小

### 权限控制

- 接口级别的权限验证
- 前端路由守卫
- 敏感操作二次确认

---
