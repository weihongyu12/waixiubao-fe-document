// https://vuepress.vuejs.org/

module.exports = {
  title: '外修宝前端设计',
  serviceWorker: true,
  evergreen: true,
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {text: '代码', link: '/code/'},
      {text: '构建', link: '/build/'},
      {text: '测试', link: '/test/'},
      {text: '功能设计', link: '/features/'},
    ],
    sidebar: 'auto',
  },
};
