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

## 注释

使用 [JSDoc](https://jsdoc.app/) 为 JavaScript 文件添加注释，鼓励代码文档化，建议在以下情况下使用：

- 所有常量
- 所有函数
- 所有类

对于比较复杂的逻辑，可以使用单行或多行注释，建议在以下情况下使用：

- 难于理解的代码段
- 可能存在错误的代码段
- 浏览器特殊的HACK代码
- 业务逻辑强相关的代码

## 示例

- [Vue组件文档](example/vue-components/README.md)
- [RESTful API文档](example/restful-api/README.md)
- [数据字典（MySQL）](example/data-dictionary-mysql/README.md)
- [产品需求文档](example/product-requirements-document/README.md)
