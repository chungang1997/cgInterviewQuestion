# ZoneSeat 选座票务系统 - 技术栈分析文档

## 项目概述

ZoneSeat 是一个选座票务系统，采用前后端分离架构，包含 H5 移动端和 Web 管理端两个前端应用。系统主要用于票务管理、座位选择、用户管理等功能。

## 项目结构

```
ZoneSeat/
├── H5/          # 移动端应用 (Vue3 + TypeScript)
├── Web/         # 管理端应用 (Vue2 + JavaScript)
└── README.md    # 项目说明
```

## 技术栈详细分析

### 一、H5 移动端项目

#### 🔧 核心框架与构建工具

- **前端框架**: Vue 3.5.3 (Composition API)
- **开发语言**: TypeScript 5.2.2
- **构建工具**: Vite 4.5.0
- **包管理器**: pnpm
- **Node 版本要求**: >= 16

#### 📱 移动端 UI 框架

- **主要 UI 库**:
  - Vant 4.7.2 (有赞移动端组件库)
  - TDesign Mobile Vue 1.0.8 (腾讯移动端组件库)
- **CSS 框架**:
  - Tailwind CSS 3.3.3 (原子化 CSS)
  - Less 4.2.0 (CSS 预处理器)
  - Sass 1.81.0

#### 🗄️ 状态管理与路由

- **状态管理**:
  - Pinia 2.1.7 (Vue 3 官方状态管理)
  - pinia-plugin-persistedstate 4.1.3 (状态持久化)
- **路由管理**: Vue Router 4.2.5
- **国际化**: Vue I18n 10

#### 🔌 工具库与插件

- **HTTP 客户端**: Axios 1.5.1
- **二维码扫描**: html5-qrcode 2.3.8
- **加密工具**: JSEncrypt 3.3.2
- **进度条**: NProgress 0.2.0
- **查询参数处理**: qs 6.11.2
- **样式重置**: normalize.css 8.0.1

#### ⚙️ 开发工具与配置

- **代码检查**: ESLint + Prettier
- **类型检查**: vue-tsc
- **提交规范**: Commitlint + Conventional Commits
- **版本管理**: Standard Version
- **Mock 服务**: vite-plugin-mock-dev-server
- **代码压缩**: vite-plugin-compression
- **CDN 优化**: vite-plugin-cdn2

#### 📦 Vite 插件生态

- `@vitejs/plugin-vue`: Vue SFC 支持
- `@vitejs/plugin-vue-jsx`: JSX 支持
- `unplugin-vue-components`: 组件自动导入
- `vite-plugin-svg-icons`: SVG 图标处理
- `vite-plugin-vue-setup-extend`: setup 语法糖扩展

#### 🎯 移动端适配

- **viewport 适配**: cnjm-postcss-px-to-viewport (px 转 vw)
- **浏览器兼容**: autoprefixer (Android >=4.0, iOS >=7)
- **响应式设计**: 基于 375px 设计稿

### 二、Web 管理端项目

#### 🔧 核心框架与构建工具

- **前端框架**: Vue 2.6.12
- **开发语言**: JavaScript (ES6+)
- **构建工具**: Vue CLI 4.5.11 + Webpack
- **包管理器**: npm/yarn

#### 🖥️ 桌面端 UI 框架

- **主要 UI 库**:
  - Element UI 2.15.0 (饿了么桌面端组件库)
  - Ant Design Vue 1.7.4 (阿里桌面端组件库)
  - Element Plus 1.0.2-beta.31 (Element UI 升级版)

#### 🗄️ 状态管理与路由

- **状态管理**:
  - Vuex 3.6.2 (Vue 2 官方状态管理)
  - vuex-persistedstate 4.0.0-beta.3 (状态持久化)
- **路由管理**: Vue Router 3.5.2

#### 📊 数据可视化与图表

- **图表库**:
  - ECharts 5.5.1 (百度图表库)
  - Vue ECharts 2.6.0 (Vue 封装)
  - @antv/g2plot 2.3.19 (蚂蚁 G2 图表)

