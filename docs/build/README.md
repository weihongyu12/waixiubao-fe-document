# 流程

## 手脚架

手脚架使用@vue/cli 3.x，启用自定义配置，配置流程如下：

```bash
# 选择项目所需要的特性：
# Babel（启用Babel转码）
# PWA （启用PWA）
# Router （安装vue-router）
# Vuex （安装vuex）
# CSS Pre-processors （使用CSS预处理器）
# Linter / Formatter （使用静态检查/格式化）
# Unit Testing （启用单元测试）
# E2E Testing（启用E2E测试）
Check the features needed for your project: 
 (*) Babel
 ( ) TypeScript
 (*) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
 (*) Unit Testing
 (*) E2E Testing
```

::: tip
除TypeScript必选
:::

```bash
# 选择CSS预处理器：SCSS/SASS
Pick a CSS pre-processor:
> SCSS/SASS
  LESS
  Stylus
```

::: tip
其他预处理器如果需要可以独立安装
:::

::: tip
PostCSS, Autoprefixer 和 CSS Modules 默认支持
:::

```bash
# 选择linter / formatter配置：ESLint + Airbnb config
Pick a linter / formatter config: 
  TSLint
  ESLint with error prevention only
> ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

```bash
# 选择其他lint功能：Lint on save, Lint and fix on commit
Pick additional lint features:
 (*) Lint on save
 (*) Lint and fix on commit
```

```bash
# 选择单元测试框架：Mocha + Chai
Pick a unit testing solution: 
> Mocha + Chai
  Jest
```

```bash
# 选择E2E测试框架：Nightwatch
Pick a E2E testing solution:
  Cypress (Chrome only)
> Nightwatch (Selenium-based)
```

## 构建命令

我们需要在`package.json`文件配置以下命令：

```json{3}
{
  "scripts": {
    "build": "vue-cli-service build --modern"
  }
}
```

并通过此命令构建应用程序：

```bash
npm run build 
# yarn run build
```

通过构建，我们会得到：

* `index.html` 会带有注入的资源和 resource hint
* 第三方库会被分到一个独立包以便更好的缓存
* 小于 10kb 的静态资源会被内联在 JavaScript 中
* `public` 中的静态资源会被复制到输出目录中

我们使用了`--modern`参数 使用现代模式构建应用，为现代浏览器交付原生支持的 ES2015 代码，并生成一个兼容老浏览器的包用来自动回退。
* 现代版的包会通过 `<script type="module">` 在被支持的浏览器中加载；它们还会使用 `<link rel="modulepreload">` 进行预加载。
* 旧版的包会通过 `<script nomodule>` 加载，并会被支持 ES modules 的浏览器忽略。
* 一个针对 Safari 10 中 `<script nomodule>` 的修复会被自动注入。
* 经过分析，现代版的包已经小了约 16%。在生产环境下，现代版的包通常都会表现出显著的解析速度和运算速度，从而改善应用的加载性能。

::: tip
`<script type="module">`需要配合始终开启的 CORS 进行加载。这意味着你的服务器必须返回诸如 `Access-Control-Allow-Origin: * `的有效的 CORS 头。如果你想要通过认证来获取脚本，可使用 `corsUseCredentials` 选项。

同时，现代浏览器使用一段内联脚本来避免 Safari 10 重复加载脚本包，所以如果你在使用一套严格的 `CSP`，你需要这样显性地允许内联脚本：

```
Content-Security-Policy: script-src 'self' 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI='
```
:::

## 构建工具

### Webpack

Webpack用于应用打包，主要工作文件转码、合并、切割、压缩等等，如果需要单独配置请查看[@vue/cli文档](https://cli.vuejs.org/zh/guide/webpack.html)

### Babel

Babel是用于转化ES6至ES5的工具，生成的项目已经自带了Babel 7

可以使用[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)，按需加载需要的package，减少最后打包文件的大小

```javascript
modules.exports = {
  "plugins": [
    ["import", {
      "libraryName": "mand-mobile",
      "libraryDirectory": "lib"
    }],
  ],
};
```

### CSS

#### CSS预处理器

CSS预处理器默认选择Sass，但是在项目进行中，如果需要其他的预处理器，可以独立进行安装

```bash
# Sass
npm install -D sass-loader node-sass

# Less
npm install -D less-loader less

# Stylus
npm install -D stylus-loader stylus
```

#### PostCSS

PostCSS是一款CSS后处理器，主要用于为CSS加上浏览器兼容前缀

在实际项目中，可根据具体情况使用[postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)把`px`单位转成`rem`，从而实现不同设备下等比缩放的效果

```javascript
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 16,
      propWhiteList: []
    }),
  ],
};
```

## 部署

构建完成的文件会生成一个`dist`文件夹，将 `dist` 目录里构建的内容部署到任何静态文件服务器中，但要确保正确的 `baseUrl`

```javascript
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://cdn.exmaple.com/'
    : '/'
}
```

### 使用history模式的路由

如果不想要很丑的 hash，我们可以用路由的 [history 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面

```
# nginx.conf
location / {
  try_files $uri $uri/ /index.html;
}
```

### CORS

前端静态内容是部署在与后端 API 不同的域名上，需要适当地配置 CORS

以下是一个后端API的响应头示例

```
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authenticate
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true
```

### PWA

使用了 PWA 插件，应用必须架设在 HTTPS 上，这样 Service Worker 才能被正确注册
