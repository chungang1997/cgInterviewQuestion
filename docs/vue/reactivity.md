# Vue 响应式原理

## 双向绑定原理

### 核心概念

**v-model = 绑定值 + 变化回传**

### Vue2 vs Vue3 对比

| 维度 | Vue2 | Vue3 |
|------|------|------|
| **绑定的 prop** | `value` | `modelValue` |
| **回传的事件** | `input` | `update:modelValue` |
| **多个 v-model** | 不支持 | 支持（`v-model:title`） |

### 实现原理

#### Vue2 响应式

使用 `Object.defineProperty` 劫持数据 + 依赖收集

**特点：**
- 需要递归遍历所有属性
- 无法监听新增/删除属性
- 数组需要重写方法
- 性能开销较大

**示例：**

```javascript
Object.defineProperty(obj, 'key', {
  get() {
    // 依赖收集
    return value
  },
  set(newVal) {
    // 触发更新
    value = newVal
    notify()
  }
})
```

#### Vue3 响应式

使用 `Proxy` 代理 + 响应式跟踪

**特点：**
- 代理整个对象
- 支持动态添加/删除属性
- 直接监听数组操作
- 懒代理，性能更好

**示例：**

```javascript
const proxy = new Proxy(obj, {
  get(target, key) {
    track(target, key) // 依赖收集
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    trigger(target, key) // 触发更新
    return true
  }
})
```

## Vue2 动态添加属性问题

### 问题原因

- Vue2 用 `Object.defineProperty` 劫持数据
- 只能监听已存在的属性
- 新增属性没有 getter/setter
- 无法触发响应式更新

### 解决方案

#### 方法 1：Vue.set / $set（推荐）

```javascript
this.$set(this.obj, 'newProp', 'value')
```

#### 方法 2：Object.assign 创建新对象

```javascript
this.obj = Object.assign({}, this.obj, { newProp: 'value' })
```

#### 方法 3：扩展运算符

```javascript
this.obj = { ...this.obj, newProp: 'value' }
```

#### 方法 4：预先定义（最佳）

```javascript
data() {
  return {
    obj: {
      newProp: '' // 预先定义
    }
  }
}
```

### Vue3 改进

使用 `Proxy` 代理整个对象：
- ✅ 支持动态添加/删除属性
- ✅ 无需特殊处理
- ✅ 性能更好

## nextTick 原理

### 定义

在下次 DOM 更新循环结束之后执行延迟回调，用于获取更新后的 DOM 状态。

### 为什么需要 nextTick

**Vue 的异步更新机制：**

1. Vue 更新 DOM 是**异步**的
2. 数据变化后，DOM 不会立即更新
3. 同一事件循环中的所有数据变化会被缓冲
4. 下一个 tick 统一更新 DOM（避免重复渲染）

### 使用方式

| Vue 版本 | 用法 |
|---------|------|
| **Vue2** | `this.$nextTick(callback)` 或 `Vue.nextTick(callback)` |
| **Vue3** | `import { nextTick } from 'vue'` 然后 `nextTick(callback)` |

### 实现原理

**优先级队列（降级策略）：**

1. Promise.then（微任务）
2. MutationObserver（微任务）
3. setImmediate（Node.js）
4. setTimeout（宏任务）

优先使用微任务，不支持则降级为宏任务。

### 应用场景

| 场景 | 说明 |
|------|------|
| **获取更新后的 DOM** | 数据改变后立即获取 DOM |
| **DOM 操作** | 依赖更新后的 DOM 尺寸/位置 |
| **第三方插件初始化** | 需要 DOM 完全渲染后初始化 |
| **滚动到底部** | 列表数据更新后滚动 |

### 示例

```javascript
// Vue2
this.message = '更新后的内容'
this.$nextTick(() => {
  console.log(this.$refs.msg.innerText) // '更新后的内容'
})

// Vue3
import { nextTick } from 'vue'

data.value = '新数据'
await nextTick() // 支持 Promise
console.log(document.querySelector('.msg').innerText)
```

## Diff 算法

### 核心概念

**Diff = 比较新旧虚拟 DOM，最小化更新真实 DOM**

### 核心策略

| 策略 | 说明 |
|------|------|
| **同层比较** | 只比较同一层级，不跨层级 |
| **类型判断** | 标签/组件类型不同直接替换 |
| **key 标识** | 用 key 判断节点是否可复用 |
| **双端比较** | 头头、尾尾、头尾、尾头四种对比 |

### Vue2 vs Vue3 Diff 对比

| 维度 | Vue2 | Vue3 |
|------|------|------|
| **算法** | 双端比较 | 最长递增子序列 |
| **静态标记** | 无 | 有（PatchFlag） |
| **静态提升** | 无 | 有（hoistStatic） |
| **性能** | 较好 | 更优 |

### 为什么需要 key

| 有 key | 无 key |
|--------|--------|
| ✅ 精确复用节点 | ❌ 就地复用（可能错误） |
| ✅ 减少 DOM 操作 | ❌ 更多 DOM 操作 |
| ✅ 维护组件状态 | ❌ 状态可能混乱 |
| ✅ 触发过渡动画 | ❌ 动画可能失效 |

### key 的使用原则

**✅ 正确用法：**

```vue
<!-- 用唯一 ID -->
<div v-for="item in list" :key="item.id">

<!-- 用唯一标识 -->
<div v-for="user in users" :key="user.username">
```

**❌ 错误用法：**

```vue
<!-- 不要用 index -->
<div v-for="(item, index) in list" :key="index">

<!-- 不要用随机数 -->
<div v-for="item in list" :key="Math.random()">
```

### Vue3 优化

**PatchFlag 静态标记：**

- 标记动态内容
- 只对比动态部分
- 跳过静态节点
- 大幅提升性能

**静态提升：**

- 静态节点只创建一次
- 重复使用相同引用
- 减少内存占用

**最长递增子序列：**

- 最小移动次数
- 优化列表更新
- 减少 DOM 操作
