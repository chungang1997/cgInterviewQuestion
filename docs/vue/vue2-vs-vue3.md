# Vue2 vs Vue3 核心区别

## 🔥 核心变化总览

**Vue3 = Composition API + Proxy 响应式 + 性能优化 + TypeScript 支持**

## 重大变化对比

| 维度 | Vue2 | Vue3 |
|------|------|------|
| **响应式原理** | Object.defineProperty | Proxy |
| **API 风格** | Options API | Composition API（可选 Options） |
| **生命周期** | beforeDestroy/destroyed | onBeforeUnmount/onUnmounted |
| **根元素** | 必须单根节点 | 支持多根节点（Fragment） |
| **TypeScript** | 支持较弱 | 完全支持 |
| **性能** | 较好 | 更优（编译优化） |
| **体积** | ~32KB | ~13KB（Tree-shaking） |
| **创建应用** | `new Vue()` | `createApp()` |

## 一、响应式系统

### 实现原理对比

| 对比项 | Vue2 | Vue3 |
|--------|------|------|
| **实现原理** | Object.defineProperty | Proxy |
| **监听数组** | 重写数组方法 | 直接监听 |
| **动态属性** | 需要 $set | 直接添加 |
| **性能** | 初始化慢（递归遍历） | 初始化快 |
| **深度监听** | 递归遍历所有属性 | 懒代理（按需） |

### 示例对比

```javascript
// Vue2 - 无法监听的情况
obj.newProp = 'value'  // ❌ 不会触发更新
delete obj.prop        // ❌ 不会触发更新
arr[0] = 'new'         // ❌ 不会触发更新

// 需要使用 $set
this.$set(obj, 'newProp', 'value')  // ✅ 触发更新

// Vue3 - 可以直接监听
obj.newProp = 'value'  // ✅ 触发更新
delete obj.prop        // ✅ 触发更新
arr[0] = 'new'         // ✅ 触发更新
```

## 二、组合式 API vs 选项式 API

### Vue2 - Options API

```javascript
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('mounted')
  }
}
```

### Vue3 - Composition API

```javascript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++

    onMounted(() => {
      console.log('mounted')
    })

    return { count, increment }
  }
}
```

### 对比

| 维度 | Options API | Composition API |
|------|-------------|-----------------|
| **代码组织** | 按选项类型分散 | 按功能逻辑聚合 |
| **逻辑复用** | Mixin（易冲突） | Composables（清晰） |
| **类型推导** | 弱 | 强（TS 友好） |
| **代码量** | 较多 | 较少 |
| **学习曲线** | 平缓 | 较陡 |

## 三、生命周期变化

| Vue2 | Vue3 Composition API |
|------|---------------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| **beforeDestroy** | **onBeforeUnmount** |
| **destroyed** | **onUnmounted** |
| activated | onActivated |
| deactivated | onDeactivated |

## 四、新特性

### 1. Fragment（多根节点）

```vue
<!-- Vue2 - 必须单根 -->
<template>
  <div>
    <header></header>
    <main></main>
  </div>
</template>

<!-- Vue3 - 支持多根 -->
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

### 2. Teleport（传送门）

```vue
<!-- 将内容渲染到 body -->
<teleport to="body">
  <div class="modal">模态框</div>
</teleport>
```

### 3. Suspense（异步组件）

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <Loading />
  </template>
</Suspense>
```

## 五、性能优化

| 优化项 | Vue2 | Vue3 |
|--------|------|------|
| **编译优化** | 无 | PatchFlag（静态标记） |
| **静态提升** | 无 | hoistStatic |
| **事件缓存** | 无 | cacheHandlers |
| **Diff 算法** | 双端比较 | 最长递增子序列 |
| **Tree-shaking** | 不支持 | 完全支持 |
| **打包体积** | ~32KB | ~13KB |

### PatchFlag 示例

Vue3 在编译时会标记动态内容：

```javascript
// 编译后
createVNode("div", null, [
  createVNode("p", null, _ctx.message, 1 /* TEXT */)
])
// 1 表示只有文本是动态的，其他都是静态的
```

## 六、语法差异

### 1. 创建应用

```javascript
// Vue2
import Vue from 'vue'
new Vue({
  render: h => h(App)
}).$mount('#app')

// Vue3
import { createApp } from 'vue'
createApp(App).mount('#app')
```

### 2. 全局 API

```javascript
// Vue2
Vue.component('MyComponent', {})
Vue.directive('focus', {})
Vue.mixin({})

// Vue3
const app = createApp(App)
app.component('MyComponent', {})
app.directive('focus', {})
app.mixin({})
```

### 3. v-model

```vue
<!-- Vue2 -->
<MyInput v-model="value" />
<!-- 等价于 -->
<MyInput :value="value" @input="value = $event" />

<!-- Vue3 -->
<MyInput v-model="value" />
<!-- 等价于 -->
<MyInput :modelValue="value" @update:modelValue="value = $event" />

<!-- Vue3 支持多个 v-model -->
<MyInput v-model:title="title" v-model:content="content" />
```

### 4. 过滤器

```javascript
// Vue2 - 有 filters
{{ message | capitalize }}

// Vue3 - 移除 filters，用方法或计算属性
{{ capitalize(message) }}
```

## 七、组件通信差异

| 方式 | Vue2 | Vue3 |
|------|------|------|
| **$children** | 支持 | 移除 |
| **$listeners** | 支持 | 移除（合并到 $attrs） |
| **$attrs** | 不含 class/style | 含 class/style |
| **emits 选项** | 可选 | 推荐显式声明 |

## 八、TypeScript 支持

```typescript
// Vue3 - 原生 TS 支持
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref<number>(0)  // 类型推导
    const increment = (): void => {
      count.value++
    }
    return { count, increment }
  }
})
```

## 九、迁移要点

### 需要修改的

- ❌ 移除 filters
- ❌ 移除 $children
- ❌ $listeners 合并到 $attrs
- ❌ v-model 改为 modelValue
- ✅ 全局 API 改为应用实例

### 推荐升级的

- ✅ 使用 Composition API
- ✅ 使用 `<script setup>`
- ✅ TypeScript 类型支持

## 面试高频问答

### Q1: Vue2 和 Vue3 最大的区别是什么？

- 响应式原理：Object.defineProperty → Proxy
- API 风格：Options API → Composition API
- 性能优化：编译优化、Tree-shaking、更小体积
- TypeScript：完全支持，类型推导更好

### Q2: 为什么 Vue3 用 Proxy 代替 Object.defineProperty？

- Proxy 可以监听对象/数组的所有操作
- 支持动态添加/删除属性
- 支持数组索引和 length 修改
- 性能更好（懒代理，按需监听）

### Q3: Composition API 相比 Options API 的优势？

- 逻辑更集中（相关代码在一起）
- 更好的代码复用（Composables 代替 Mixin）
- TypeScript 支持更好
- 更灵活的代码组织

### Q4: Vue3 性能为什么更好？

- Proxy 响应式性能更好
- PatchFlag 静态标记（只比较动态内容）
- 静态提升（静态节点只创建一次）
- Tree-shaking（按需引入）
- Diff 算法优化（最长递增子序列）

### Q5: Vue2 项目如何迁移到 Vue3？

- 使用 @vue/compat 兼容模式
- 逐步替换全局 API
- Options API 可继续使用
- 新代码使用 Composition API
- 注意移除的特性（filters、$children 等）
