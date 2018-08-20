# 测试

## 静态检查

静态检查工具使用 ESLint，在出现错误时，不允许构建，并且不允许提交到Git

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

为了方便开发，我们使用了 `prettier-eslint-cli` 格式化代码

```bash
npm install prettier-eslint-cli --save-dev
```

```json{3}
{
  "scripts": {
    "format": "prettier-eslint \"src/**/*.js\" \"src/**/*.vue\""
  }
}
```

```bash
npm run format
```

## 单元测试

组件的单元测试有很多好处：

* 提供描述组件行为的文档
* 节省手动测试的时间
* 减少研发新特性时产生的 bug
* 改进设计
* 促进重构

自动化测试使得大团队中的开发者可以维护复杂的基础代码。

[Vue Test Utils](https://vue-test-utils.vuejs.org/) 是 Vue 组件单元测试的官方库。配合 [mocha-webpack](https://github.com/zinserjan/mocha-webpack) 做为测试运行器，mocha-webpack 是一个 webpack + Mocha 的包裹器，同时包含了更顺畅的接口和侦听模式。这些设置的好处在于我们能够通过 webpack + vue-loader 得到完整的单文件组件支持，但这本身是需要很多配置的。


## 集成测试（e2e测试）

