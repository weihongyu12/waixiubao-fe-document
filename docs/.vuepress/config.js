// https://vuepress.vuejs.org/

module.exports = {
  title: '外修宝前端设计',
  description: '适用于外修宝 Web 平台开发',
  evergreen: true,
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {text: '代码', link: '/code/'},
      {text: '构建流程', link: '/build/'},
      {text: '测试', link: '/test/'},
      {text: '功能设计', link: '/features/'},
    ],
    sidebar: 'auto',
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    ],
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/medium-zoom',
  ],
};
