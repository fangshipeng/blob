import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "房士鹏的博客",
  description: "关于前端的知识分享",
  themeConfig: {
    siteTitle: "房士鹏的博客❤",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Vue',
        collapsed: true,
        items: [
          { text: '介绍', link: '/vue/index.md' },
          { text: '右键菜单的封装', link: '/vue/ContextMenu.md' },
          { text: '静态资源的动态加载', link: '/vue/静态资源的动态加载.md' },
        ]
      },
      {
        text: '现代化CSS',
        collapsed: true,
        items: [
          { text: '如何实现高度的自动过渡', link: '/现代化CSS/如何实现高度的自动过渡.md' },
        ]
      },
      {
        text: '面试分享',
        collapsed: true,
        items: [
          { text: '并发任务控制', link: '/面试分享/并发任务控制.md' },
          { text: '大量任务执行的调度', link: '/面试分享/大量任务执行的调度.md' },
          { text: '大文件分片', link: '/面试分享/大文件分片.md' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 房士鹏'
    },
  }
})
