# 360CheckMP 项目技术分析报告

**项目名称**: 蜀安·查  
**项目性质**: 360 安全检查小程序应用  
**微信小程序 AppID**: wxfafd275cf093f33a

本文档旨在梳理 `360CheckMP` 项目的技术栈、核心结构和开发中的注意事项，为新成员快速上手和项目后期维护提供支持。

## 1. 技术栈概览 (Tech Stack)

项目采用当前主流的 Vue 生态系统，并基于 `uni-app` 框架进行跨端开发。

### 1.1 核心技术栈

- **核心框架**: [Vue 3](https://vuejs.org/) (v3.4.21)
  - 采用 `<script setup>` 语法进行组件开发，全面拥抱组合式 API (Composition API)
  - 支持 SSR 服务端渲染
- **跨端框架**: [uni-app](https://uniapp.dcloud.io/) (v3.0.0)
  - 一套代码，多端发布，支持 H5、小程序、App 等多个平台
  - 目前主要编译到微信小程序平台
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) (v4.9.4)
  - 为项目提供了强类型支持，增强了代码的可维护性和健壮性
  - 配置了路径别名 `@/*` 指向 `./src/*`
- **构建工具**: [Vite](https://vitejs.dev/) (v5.2.8)
  - 提供了极速的冷启动和热更新能力，显著提升了开发体验
  - 配置了开发服务器代理，支持 API 转发

### 1.2 UI 与样式

- **UI 框架**: [vk-uview-ui](https://gitee.com/vk-uni/vk-uview-ui)
  - 一个为 `uni-app` 深度定制的组件库，提供了丰富的 UI 组件
- **CSS 预处理器**: [Sass/SCSS](https://www.sass-lang.com/) (v1.78.0)
  - 用于编写更具结构化和可维护性的样式代码
- **国际化**: [Vue i18n](https://vue-i18n.intlify.dev/) (v9.1.9)
  - 支持多语言国际化

### 1.3 状态管理与数据

- **状态管理**: [Pinia](https://pinia.vuejs.org/) (v2.2.2)
  - Vue 官方推荐的新一代状态管理器，拥有更简洁的 API 和完整的 TypeScript 支持
  - 使用了 `pinia-plugin-persistedstate` (v4.0.0) 插件进行状态持久化
  - 采用模块化管理：`user`、`global` 等模块

### 1.4 功能特性库

- **加密处理**: `jsencrypt` (v3.3.2) - 用于 RSA 加密，主要用于登录或敏感数据传输
- **录音功能**: `recorder-core` (v1.3.24040900) - 提供了录音功能的核心支持
- **地图服务**: 腾讯地图 API - 支持位置选择和地图展示功能
- **工具函数**: `deep-pick-omit` (v1.2.0)、`destr` (v2.0.3) 等辅助库

## 2. 项目结构解析

项目遵循 `uni-app` 的标准目录结构，并在此基础上进行了业务优化的约定。

```
360CheckMP/
├── src/
│   ├── api/                    # API 请求模块，按业务划分
│   │   ├── checkRecord/        # 核查记录相关接口
│   │   ├── common/             # 通用接口和类型定义
│   │   ├── home/               # 首页相关接口
│   │   ├── login/              # 登录相关接口
│   │   ├── mine/               # 我的页面相关接口
│   │   ├── study/              # 学习模块接口
│   │   ├── transfer/           # 转单相关接口
│   │   ├── uploadFile/         # 文件上传接口
│   │   ├── user/               # 用户相关接口
│   │   ├── waitDistribute/     # 待派发相关接口
│   │   └── workPeople/         # 工作人员相关接口
│   ├── components/             # 全局可复用组件
│   │   ├── Audio/              # 音频播放组件
│   │   ├── Video/              # 视频播放组件
│   │   ├── article/            # 文章相关组件
│   │   ├── uploadAudio/        # 音频上传组件
│   │   ├── uploadImage/        # 图片上传组件
│   │   ├── uploadVideo/        # 视频上传组件
│   │   └── swiperBanner/       # 轮播组件
│   ├── pages/                  # 主包页面 (核心页面)
│   │   ├── index/              # 首页
│   │   ├── login/              # 登录页
│   │   ├── home/               # 主页
│   │   ├── mine/               # 我的页面
│   │   └── study/              # 学习页面
│   ├── subPackages/            # 分包页面 (功能页面)
│   │   ├── checkRecord/        # 核查记录模块
│   │   │   ├── list/           # 记录列表
│   │   │   ├── detail/         # 记录详情
│   │   │   ├── editor/         # 记录编辑
│   │   │   ├── transfer/       # 记录转单
│   │   │   └── verify/         # 记录验证
│   │   ├── waitDistribute/     # 待派发工单模块
│   │   │   ├── list/           # 工单列表
│   │   │   ├── detail/         # 工单详情
│   │   │   └── redeploy/       # 工单重新派发
│   │   ├── workPeople/         # 值班人员模块
│   │   ├── proactivelyDeclare/ # 主动申报模块
│   │   ├── socialInvestigation/# 社会排查模块
│   │   ├── declare/            # 作业信息模块
│   │   ├── transfer/           # 转单记录模块
│   │   ├── authorization/      # 授权模块
│   │   └── agreenment/         # 用户协议模块
│   ├── store/                  # Pinia 状态管理
│   │   ├── user/               # 用户状态管理
│   │   ├── global/             # 全局状态管理
│   │   └── index.ts            # store 入口文件
│   ├── utils/                  # 工具函数库
│   │   ├── request.ts          # HTTP 请求封装
│   │   ├── config.ts           # 配置文件
│   │   ├── share.ts            # 分享功能
│   │   └── version.ts          # 版本管理
│   ├── static/                 # 静态资源
│   │   ├── audio/              # 音频相关图标
│   │   ├── home/               # 首页相关图标
│   │   └── *.png               # 各类图标资源
│   ├── uni_modules/            # uni-app 插件模块
│   │   ├── vk-uview-ui/        # uView UI 组件库
│   │   └── Recorder-UniCore/   # 录音核心插件
│   ├── wxcomponents/           # 微信小程序原生组件
│   │   └── qqmap-wx-jssdk*/    # 腾讯地图 JS SDK
│   ├── App.vue                 # 应用根组件
│   ├── main.ts                 # 应用入口文件
│   ├── pages.json              # 页面路由与全局配置
│   ├── manifest.json           # 应用清单文件
│   └── uni.scss                # uni-app 样式变量
├── dist/                       # 编译输出目录
├── vite.config.ts              # Vite 配置文件
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖管理
```

### 2.1 目录职责说明

- **`api/`**: 按照业务模块划分接口，每个模块包含 `index.ts` 和对应的类型定义文件
- **`components/`**: 存放可复用的业务组件，内部按功能分类，每个组件都包含对应的 `hooks` 目录
- **`pages/`**: 主包页面，包含应用的核心入口页面，影响小程序启动速度
- **`subPackages/`**: 分包页面，按业务功能模块划分，实现按需加载优化
- **`store/`**: 使用 Pinia 进行状态管理，按模块划分 store
- **`hooks/`**: 在页面和组件内部都存在 hooks 目录，充分利用 Composition API 进行逻辑复用

## 3. 核心功能特性

### 3.1 业务模块

项目主要包含以下业务功能模块：

- **安全检查核心功能**：

  - 核查记录管理（列表、详情、编辑、验证）
  - 待派发工单处理（列表、详情、重新派发）
  - 转单记录管理
  - 主动申报功能
  - 社会排查功能

- **多媒体支持**：

  - 音频录制和播放（基于 recorder-core）
  - 图片上传和预览
  - 视频上传和播放
  - 支持多种格式的文件上传

- **地图位置服务**：

  - 集成腾讯地图 SDK
  - 位置选择和标记
  - 地理位置权限管理

- **用户管理**：

  - 登录认证（支持 RSA 加密）
  - 会话管理和状态持久化
  - 权限控制和授权管理

## 4. 开发环境配置

### 4.1 环境变量配置

```typescript
// 开发环境变量配置
VITE_AGENT_CODE: string; // 代理商编码，用于接口请求头
```

### 4.2 API 代理配置

```typescript
// vite.config.ts 中的代理配置
proxy: {
  "/api": {
    target: "https://shuanhan.scasst.net/360safe", // 正式环境
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
  "/mapApi": {
    target: "https://apis.map.qq.com", // 腾讯地图 API
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/mapApi/, ""),
  },
}
```

### 4.3 小程序权限配置

项目需要以下小程序权限：

- `scope.userLocation` - 用户位置信息
- `getLocation` - 获取地理位置
- `chooseLocation` - 选择位置

## 5. 开发注意事项与最佳实践

### 5.1 uni-app 开发规范

- **组件标签**：使用 `<view>`、`<text>` 等 uni-app 标签，而不是 HTML 标签
- **API 调用**：使用 `uni.*` API 而不是浏览器原生 API
- **路由跳转**：使用 `uni.navigateTo`、`uni.redirectTo` 等 uni-app 路由 API
- **生命周期**：遵循 uni-app 的页面和组件生命周期

### 5.2 条件编译实践

项目中广泛使用条件编译来适配不同平台：

```typescript
/* #ifdef H5 */
// H5 平台特定代码
/* #endif */

/* #ifdef MP-WEIXIN */
// 微信小程序特定代码
/* #endif */
```

### 5.3 API 请求最佳实践

- **统一封装**：所有 API 请求通过 `src/utils/request.ts` 统一处理
- **错误处理**：自动处理登录失效（code 401、402 等）和通用错误提示
- **请求头管理**：自动添加 `X-session`、`X-token`、`AgentCode` 等必要头部
- **类型定义**：为每个 API 接口定义 TypeScript 类型

### 5.4 状态管理规范

- **模块化管理**：按业务模块划分 Pinia store（user、global 等）
- **持久化存储**：使用 `pinia-plugin-persistedstate` 实现状态持久化
- **类型安全**：为 store 状态和 action 添加 TypeScript 类型定义

### 5.5 组件开发规范

- **组合式 API**：优先使用 `<script setup>` 语法和 Composition API
- **逻辑复用**：将业务逻辑抽离到 hooks 中实现复用
- **类型定义**：为组件 props、emits 添加完整的类型定义
- **样式规范**：使用 SCSS 预处理器，遵循 BEM 命名规范

### 5.6 性能优化策略

- **分包加载**：合理使用分包功能，核心页面放主包，功能页面放分包
- **图片优化**：使用适当的图片格式和尺寸，避免过大图片
- **接口优化**：合理使用缓存，避免重复请求
- **组件懒加载**：对大组件使用懒加载策略

### 5.7 多媒体开发注意事项

- **录音功能**：需要用户授权麦克风权限，注意错误处理
- **文件上传**：区分 H5 和小程序平台的文件选择方式
- **地图功能**：确保腾讯地图 API Key 配置正确
- **权限管理**：妥善处理用户拒绝权限的情况

### 5.8 部署和构建

- **开发环境**：使用 `npm run dev:mp-weixin` 启动微信小程序开发
- **生产构建**：使用 `npm run build:mp-weixin` 构建生产版本
- **代码检查**：使用 `npm run type-check` 进行 TypeScript 类型检查

## 6. 常见问题解决方案

### 6.1 开发调试

- 使用微信开发者工具进行小程序调试
- 启用 `vConsole` 在真机上查看日志
- 合理使用 `console.log` 进行接口调试

### 6.2 兼容性问题

- 注意不同小程序平台的 API 差异
- 测试时注意不同版本微信的兼容性
- 关注 uni-app 版本更新和迁移指南

### 6.3 性能优化

- 监控小程序包大小，合理使用分包
- 优化图片资源，使用 CDN 加速
- 减少不必要的数据请求和状态更新
