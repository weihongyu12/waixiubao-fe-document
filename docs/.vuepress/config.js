// https://vuepress.vuejs.org/

module.exports = {
  title: '外修宝前端设计',
  description: '适用于外修宝 Web 平台开发',
  serviceWorker: true,
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
};
