# cgInterviewQuestion

基于 VitePress 构建的前端面试题知识库，包含 JavaScript、TypeScript、CSS 和 Vue 等前端核心技术的面试题。

## 📚 内容模块

- **JavaScript**：核心概念、ES6+特性、异步编程、原型链等
- **TypeScript**：类型系统、泛型、高级类型等
- **CSS**：布局、选择器、动画、响应式设计等
- **Vue**：响应式原理、组件通信、Vue2/Vue3 对比等

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📦 部署到 GitHub Pages

### 1. GitHub 仓库

仓库地址：https://github.com/chungang1997/cgInterviewQuestion

### 2. 配置 base 路径

在 `docs/.vitepress/config.mts` 中，确保 `base` 配置正确：

```typescript
export default defineConfig({
  base: "/cgInterviewQuestion/", // 仓库名
  // ...
});
```

### 3. 推送代码到 GitHub

```bash
cd /Users/chungang/Desktop/面试/面试题网站
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/chungang1997/cgInterviewQuestion.git
git push -u origin main
```

### 4. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` > `Pages`
3. 在 `Source` 中选择 `GitHub Actions`
4. 推送代码后，GitHub Actions 会自动构建和部署

### 5. 访问你的网站

部署完成后，可以通过以下地址访问：

```
https://chungang1997.github.io/cgInterviewQuestion/
```

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [GitHub Actions](https://github.com/features/actions) - CI/CD 自动化部署
- [GitHub Pages](https://pages.github.com/) - 静态网站托管

## 📝 文档结构

```
面试题网站/
├── docs/
│   ├── .vitepress/
│   │   └── config.mts          # VitePress 配置文件
│   ├── javascript/             # JavaScript 面试题
│   ├── typescript/             # TypeScript 面试题
│   ├── css/                    # CSS 面试题
│   ├── vue/                    # Vue 面试题
│   └── index.md                # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── package.json
└── README.md
```

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来完善面试题内容！

## 📄 License

MIT
