# CSS 布局

## BFC（块级格式化上下文）

### 定义

BFC (Block Formatting Context) 是块级格式化上下文，是一个独立的布局区域。

### 触发条件

以下元素会创建 BFC：

- `float` 不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block`、`table-cell`、`flex`、`inline-flex`、`flow-root`
- `overflow` 不为 `visible`（常用 `hidden` 或 `auto`）

### 特性和作用

#### 1. 清除浮动

```css
.container {
  overflow: hidden; /* 触发 BFC */
}
```

#### 2. 阻止外边距折叠

```html
<div style="overflow: hidden;">
  <div style="margin: 20px;">内容</div>
</div>
```

#### 3. 防止元素被浮动元素覆盖

```css
.sidebar {
  float: left;
  width: 200px;
}

.content {
  overflow: hidden; /* 触发 BFC，不被覆盖 */
}
```

#### 4. 独立容器

- BFC 内部元素不会影响外部
- 外部元素也不会影响 BFC 内部

### 实际应用

| 场景 | 解决方案 |
|------|---------|
| 清除浮动 | 父元素 `overflow: hidden` |
| 防止外边距合并 | 触发 BFC |
| 自适应两栏布局 | 右侧触发 BFC |
| 阻止元素被浮动元素覆盖 | 触发 BFC |

## 常见布局方案

### 1. Flex 布局

**特点：** 一维布局、灵活、响应式

```css
.container {
  display: flex;
  justify-content: center; /* 主轴对齐 */
  align-items: center;     /* 交叉轴对齐 */
  flex-wrap: wrap;         /* 换行 */
}

.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}
```

**常用属性：**

- `justify-content`：主轴对齐方式
- `align-items`：交叉轴对齐方式
- `flex-direction`：主轴方向
- `flex-wrap`：是否换行

### 2. Grid 布局

**特点：** 二维布局、强大、精确控制

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列等宽 */
  grid-gap: 20px; /* 间距 */
}

.item {
  grid-column: span 2; /* 跨2列 */
}
```

### 3. 定位布局

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 居中 */
}
```

### 4. 浮动布局（传统）

```css
.left {
  float: left;
  width: 200px;
}

.right {
  margin-left: 220px;
}
```

## 渲染与重绘/回流

### 渲染流程

```
HTML → DOM树
CSS → CSSOM树
    ↓
渲染树（Render Tree）
    ↓
布局（Layout）
    ↓
绘制（Paint）
    ↓
合成（Composite）
```

### 重绘（Repaint）

**定义：** 元素样式改变但不影响布局

**触发条件：**
- 颜色改变
- 背景色改变
- 阴影改变
- `visibility` 改变

**性能：** 开销较小

### 回流（Reflow）

**定义：** 元素几何属性改变，需要重新计算布局

**触发条件：**
- 尺寸改变（width、height、padding、margin）
- 位置改变（top、left）
- 添加/删除元素
- 内容改变（文本改变）
- 浏览器窗口 resize
- 读取某些属性（offsetTop、scrollTop、clientTop）

**性能：** 开销大，会触发后续的绘制和合成

### 优化策略

#### 1. 减少回流

```javascript
// ❌ 糟糕 - 多次回流
el.style.width = '100px'
el.style.height = '200px'
el.style.margin = '10px'

// ✅ 好 - 一次回流
el.style.cssText = 'width: 100px; height: 200px; margin: 10px;'

// 或使用 class
el.className = 'new-style'
```

#### 2. 批量修改 DOM

```javascript
// ❌ 糟糕
for (let i = 0; i < 1000; i++) {
  container.innerHTML += '<div>item</div>'
}

// ✅ 好
const fragment = document.createDocumentFragment()
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div')
  div.textContent = 'item'
  fragment.appendChild(div)
}
container.appendChild(fragment)
```

#### 3. 使用 transform 代替 top/left

```css
/* ❌ 触发回流 */
.box {
  position: absolute;
  left: 100px;
}

/* ✅ 只触发合成 */
.box {
  transform: translateX(100px);
}
```

#### 4. 避免逐条读取布局信息

```javascript
// ❌ 糟糕 - 每次读取都触发回流
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = box.offsetWidth + 'px'
}

// ✅ 好 - 缓存布局信息
const width = box.offsetWidth
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = width + 'px'
}
```

#### 5. 使用 GPU 加速

```css
.box {
  will-change: transform;
  transform: translateZ(0);
}
```

### 性能对比

| 操作 | 回流 | 重绘 | 合成 |
|------|-----|-----|-----|
| 改变颜色 | ❌ | ✅ | ✅ |
| 改变位置（transform） | ❌ | ❌ | ✅ |
| 改变位置（top/left） | ✅ | ✅ | ✅ |
| 改变尺寸 | ✅ | ✅ | ✅ |
| 添加元素 | ✅ | ✅ | ✅ |

**性能：** 合成 > 重绘 > 回流
