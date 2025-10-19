import { defineConfig } from "vitepress";

export default defineConfig({
  title: "前端面试题",
  description: "全面的前端面试知识库",
  base: "/interview-docs/",
  lang: "zh-CN",

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript", link: "/javascript/" },
      { text: "TypeScript", link: "/typescript/" },
      { text: "CSS", link: "/css/" },
      { text: "Vue", link: "/vue/" },
    ],

    sidebar: {
      "/javascript/": [
        {
          text: "JavaScript",
          items: [
            { text: "概览", link: "/javascript/" },
            { text: "基础知识", link: "/javascript/basics" },
            { text: "ES6+特性", link: "/javascript/es6" },
            { text: "异步编程", link: "/javascript/async" },
            { text: "原型与继承", link: "/javascript/prototype" },
          ],
        },
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          items: [
            { text: "概览", link: "/typescript/" },
            { text: "基础类型", link: "/typescript/basic-types" },
            { text: "高级类型", link: "/typescript/advanced-types" },
            { text: "泛型", link: "/typescript/generics" },
            { text: "装饰器", link: "/typescript/decorators" },
          ],
        },
      ],
      "/css/": [
        {
          text: "CSS",
          items: [
            { text: "概览", link: "/css/" },
            { text: "布局", link: "/css/layout" },
            { text: "选择器", link: "/css/selectors" },
            { text: "动画", link: "/css/animation" },
            { text: "响应式设计", link: "/css/responsive" },
          ],
        },
      ],
      "/vue/": [
        {
          text: "Vue",
          items: [
            { text: "概览", link: "/vue/" },
            { text: "响应式原理", link: "/vue/reactivity" },
            { text: "组件通信", link: "/vue/communication" },
            { text: "Vue2 vs Vue3", link: "/vue/vue2-vs-vue3" },
            { text: "Composition API", link: "/vue/composition-api" },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/yourusername/interview-docs",
      },
    ],

    footer: {
      message: "基于 VitePress 构建",
      copyright: "Copyright © 2025-present",
    },

    search: {
      provider: "local",
    },

    outline: {
      level: [2, 3],
      label: "本页目录",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },
});