#### ✍️ 富文本编辑器

- **编辑器**:
  - TinyMCE 5.10.2 (富文本编辑器)
  - @packy-tang/vue-tinymce 1.1.2 (Vue 封装)
  - Vue Quill Editor 3.0.6 (Quill 编辑器)
  - Vue CodeMirror 4.0.6 (代码编辑器)

#### 🛠️ 功能增强库

- **HTTP 客户端**: Axios 0.21.1 + vue-axios 3.2.4
- **文件处理**:
  - html2canvas 1.4.1 (截图)
  - CompressorJS 1.0.7 (图片压缩)
  - CropperJS 1.5.12 (图片裁剪)
- **实时通信**: stompjs 2.3.3 (WebSocket)
- **地图服务**: qqmap 1.0.1 (腾讯地图)
- **视频播放**: xgplayer 3.0.0 (西瓜播放器)

#### 🎨 动画与交互

- **动画库**: Animate.css 4.1.1
- **轮播图**: Swiper 8.0.6 + vue-awesome-swiper 3.1.3
- **拖拽排序**: vuedraggable 2.24.3
- **全屏 API**: screenfull 5.1.0
- **滑动验证**: vue-monoplasty-slide-verify 1.3.1

#### ⚙️ 开发工具与优化

- **代码检查**: ESLint + babel-eslint
- **样式处理**:
  - Less 2.7.3 + less-loader 5.0.0
  - Node-sass 6.0.1 + sass-loader 10.2.0
- **图片优化**: image-webpack-loader 7.0.1
- **缓存优化**: hard-source-webpack-plugin 0.13.1
- **打包分析**: webpack-bundle-analyzer

## 开发环境配置

### H5 项目开发环境

```bash
# Node.js版本要求
Node.js: >= 16

# 开发服务器
端口: 9999
代理配置: /api -> http://192.168.8.113:10001

# 构建输出
输出目录: saleTicketH5/
```

### Web 项目开发环境

```bash
# Node.js版本建议
Node.js: 16.14.0

# 开发服务器
端口: 8080
代理配置: /Hub -> http://192.168.8.127:8080/bs_server

# 构建输出
输出目录: safeWeb/
```

## 项目特点分析

### ✅ 技术栈优势

1. **现代化架构**: H5 采用 Vue 3 + Vite，构建速度快，开发体验好
2. **类型安全**: H5 项目使用 TypeScript，提供更好的代码提示和错误检查
3. **组件化开发**: 两个项目都采用组件化架构，代码复用性强
4. **多端适配**: H5 专注移动端体验，Web 专注管理后台功能
5. **丰富的 UI 组件**: 使用成熟的组件库，开发效率高
6. **完善的工程化**: 代码检查、格式化、构建优化等配置完整

### ⚠️ 技术债务

1. **技术栈不统一**: H5 使用 Vue 3，Web 使用 Vue 2，存在维护成本
2. **Web 项目较老**: Vue CLI 4 + Vue 2 组合相对老旧
3. **依赖版本**: Web 项目部分依赖版本较老，存在安全隐患
4. **构建工具**: Web 项目使用 Webpack，构建速度相对较慢

## 优化建议

### 🚀 短期优化

1. 统一代码规范和 ESLint 配置
2. 升级 Web 项目的老旧依赖包
3. 优化 Webpack 构建配置，提升构建速度
4. 完善 TypeScript 类型定义

### 🎯 长期规划

1. 考虑将 Web 项目升级到 Vue 3 + Vite
2. 统一状态管理方案（都使用 Pinia）
3. 建立组件库，提高代码复用性
4. 完善单元测试和端到端测试
5. 引入微前端架构，统一项目管理

## 总结

该项目展现了现代前端开发的多个技术层面：

- **Canvas 绘图**：高性能选座绘制引擎
- **多端适配**：移动端与桌面端双端优化
- **主题系统**：动态主题切换
- **状态管理**：现代化状态管理方案
- **工程化能力**：构建、质量、自动化与部署优化
