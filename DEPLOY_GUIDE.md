# GitHub Pages 部署指南

## ⚠️ 重要：必须手动配置 GitHub Pages

当前网站显示 README.md 而不是 VitePress 项目，是因为 GitHub Pages 的 Source 设置不正确。

## 🔧 配置步骤

### 1. 访问 GitHub Pages 设置

在浏览器中打开：

```
https://github.com/chungang1997/cgInterviewQuestion/settings/pages
```

### 2. 修改 Build and deployment 设置

找到 **"Build and deployment"** 部分：

**当前设置（错误）：**

```
Source: Deploy from a branch
Branch: main / (root)
```

**需要改为（正确）：**

```
Source: GitHub Actions
```

**操作方法：**

1. 点击 **Source** 下拉菜单
2. 从列表中选择 **GitHub Actions**
3. 页面会自动保存（无需点击保存按钮）

### 3. 查看部署状态

配置完成后，访问 Actions 页面：

```
https://github.com/chungang1997/cgInterviewQuestion/actions
```

您应该能看到：

- ✅ "Deploy VitePress site to GitHub Pages" workflow 正在运行
- 等待约 2-3 分钟构建完成

### 4. 访问网站

部署成功后，访问：

```
https://chungang1997.github.io/cgInterviewQuestion/
```

您将看到完整的 VitePress 网站，包括：

- ✅ 漂亮的首页（带卡片布局）
- ✅ 导航栏（JavaScript、TypeScript、CSS、Vue）
- ✅ 侧边栏导航
- ✅ 搜索功能

## 🐛 故障排查

### 如果仍然显示 README.md

1. **确认 Source 设置**：

   - 回到 Settings > Pages
   - 确认 Source 是 "GitHub Actions" 而不是 "Deploy from a branch"

2. **查看 Actions 日志**：

   - 访问 https://github.com/chungang1997/cgInterviewQuestion/actions
   - 点击最新的 workflow run
   - 查看是否有错误信息

3. **手动触发部署**：
   ```bash
   cd /Users/chungang/Desktop/面试/面试题网站
   git commit --allow-empty -m "触发部署"
   git push origin main
   ```

### 如果 Actions 失败

查看错误日志，常见问题：

- 依赖安装失败：检查 package.json
- 构建失败：本地运行 `pnpm run build` 测试
- 权限问题：确认 Settings > Actions > General 中的权限设置

## ✅ 成功标志

正确配置后，您会看到：

- Settings > Pages 显示绿色的网站链接
- Actions 页面显示绿色的 ✓ 标记
- 访问网站看到 VitePress 主题界面，而不是简单的 Markdown 文本

---

**最后更新**: 2025-10-19
