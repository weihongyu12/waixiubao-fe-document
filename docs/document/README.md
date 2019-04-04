# 文档

## 格式

文档格式使用 [markdown](https://daringfireball.net/projects/markdown/syntax)

## 框架
使用 [vuepress](https://vuepress.vuejs.org/zh/) 编写和生成文档静态页面，并部署到内部服务器

安装 vuepress

```bash
yarn add vuepress @vuepress/plugin-active-header-links @vuepress/plugin-back-to-top @vuepress/plugin-medium-zoom @vuepress/plugin-pwa -D
```

配置 `package.json`

```json{3,4}
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

在开发中预览和编写文档

```bash
yarn run docs:dev
```

为文档生成静态文件

```bash
yarn run docs:build
```

配置`docs/.vuepress/config.js`

```js
// docs/.vuepress/config.js
module.exports = {
  title: '外修宝',
  description: '适用于外修宝 Web 平台开发',
  evergreen: true,
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {text: '文档1', link: '/docs1/'},
      {text: '文档2', link: '/docs2/'},
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
```
