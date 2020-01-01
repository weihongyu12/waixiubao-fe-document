---
lang: zh-cmn-Hans-CN
---

# 测试

## 代码风格

### 代码检查

代码检查工具使用 ESLint，在出现错误时，不允许构建，并且不允许提交到Git

ESLint 检查采用以下两个标准同时使用：

* [eslint-config-airbnb-base](https://airbnb.io/javascript)：Airbnb 出品的 JavaScript 风格指南
* [eslint-plugin-vue](https://cn.vuejs.org/v2/style-guide/)：Vue 官方风格指南，级别使用 `plugin:vue/recommended`(优先级 C：推荐)

```javascript
module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
}
```

### 格式化

为了方便开发，我们使用了 Git Hooks 和 `prettier-eslint-cli` 格式化代码

```bash
yarn add yorkie lint-staged prettier-eslint-cli --save-dev
```

```json{3,5-13}
{
  "scripts": {
    "format": "prettier-eslint src/**/*.{js,jsx,ts,tsx,vue} --write"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": [
      "prettier-eslint --write",
      "git add"
    ]
  }
}
```

```bash
yarn format
```

## 单元测试

组件的单元测试有很多好处：

* 提供描述组件行为的文档
* 节省手动测试的时间
* 减少研发新特性时产生的 bug
* 改进设计
* 促进重构

自动化测试使得大团队中的开发者可以维护复杂的基础代码。

[Vue Test Utils](https://vue-test-utils.vuejs.org/) 是 Vue 组件单元测试的官方库。配合 [mochapack](https://github.com/sysgears/mochapack) 做为测试运行器，mocha-webpack 是一个 webpack + Mocha 的包裹器，同时包含了更顺畅的接口和侦听模式。这些设置的好处在于我们能够通过 webpack + vue-loader 得到完整的单文件组件支持，但这本身是需要很多配置的。

## E2E测试（端对端测试）

一个页面开发完成后，在对其进行提测之前，对页面进行自测是一个必不可少的环节。一方面，保证页面所开发的功能能正常运作；另一方面，保证在对一个功能进行开发时，没有影响到页面其他区域功能的正常使用。

一般情况下，自测需要人为手动地进行测试，但这样会有两个缺点，第一，需要测试的区域数量过于巨大，相似的测试操作过于频繁，浪费了人力，也影响了测试的效率；第二，人为的自测由于没有统一的自测规范，因此在测试时很容易有所疏漏，从而忽视了一些看似微小，实则影响巨大的 bug，花费了大量的时间，却得不到自测所需要的效果。针对这种情况，我们产生了实施自动化测试的想法。

通过 [@vue/cli](https://cli.vuejs.org/) 脚手架生成项目，我们会使用 [Nightwatch.js](https://nightwatchjs.org/)，为项目创建了一个自动化测试脚本，对项目的测试用例进行自动化测试，从而节约测试成本。

使用 E2E 测试之前，需要安装相关的 WebDriver：
- [chromedriver](https://www.npmjs.com/package/chromedriver) - 在 Google Chrome 中运行测试
- [geckodriver](https://www.npmjs.com/package/geckodriver) - 在 Firefox 中运行测试

```bash
yarn add chromedriver geckodriver
```

:::tip
如果在 CI 环境使用，建议在命令行加上 `--headless` 参数
```bash
yarn run test:e2e --headless
```
:::

:::warning
如果在容器（比如 CI 环境）运行 Chrome 浏览器下的 E2E 测试，需要手动关闭沙箱模式才能正确运行测试
```json{6}
{
  "test_settings": {
    "chrome": {
      "desiredCapabilities": {
        "chromeOptions": {
          "args": ["no-sandbox"]
        } 
      }
    }
  }
}
```
> [https://github.com/nightwatchjs/nightwatch/wiki/Chrome-Setup](https://github.com/nightwatchjs/nightwatch/wiki/Chrome-Setup)
:::

:::warning
由于 `@vue/cli-plugin-e2e-nightwatch` 并不能正确支持 Selenium Server，所以进行 E2E 测试时，不使用 Selenium Server
:::
