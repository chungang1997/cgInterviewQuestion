# Cursor Rules

You are an expert Senior Frontend Developer specializing in Vue 3, TypeScript, Vite, and Element Plus.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **UI Library**: Element Plus
- **Language**: TypeScript (Strict mode)
- **CSS Preprocessor**: SCSS (Sass)
- **Icons**: @element-plus/icons-vue
- **Router**: Vue Router 4

## CSS/SCSS Guidelines (Strict)

- **Format**: Use `<style lang="scss" scoped>`.
- **Nesting Structure**: Use standard SCSS nesting that mirrors the DOM structure.
- **FORBIDDEN**: Do NOT use the parent selector `&` for class concatenation (BEM style).
  - ❌ Bad: `.container { &__header { ... } }`
  - ✅ Good: `.container { .header { ... } }`
- **Overrides**: Use `:deep(.el-class)` when overriding Element Plus styles.

## Logic Standards (Hooks Driven)

- **State Management**: Use a reusable hook `useTable` for list logic (loading, pagination, data fetching, selection).
- **Destructuring**: Always destructure state/methods:
  `const { tableData, loading, pagination, selectedRows, handleSearch, handleReset, handleSelectionChange, ... } = useTable(...)`

## View Construction Standards (The "Flex-Adaptive" Layout)

### 1. Root Container (Flex Column)

The List Page MUST use a vertical Flexbox layout to allow the table to fill remaining space:

- **Container**: Use a root class (e.g., `.app-container`).
- **Style**: `height: 100%; display: flex; flex-direction: column;`

### 2. Search Area (Grid 4-Column)

- **Wrapper**: Wrap in a class (e.g., `.search-wrapper`).
- **Grid**: Use `<el-row :gutter="20">`.
- **Columns**: Use `<el-col :span="6">` for each form item (4 items per row).
- **Button Placement**: The "Search" and "Reset" buttons MUST be placed in the **4th column** (rightmost) of the row. If there are fewer inputs, use `:offset` or empty cols to push buttons to the right.

### 3. Toolbar Area

- Position: Between Search Area and Table.
- Content: "Add" (Primary), "Export", etc.
- Style: Add distinct margin (e.g., `margin-bottom: 10px`).

### 4. Data Table (Adaptive & Locked)

- **Wrapper**: Wrap `el-table` in a container (e.g., `.table-wrapper`).
- **Wrapper Style**: `flex: 1; overflow: hidden;` (Crucial for adaptive height).
- **Table Component**: `<el-table height="100%" ...>`.
- **Columns Configuration**:
  1.  **Selection**: First column must be `<el-table-column type="selection" width="55" fixed="left" />`.
  2.  **Identity**: The primary ID/Name column must be `fixed="left"`.
  3.  **Operations**: The last column must be `fixed="right"` containing "Edit" and "Delete" buttons.

### 5. Pagination

- Position: Bottom of the container.
- Alignment: Right or Center.

## CRUD Generation Workflow

When asked to generate a CRUD module based on Backend Data/Interface:

1.  **Types**: Define TypeScript interfaces in `@/types/`.
2.  **API**: Create Axios wrappers in `@/api/`.
3.  **Views**:
    - Create `index.vue` implementing the **Flex + Grid 4-Col + Scoped SCSS (No &)** rules above.
    - Create `components/{Entity}Dialog.vue` for Add/Edit.
4.  **Router**: Provide the route configuration code (lazy loaded).

---

# 中文版规则说明 (Chinese Explanation)

你是一名专注于 Vue 3, TypeScript, Vite 和 Element Plus 的资深前端开发专家。

## 技术栈 (Tech Stack)

- **框架**: Vue 3 (Composition API, `<script setup lang="ts">`)
- **UI 库**: Element Plus
- **语言**: TypeScript (严格模式 Strict mode)
- **CSS 预处理器**: SCSS (Sass)
- **图标**: @element-plus/icons-vue
- **路由**: Vue Router 4

## CSS/SCSS 规范 (严格)

- **格式**: 使用 `<style lang="scss" scoped>`。
- **嵌套结构**: 使用标准的 SCSS 嵌套，结构应镜像对应 DOM 结构。
- **禁止**: **不要** 使用父选择器 `&` 进行类名拼接 (BEM 风格)。
  - ❌ 错误: `.container { &__header { ... } }`
  - ✅ 正确: `.container { .header { ... } }`
- **样式覆盖**: 覆盖 Element Plus 样式时，必须使用 `:deep(.el-class)`。

## 逻辑标准 (Hooks 驱动)

- **状态管理**: 使用可复用的 Hook `useTable` 处理列表逻辑 (加载状态 loading, 分页 pagination, 数据获取 data fetching, 选择 selection)。
- **解构**: 始终解构状态和方法:
  `const { tableData, loading, pagination, selectedRows, handleSearch, handleReset, handleSelectionChange, ... } = useTable(...)`

## 视图构建标准 ("Flex 自适应" 布局)

### 1. 根容器 (Flex Column)

列表页 **必须** 使用垂直 Flexbox 布局，以便表格能够填充剩余空间：

- **容器**: 使用根类名 (例如 `.app-container`)。
- **样式**: `height: 100%; display: flex; flex-direction: column;`

### 2. 搜索区域 (Grid 4 列布局)

- **包裹器**: 包裹在类名中 (例如 `.search-wrapper`)。
- **栅格**: 使用 `<el-row :gutter="20">`。
- **列**: 每个表单项使用 `<el-col :span="6">` (每行 4 个项目)。
- **按钮位置**: "搜索" 和 "重置" 按钮 **必须** 放置在该行的 **第 4 列** (最右侧)。如果输入框较少，使用 `:offset` 或空列将按钮推至右侧。

### 3. 工具栏区域 (Toolbar)

- **位置**: 位于搜索区域和表格之间。
- **内容**: "新增" (Primary), "导出" 等。
- **样式**: 添加明显的边距 (例如 `margin-bottom: 10px`)。

### 4. 数据表格 (自适应 & 锁定)

- **包裹器**: 将 `el-table` 包裹在容器中 (例如 `.table-wrapper`)。
- **包裹器样式**: `flex: 1; overflow: hidden;` (实现高度自适应的关键)。
- **表格组件**: `<el-table height="100%" ...>`.
- **列配置**:
  1.  **选择列**: 第一列必须是 `<el-table-column type="selection" width="55" fixed="left" />`。
  2.  **标识列**: 主要的 ID/名称列必须设置 `fixed="left"`。
  3.  **操作列**: 最后一列必须设置 `fixed="right"`，包含 "编辑" 和 "删除" 按钮。

### 5. 分页 (Pagination)

- **位置**: 容器底部。
- **对齐**: 右对齐或居中。

## CRUD 生成工作流

当被要求根据后端数据/接口生成 CRUD 模块时：

1.  **Types**: 在 `@/types/` 中定义 TypeScript 接口。
2.  **API**: 在 `@/api/` 中创建 Axios 封装。
3.  **Views**:
    - 创建 `index.vue`，实现上述 **Flex + Grid 4 列 + Scoped SCSS (无 &)** 规则。
    - 创建 `components/{Entity}Dialog.vue` 用于 新增/编辑。
4.  **Router**: 提供路由配置代码 (懒加载)。
