# Vue 组件通信方式

## 常用通信方式（按使用频率排序）

### 1. props / emit（最常用）

**父传子 + 子传父**

```vue
<!-- 父组件 -->
<template>
  <Child :message="msg" @update="handleUpdate" />
</template>

<!-- 子组件 -->
<script>
export default {
  props: ["message"],
  methods: {
    handleClick() {
      this.$emit("update", "new value");
    },
  },
};
</script>
```

**适用场景：** 父子组件直接通信

### 2. provide / inject

**跨层级依赖注入**

```javascript
// 父组件
export default {
  provide() {
    return {
      theme: 'dark'
    }
  }
}

// 子孙组件
export default {
  inject: ['theme']
}
```

**适用场景：** 跨多层级传递数据

### 3. Vuex / Pinia

**全局状态管理**

```javascript
// Pinia Store
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Alice",
  }),
  actions: {
    updateName(name) {
      this.name = name;
    },
  },
});

// 组件中使用
const userStore = useUserStore();
console.log(userStore.name);
```

**适用场景：** 全局共享状态

### 4. 插槽 / 作用域插槽

**父向子传递 UI 内容**

```vue
<!-- 子组件 -->
<template>
  <div>
    <slot :item="data"></slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Child v-slot="{ item }">
    <span>{{ item.name }}</span>
  </Child>
</template>
```

**适用场景：** 内容分发、UI 自定义

### 5. 事件总线 / mitt

**兄弟组件通信**

```javascript
// Vue3 使用 mitt
import mitt from "mitt";
const emitter = mitt();

// 组件 A
emitter.emit("custom-event", data);

// 组件 B
emitter.on("custom-event", (data) => {
  console.log(data);
});
```

**适用场景：** 兄弟组件、无直接关系的组件

### 6. $refs

**父调用子方法**

```vue
<!-- 父组件 -->
<template>
  <Child ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.childRef.someMethod();
    },
  },
};
</script>

<!-- 子组件 Vue3 需要 defineExpose -->
<script setup>
import { defineExpose } from "vue";

const someMethod = () => {
  console.log("子组件方法被调用");
};

defineExpose({ someMethod });
</script>
```

**适用场景：** 父组件调用子组件方法

### 7. $attrs / $listeners

**属性透传**

```vue
<!-- Vue2 -->
<template>
  <div>
    <ChildComponent v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<!-- Vue3 - $listeners 已合并到 $attrs -->
<template>
  <div>
    <ChildComponent v-bind="$attrs" />
  </div>
</template>
```

**适用场景：** 高阶组件、属性透传

### 8. vue-router

**路由传参**

```javascript
// 传参
this.$router.push({
  path: "/user",
  query: { id: 1 },
});

// 接收
this.$route.query.id;
```

**适用场景：** 跨页面通信

### 9. localStorage / sessionStorage

**本地存储**

```javascript
// 存储
localStorage.setItem("token", "xxx");

// 读取
const token = localStorage.getItem("token");
```

**适用场景：** 跨页面、持久化数据

### 10. BroadcastChannel

**跨标签页通信**

```javascript
// 页面 A
const channel = new BroadcastChannel("my-channel");
channel.postMessage("Hello");

// 页面 B
const channel = new BroadcastChannel("my-channel");
channel.onmessage = (event) => {
  console.log(event.data); // 'Hello'
};
```

**适用场景：** 多标签页同步

## 场景选择指南

| 场景           | 推荐方式                |
| -------------- | ----------------------- |
| **父子通信**   | props + emit            |
| **跨多层**     | provide/inject          |
| **全局共享**   | Pinia/Vuex              |
| **父调子方法** | $refs + defineExpose    |
| **兄弟组件**   | mitt 或 Pinia           |
| **跨页面**     | 路由参数或 localStorage |
| **内容分发**   | 插槽                    |
| **属性透传**   | $attrs                  |

## 面试高频问答

### Q: Vue 组件通信有哪些方式？

最常用的有：

1. props / emit（父子）
2. provide / inject（跨层级）
3. Vuex / Pinia（全局）
4. 事件总线（兄弟）
5. $refs（父调子）

### Q: props 和 emit 的原理？

- props 是单向数据流，父传子
- 子组件不能直接修改 props
- 通过 emit 触发父组件事件实现子传父
- 本质是发布订阅模式

### Q: provide/inject 的使用场景？

- 跨多层组件传递数据
- 避免 props 逐层传递
- 常用于主题、国际化等全局配置
- 注意：不是响应式的（除非传递响应式对象）

### Q: Vuex 和 Pinia 的区别？

- Pinia 是 Vue3 官方推荐
- 更简洁的 API
- 更好的 TypeScript 支持
- 无需 mutations
- 支持多个 store
