import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 配置站点的基本信息
  base: '/blog/', // 设置为 GitHub Pages 的仓库名，确保资源正常加载
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
          { text: '类型丢失', link: '/vue/类型丢失.md' },
        ]
      },
      {
        text: '现代化CSS',
        collapsed: true,
        items: [
          { text: '如何实现高度的自动过渡', link: '/css/如何实现高度的自动过渡.md' },
        ]
      },
      {
        text: 'git',
        collapsed: true,
        items: [
          { text: 'git基本命令', link: '/git/index.md' },
        ]
      },
      {
        text: '面试分享',
        collapsed: true,
        items: [
          { text: '并发任务控制', link: '/interview/并发任务控制.md' },
          { text: '大量任务执行的调度', link: '/interview/大量任务执行的调度.md' },
          { text: '大文件分片', link: '/interview/大文件分片.md' },
          { text: '手写API方法', link: '/interview/手写API方法.md' },
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
