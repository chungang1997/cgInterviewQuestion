import { defineConfig } from "vitepress";

export default defineConfig({
  title: "前端面试题",
  description: "全面的前端面试知识库",
  base: "/cgInterviewQuestion/",
  lang: "zh-CN",

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "首页", link: "/" },
      { text: "JavaScript", link: "/javascript/" },
      { text: "TypeScript", link: "/typescript/" },
      { text: "CSS", link: "/css/" },
      { text: "Vue", link: "/vue/" },
      { text: "历史项目", link: "/history/" },
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
      "/history/": [
        {
          text: "历史项目",
          items: [
            { text: "概览", link: "/history/" },
            { text: "360CheckMP", link: "/history/360CheckMP" },
            {
              text: "360CheckMP 项目功能模块分析文档",
              link: "/history/360CheckMP项目功能模块分析文档",
            },
            { text: "360safeBigScreen", link: "/history/360safeBigScreen" },

            { text: "360safeMP", link: "/history/360safeMP" },

            { text: "IOC_WeiX_OA", link: "/history/IOC_WeiX_OA" },

            { text: "WEB_SN", link: "/history/WEB_SN" },

            { text: "ticketWeb", link: "/history/ticketWeb" },
            { text: "YTS Web", link: "/history/ytsWeb" },

            {
              text: "ZoneSeat 技术栈分析",
              link: "/history/ZoneSeat技术栈分析文档",
            },
            {
              text: "ZoneSeat 详细技术实现分析",
              link: "/history/ZoneSeat详细技术实现分析",
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/chungang1997/cgInterviewQuestion",
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
