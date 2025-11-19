# 遂州养老 WEB 系统技术分析文档

## 项目概述

**项目名称:** 遂州养老 WEB 系统 (WEB_SN)  
**项目类型:** Vue.js 2.x 企业级管理系统  
**业务领域:** 养老服务管理系统  
**构建工具:** Vue CLI 3.x + Webpack 4

这是一个面向养老服务管理的综合性 Web 应用系统，主要服务于政府机关、社区服务中心等部门，用于管理各类养老相关业务。

## 核心技术栈

### 前端框架

- **Vue.js 2.5.17** - 主框架
- **Vue Router 3.0.1** - 路由管理 (History 模式)
- **Vuex 3.0.1** - 状态管理
- **Element UI 2.13.0** - UI 组件库

### 构建和开发工具

- **Vue CLI 3.5.3** - 脚手架工具
- **Webpack 4.46.0** - 模块打包器
- **Babel** - JavaScript 转译器
- **ESLint** - 代码规范检查

### 样式预处理

- **SCSS/Sass** - 主要样式预处理器
- **Stylus** - 辅助样式预处理器
- **Less** - 部分组件样式处理
- **PostCSS + Autoprefixer** - CSS 后处理

### 网络请求和数据处理

- **Axios 0.18.0** - HTTP 客户端
- **Vue-Axios 2.1.4** - Vue 集成 axios
- **QS 6.6.0** - 查询字符串解析

### 数据可视化

- **ECharts 4.8.0** - 图表库
- **V-Charts 1.19.0** - Vue 封装的 ECharts
- **AntV G6 4.8.3** - 图编辑器和可视化引擎
- **@antv/g6-editor 1.2.0** - 图编辑器

### 富文本编辑

- **Vue Quill Editor** - 现代富文本编辑器
- **KindEditor** - 经典富文本编辑器
- **UEditor (avue-plugin-ueditor)** - 百度编辑器集成

### 工具库

- **Moment.js 2.27.0** - 日期时间处理
- **JSEncrypt 3.0.0-rc.1** - RSA 加密
- **js-cookie 2.2.0** - Cookie 操作
- **js-base64 2.5.2** - Base64 编码
- **File-Saver 2.0.5** - 文件保存
- **XLSX 0.16.9** - Excel 文件处理

### UI 增强组件

- **Vue Awesome Swiper 3.1.3** - 轮播图组件
- **Screenfull 5.0.2** - 全屏 API 封装
- **Vue Photo Preview 1.1.3** - 图片预览
- **Vue Cropper 0.5.2** - 图片裁剪
- **Cropper.js 1.5.7** - 图片裁剪核心库
- **Vue Count To 1.0.13** - 数字动画
- **Vue Draggable 2.20.0** - 拖拽功能

## 项目架构分析

### 目录结构

```
src/
├── api/                    # API接口管理
│   └── api.js             # 统一的API接口定义
├── assets/                # 静态资源
│   ├── Iconfont/         # 图标字体文件
│   └── images/           # 图片资源 (165个文件)
├── components/           # 公共组件库
│   ├── basicLivingTreeTable/    # 基本生活保障树形表格
│   ├── calendar/                # 日历组件
│   ├── cancel/                  # 审核取消组件集
│   ├── contentCard/             # 内容卡片
│   ├── custom-timeline/         # 自定义时间线
│   ├── cutImage/               # 图片裁剪
│   ├── dataDictionary/         # 数据字典
│   ├── Dialog/                 # 自定义对话框
│   ├── fileUpload/             # 文件上传
│   └── ...                     # 其他业务组件
├── img/                   # 业务相关图标资源
├── page/                  # 页面组件
│   ├── business_management.vue  # 业务管理
│   ├── index.vue               # 首页
│   └── workbench.vue          # 工作台
├── plugins/              # 第三方插件
│   ├── g6.min.js        # G6图形库
│   ├── jquery-3.1.1.min.js
│   └── jsencrypt.js     # 加密库
├── router/              # 路由配置
├── store/               # Vuex状态管理
├── styles/              # 全局样式
│   ├── base.scss        # 基础样式
│   ├── common.scss      # 通用样式
│   └── form.scss        # 表单样式
├── util/                # 工具函数
│   ├── auth.js          # 权限相关
│   ├── checkData.js     # 数据校验
│   ├── util.js          # 通用工具
│   └── validate.js      # 表单验证
└── views/               # 页面视图
    └── Home.vue
```

### 核心配置分析

#### 1. Vue 配置 (vue.config.js)

- **生产环境路径**: `/wp2si_web_sn/`
- **输出目录**: `wp2si_web_sn`
- **代理配置**:
  - `/iframe` → `https://www.wisdomtst.cn/wisdom3A_sn`
  - `/business` → `https://www.wisdomtst.cn/wap2si_sn`
- **性能配置**:
  - 最大入口体积: 50MB
  - 最大资源体积: 30MB
- **开发服务器**: 8080 端口，自动打开浏览器

#### 2. 路径别名配置

