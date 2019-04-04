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

