# ZoneSeat 项目详细技术实现分析

## 目录

- [1. 项目架构设计](#1-项目架构设计)
- [2. 核心功能实现](#2-核心功能实现)
- [3. 状态管理实现](#3-状态管理实现)
- [4. 路由与导航](#4-路由与导航)
- [5. HTTP 请求封装](#5-http请求封装)
- [6. 组件化架构](#6-组件化架构)
- [7. 样式与主题](#7-样式与主题)
- [8. 构建与部署](#8-构建与部署)
- [9. 代码质量与规范](#9-代码质量与规范)

## 1. 项目架构设计

### 1.1 整体架构模式

**H5 项目 - 现代化 MVVM 架构**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     View        │    │   ViewModel     │    │     Model       │
│   (Vue 3 SFC)   │◄───┤  (Composition   │◄───┤   (Pinia Store) │
│     组件层       │    │     API)        │    │    数据层        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Web 项目 - 传统 Vue 2 架构**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     View        │    │   Component     │    │     Store       │
│   (Vue 2 SFC)   │◄───┤   (Options      │◄───┤  (Vuex Store)   │
│     模板层       │    │     API)        │    │    状态层        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 分层设计

```
┌──────────────────────────────────────┐
│            Presentation Layer         │  视图层
│        (Components + Pages)           │
├──────────────────────────────────────┤
│             Business Layer            │  业务层
│        (Composables + Hooks)          │
├──────────────────────────────────────┤
│              Data Layer               │  数据层
│         (API + Store + Utils)         │
├──────────────────────────────────────┤
│           Infrastructure Layer        │  基础层
│       (HTTP + Router + Config)        │
└──────────────────────────────────────┘
```

## 2. 核心功能实现

### 2.1 选座功能实现

#### H5 选座组件核心技术

**Canvas 绘图引擎**

```typescript
// 核心绘制逻辑
const redraw = async (ctx, width, height) => {
  // 1. 清空画布
  ctx.value.clearRect(0, 0, width, height);

  // 2. 保存上下文状态
  ctx.value.save();

  // 3. 应用变换矩阵(平移+缩放)
  await ctx.value.translate(
    moveX.value * canvasScale.value,
    moveY.value * canvasScale.value
  );
  ctx.value.scale(canvasScale.value, canvasScale.value);

  // 4. 绘制图形元素
  for (const shape of shapes.value) {
    if (shape.type === "rect") await drawRect(ctx, shape);
    else if (shape.type === "circle") await drawCircle(ctx, shape);
    else if (shape.type === "polygon") await drawPolygon(ctx, shape);
  }

  // 5. 恢复上下文状态
  ctx.value.restore();
};
```

**交互处理机制**

```typescript
// 多点触控识别
const handleMouseDown = throttle(async (event) => {
  if (isMobile() && event.touches) {
    if (event.touches.length === 2) {
      // 双指缩放
      initialPinchDistance.value = getTouchDistance(event);
      return;
    }
    // 单指操作
    const touch = event.touches[0];
    startX.value = (touch.clientX - dot.left) / canvasScale.value;
  }

  // 座位选择逻辑
  for (let i = 0; i < shapes.value.length; i++) {
    const shape = shapes.value[i];
    const seatData = shape.seatData || [];

    seatData.forEach((seat) => {
      if (isPointInSeat(startX.value, startY.value, seat, shape)) {
        seat.type = seat.type === "selected" ? "" : "selected";
        emits("choose", { seat, region: shape });
      }
    });
  }
}, 100);
```

#### Web 项目座位管理

**网格化座位系统**

```javascript
// 座位数据结构化
seatData: {
  handler(val) {
    this.list = []
    for (let i = 0; i < this.maxRow; i++) {
      let rows = [];
      for (let j = 0; j < this.maxCol; j++) {
        const data = val.find(item => item.c === j && item.r === i);
        rows.push(data || {
          colNumber: null,
          rowNumber: null,
          status: 0,
          c: j, r: i,
          isSelected: false,
          color: 'rgb(170, 170, 170)',
        })
      }
      this.list.push(rows)
    }
  }
}
```

**框选功能实现**

```javascript
// 拖拽框选算法
getElementsInRect() {
  const seats = this.$refs.box.querySelectorAll('.body-col');
  seats.forEach((seat) => {
    const seatRect = seat.getBoundingClientRect();
    // 判断座位是否在选择框内
    if (seatRect.left >= this.startX + dot.left &&
        seatRect.right <= this.endX + dot.left &&
        seatRect.top >= this.startY + dot.top &&
        seatRect.bottom <= this.endY + dot.top) {
      // 切换座位选中状态
      let data = this.list[rIndex][cIndex];
      data.isSelected = !data.isSelected;
    }
  });
}
```

### 2.2 主题切换实现

**Web 项目动态主题**

```javascript
// Element UI主题色动态切换
async theme(val) {
  const themeCluster = this.getThemeCluster(val.replace("#", ""));
  const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));

  // 获取Element UI样式
  if (!this.chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
    await this.getCSSString(url, "chalk");
  }

  // 替换颜色值
  let newStyle = this.updateStyle(this.chalk, originalCluster, themeCluster);

  // 应用新样式
  let styleTag = document.getElementById("chalk-style");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.setAttribute("id", "chalk-style");
    document.head.appendChild(styleTag);
  }
  styleTag.innerText = newStyle;
}
```

**Ant Design 主题切换**

```javascript
// Less变量动态修改
window.less.modifyVars({
  "@primary-color": val,
  "@link-color": val,
  "@btn-primary-bg": val,
});
```

## 3. 状态管理实现

### 3.1 H5 项目 - Pinia 实现

**Store 模块化**

```typescript
// store/modules/user.ts
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: <any>{},
    loginInfo: <any>{},
    token: <any>"",
  }),
  actions: {
    async loginOut() {
      router.push("/login");
      this.$reset(); // Pinia重置状态
    },
  },
  persist: true, // 自动持久化
});
```

**全局状态配置**

```typescript
// store/index.ts
const store = createPinia();
store.use(createPersistedState()); // 持久化插件

// 模块导出
export * from "./modules/locales";
export * from "./modules/global";
export * from "./modules/user";
```

### 3.2 Web 项目 - Vuex 实现

**自动模块注册**

```javascript
// store/index.js
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [persistedState({ storage: window.sessionStorage })],
});
```

## 4. 路由与导航

### 4.1 H5 项目路由配置

**路由守卫实现**

```typescript
// router/index.ts
router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start(); // 进度条

  // 路由缓存管理
  useCachedViewStoreHook().addCachedView(to);

  // 动态页面标题
  setPageTitle(to.meta.title);

  next();
});

router.afterEach(() => {
  NProgress.done();
});
```

**类型安全路由**

```typescript
export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}
```

### 4.2 Web 项目路由配置

**静态路由表**

```javascript
export const constantRouterMap = [
  {
    path: "/",
    hidden: true,
    redirect: "/login",
    meta: { title: "重定向首页" },
  },
  {
    path: "/login",
    component: () => import("@/views/test/index"),
    meta: { title: "login" },
    hidden: true,
  },
];

// 动态权限路由
export const asyncRouterMap = [];
```

## 5. HTTP 请求封装

### 5.1 H5 项目请求封装

**类式封装**

```typescript
class Http {
  private static axiosInstance: AxiosInstance;
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截器
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use((config) => {
      NProgress.start();
      const userStore = useUserStore();
      if (userStore.token) {
        config.headers["token"] = userStore.token;
      }
      return config;
    });
  }

  // 响应拦截器
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      const { code, msg, data } = response.data;
      const isSuccess = data && code === ResultEnum.SUCCESS;

      if (isSuccess || code === 0) {
        return data;
      } else {
        // 错误处理
        switch (code) {
          case 1001:
          case 1002:
            showToast("登录失效，请重新登录");
            const userStore = useUserStore();
            userStore.loginOut();
            break;
          default:
            showToast(msg);
            break;
        }
      }
    });
  }

  // 通用请求方法
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}
```

**API 模块化**

```typescript
// api/login/index.ts
export function login(params: {
  code?: string;
  password?: string;
  phone?: string;
  source: "h5" | "pc";
  username?: string;
  way: "phone" | "user";
}) {
  return http.request({
    url: "/user/login",
    method: "post",
    data: params,
  });
}
```

## 6. 组件化架构

### 6.1 H5 项目组件设计

**Composition API 模式**

```vue
<script setup>
// 响应式数据
const shapes = ref([]);
const isDrawing = ref(false);
const canvasScale = ref(3);

// 计算属性
const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|iphone|ipad|ipod|windows phone|iemobile)/i.test(userAgent);
};

// 生命周期
onMounted(async () => {
  canvas.value = drawingCanvas.value;
  ctx.value = canvas.value.getContext("2d");
  canvas.value.width = canvas.value.clientWidth;
  canvas.value.height = canvas.value.clientHeight;
});

// 组件暴露方法
defineExpose({
  getSelectedSeats,
  cancelSeat,
  clearCanvas,
  refreshData,
  reset,
  centerRegion,
});
</script>
```

### 6.2 Web 项目组件设计

**Options API 模式**

```javascript
export default {
  name: "Seat",
  props: {
    mode: { type: String, default: "select" },
    showSeatNumber: { type: Boolean, default: false },
    data: { type: Array, default: () => [] },
  },
  data() {
    return {
      list: [],
      selectedData: [],
      seatData: [],
    };
  },
  watch: {
    seatData: {
      handler(val) {
        // 数据变化处理逻辑
        this.formatSeatData(val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectSeat(rIndex, cIndex) {
      // 座位选择逻辑
    },
  },
};
```

## 7. 样式与主题

### 7.1 H5 项目样式架构

**CSS 组织结构**

```scss
// styles/index.less
@import "variables.less";  // 变量定义
@import "mixin.less";      // 混合宏
@import "tailwind.css";    // Tailwind CSS

// 全局样式
* {
  box-sizing: border-box;
}

// 组件样式作用域
<style scoped lang="scss">
.draw-box {
  width: 100%;
  height: 100%;
  position: relative;

  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
```

**移动端适配**

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    "cnjm-postcss-px-to-viewport": {
      viewportWidth: 375, // 设计稿宽度
      minPixelValue: 1, // 最小转换数值
      unitPrecision: 2, // 转换精度
    },
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"],
    },
  },
};
```

### 7.2 Web 项目样式系统

**SCSS 预处理器**

```scss
// 主题变量
$theme: var(--theme, rgba(0, 0, 0, 0.65));

// 组件样式
.seat-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  user-select: none;

  .col {
    width: calc(24px * var(--scale));
    height: calc(24px * var(--scale));
    font-size: calc(14px * var(--scale));
    margin: calc(5px * var(--scale));
  }
}
```

## 8. 构建与部署

### 8.1 H5 项目构建配置

**Vite 配置优化**

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver(), TDesignResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(root, "src/icons/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteCompression(), // Gzip压缩
      enableCDN(env.VITE_CDN_DEPS), // CDN加速
    ],
    build: {
      outDir: "saleTicketH5",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
```

### 8.2 Web 项目构建配置

**Webpack 优化**

```javascript
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/safeWeb/" : "/",
  outputDir: "safeWeb",
  productionSourceMap: false,

  chainWebpack: (config) => {
    if (IS_PROD) {
      // 打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }

    // SVG图标处理
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
```

## 9. 代码质量与规范

### 9.1 类型安全

**TypeScript 集成**

```typescript
// H5项目类型定义
interface RouteMetaType {
  title?: string;
  noCache?: boolean;
}

interface LoginParams {
  code?: string;
  password?: string;
  phone?: string;
  source: "h5" | "pc";
  username?: string;
  way: "phone" | "user";
}

// 泛型HTTP方法
public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // 实现逻辑
  });
}
```

### 9.2 代码规范

**ESLint 配置**

```javascript
// H5项目
"eslintConfig": {
  "root": true,
  "extends": [
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

**Git 提交规范**

```javascript
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "ci",
        "build",
      ],
    ],
  },
};
```

## 总结

该项目展现了现代前端开发的多个技术层面：

### 🏗️ 架构优势

1. **分层清晰**：视图层、业务层、数据层职责明确
2. **模块化**：组件、工具、配置高度模块化
3. **类型安全**：H5 项目全面 TypeScript 支持
4. **响应式**：数据驱动的响应式更新机制

### 🚀 技术亮点

1. **Canvas 绘图**：高性能选座绘制引擎
2. **多端适配**：移动端和桌面端优化
3. **主题系统**：动态主题切换机制
4. **状态管理**：现代化状态管理方案

### 🔧 工程化能力

1. **构建优化**：Vite/Webpack 构建性能优化
2. **代码质量**：ESLint + Prettier + Commitlint
3. **自动化**：组件自动导入、路由自动注册
4. **部署优化**：CDN、压缩、缓存策略

该项目在技术选型、架构设计、代码实现等方面都体现了较高的工程化水平和技术深度。