```javascript
alias: {
  "@": "src",
  "@public": "public",
  "@img": "src/assets/images",
  "@js": "src/assets/scripts",
  "@css": "src/assets/styles"
}
```

#### 3. 状态管理结构

```javascript
state: {
  menuId: sessionStorage.getItem('menuId'),
  selectRouter: [],
  ListselectRouter: [],
  keepliveRouter: [],
  processTreeSelect: [],
  loginInfo: {},
  aliveInfo: {}
}
```

## 核心功能特性

### 1. 权限管理系统

- 基于角色的访问控制(RBAC)
- 多层级用户权限：
  - `oper_servicedesk` - 窗口人员
  - `oper_community` - 村社人员
  - `sjgl` - 数据管理
  - `oper_leader` - 决策层领导

### 2. 业务模块

根据组件结构分析，系统包含以下主要业务模块：

- **基本生活保障管理** - 树形表格展示
- **审核流程管理** - 包含残疾、低保、孤儿、特困等多类审核
- **数据字典管理** - 系统配置数据
- **文件管理** - 上传、预览、下载
- **日历事件管理** - 时间相关业务

### 3. 数据可视化

- **图表展示**: ECharts + V-Charts
- **流程图**: AntV G6 图形编辑器
- **数据看板**: 决策支持图表

### 4. 文档处理能力

- **Excel 导入导出** - XLSX 库支持
- **PDF 生成** - jsPDF 库
- **富文本编辑** - 多编辑器支持
- **图片处理** - 裁剪、预览、压缩

## 开发注意事项

### 1. 环境配置

```bash
# 安装依赖
npm install

# 开发服务器
npm run serve

# 生产构建
npm run build

# 代码检查
npm run lint
```

### 2. 开发规范

#### 代码规范

- 使用 ESLint + Standard 配置
- 已关闭 lintOnSave，建议在 CI/CD 中启用
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case

#### 样式规范

- 主要使用 SCSS 编写样式
- 全局样式放在`src/styles/`目录
- 组件样式采用 scoped 作用域
- 使用 BEM 命名规范

#### API 规范

- 统一在`src/api/api.js`中管理接口
- 使用 axios 拦截器处理错误
- 支持请求/响应拦截
- 统一错误处理机制

### 3. 性能优化建议

#### 当前配置优化

- 已配置生产环境不生成 source map
- 设置了合理的资源体积限制
- 使用了代理服务器减少跨域请求

#### 建议改进

1. **代码分割**: 利用 Vue Router 懒加载
2. **组件懒加载**: 大型组件按需加载
3. **图片优化**: 压缩图片资源(当前有 165 个图片文件)
4. **依赖优化**: 移除未使用的依赖包
5. **CDN 加速**: 将大型库(如 ECharts)改为 CDN 引入

### 4. 安全注意事项

#### 数据传输安全

- 已集成 JSEncrypt 进行 RSA 加密
- 使用 HTTPS 协议传输
- 实现了登录态管理和权限控制

#### 建议加强

1. **输入验证**: 加强前端数据校验
2. **XSS 防护**: 富文本内容过滤
3. **CSRF 保护**: 添加 CSRF Token
4. **敏感信息**: 避免在前端存储敏感数据

### 5. 兼容性说明

#### 浏览器支持

- 基于 Vue 2.x，支持 IE9+
- 推荐使用现代浏览器(Chrome, Firefox, Safari)
- 移动端需要额外适配

#### 技术栈版本

- Vue 2.x (非最新版本，建议考虑升级计划)
- Element UI 2.x (稳定版本)
- Node.js 建议使用 LTS 版本

## 部署说明

### 开发环境

- 本地开发端口: 8080
- 代理目标服务器: `https://www.wisdomtst.cn`
- 热重载: 已启用

### 生产环境

- 构建输出目录: `wp2si_web_sn/`
- 部署路径: `/wp2si_web_sn/`
- 资源发布: 需要配置静态资源服务器

### 服务器配置

- 需要配置 Nginx 反向代理
- 支持 History 路由模式
- 配置 gzip 压缩提升性能

## 项目维护建议

### 1. 依赖管理

- 定期更新安全补丁
- 关注 Vue 2.x 生命周期(将于 2023 年底结束维护)
- 制定 Vue 3.x 升级计划

### 2. 代码质量

- 启用 ESLint 检查
- 添加单元测试
- 建立代码审查流程

### 3. 监控和日志

- 添加前端错误监控
- 集成性能监控工具
- 建立用户行为分析

### 4. 文档维护

- 建立组件使用文档
- 维护 API 接口文档
- 定期更新部署文档

## 总结

遂州养老 WEB 系统是一个功能完善的企业级 Vue.js 应用，采用了成熟的技术栈和合理的架构设计。系统在业务功能、用户体验和技术实现方面都达到了较高水平。

**优势:**

- 技术栈成熟稳定
- 组件化程度高
- 功能模块完整
- 代码结构清晰

**改进空间:**

- 性能优化潜力较大
- 安全防护可以加强
- 技术栈版本可以升级
- 测试覆盖率有待提高

建议在后续维护中重点关注性能优化、安全加固和技术栈升级规划。
