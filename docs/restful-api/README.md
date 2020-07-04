---
lang: zh-cmn-Hans-CN
---

# RESTful API

## 快速开始

| 操作 | Methods | SQL | 示例 Model | 示例路径 |
|-----|---------|------|------|------|
| 读取（Read） | GET | SELECT | model.article.index | /article |
| 读取（Read） | GET | SELECT | model.article.show | /article/:id |
| 创建（Create） | POST | INSERT | model.article.create | /article |
| 更新（Update） | PUT | UPDATE | model.article.update | /article/:id |
| 删除（Delete） | DELETE | DELETE | model.article.destroy | /article/:id |

## URL

URL 应该尽量简短，一般采用名词，比如 `/article` `/project`

#### 固定参数

建议使用以下参数作为固定参数，即每个API都统一可以使用这些参数

| QueryString | 说明 | 示例 |
|-------------|-----|-----|
| `limit` | 指定返回记录的数量 | `?limit=10` |
| `offset` | 指定返回记录的开始位置 | `?offset=10` |
| `page` | 指定第几页，需要与`pageSize`搭配使用 | `?page=2&pageSize=100` |
| `pageSize` | 指定每页的记录数，需要与`page`搭配使用，**如不传此参数则不分页** | `?page=2&pageSize=100` |
| `sortby` | 指定返回结果按照哪个属性排序，需要与`order`搭配使用 | `?sortby=name&order=asc` |
| `order` | 排序顺序，需要与`sortby`搭配使用 | `?sortby=name&order=asc` |

#### 非固定参数

如果需要其他过滤条件，可以使用其他的 Query String 进行过滤，需要在文档进行详细说明。

## 协议和域名

### 协议

总是启用 **HTTPS 协议**

### 跨域部署（推荐）

API 应该与前端页面部署在不同的域名

```
https://api.waixiubao.com/
```

####  CORS

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

出于安全原因，浏览器限制从脚本内发起的跨源 HTTP 请求。 例如，XMLHttpRequest 和 Fetch API 遵循同源策略。 这意味着使用这些 API 的 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源，除非响应报文包含了正确CORS响应头。

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

CORS 请求失败会产生错误，但是为了安全，在 JavaScript 代码层面是无法获知到底具体是哪里出了问题。你只能查看浏览器的控制台以得知具体是哪里出现了错误。

> - [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
> - [Access-Control-Allow-Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
> - [Access-Control-Allow-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)
> - [Access-Control-Expose-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)
> - [Access-Control-Allow-Methods](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)
> - [Access-Control-Max-Age](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age)
> - [Access-Control-Allow-Credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)

::: tip
服务端 API 与前端页面在不同域名时，应该使用 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 避免跨域。
:::

### 同域部署

如果使用同域名部署的情况下，API 需要统一使用 `/api` 开头的路径访问。

```
https://www.waixiubao.com/api/
```

## 认证

API 的身份认证应该使用 OAuth 2.0 框架。

> - [HTTP 身份验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)

```
Authorization: <type> <credentials>
```

## 请求

### 请求方法

对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面四个（括号里是对应的SQL命令）。

```
GET（SELECT）：从服务器取出资源（一项或多项）。
POST（CREATE）：在服务器新建一个资源。
PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
DELETE（DELETE）：从服务器删除资源。
```

不常用的HTTP动词有下面一个（括号里是对应的SQL命令）

```
PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
```

::: danger
PUT和PATCH的区别在于，PUT会改变所有的字段，PATCH仅改变部分字段，PATCH可用于类似提交这种操作仅仅改变字段的属性，**决不允许使用POST同时进行新建和更新操作！**
:::

### 请求头

请求和响应的数据格式，应该尽量使用JSON，避免使用XML

- [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
- [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)

```
Accept: application/json
Content-Type: application/json
```

::: tip
无论是请求还是响应，JSON 数据格式应该尽量使用严格数据类型，严格的数据类型可以减少数据的转换工作，从而加强对数据的校验，增加数据类型安全
:::

::: warning
在一些特殊的场景，可能无法使用 JSON 格式进行请求（比如文件上传），这时允许使用其他数据格式发送请求，但是服务端应该尽量减少此类接口的使用场景
:::

## 错误处理

### HTTP 响应错误状态码说明

#### 常见的 HTTP 错误状态码

| 状态码 | 说明 | 场景 |
|-------|-----|--------|
| [400 Bad Request](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/400) | 语义有误，当前请求无法被服务器理解 或者 请求参数有误 | 如解析 JSON 出现错误 |
| [401 Unauthorized](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401) | 当前请求需要用户验证 | 用户未提供身份验证凭据，或者没有通过身份验证 |
| [403 Forbidden](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/403) | 当前请求拒绝访问 | 用户通过了身份验证，但是不具有访问资源所需的权限 |
| [404 Not Found](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/404) | 当前请求的 URL 不存在 | 服务端并没有此 URL 地址 |
| [422 Unprocessable Entity](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/422) | 语义正确，但是服务器无法处理所包含的指令 | 提示表单校验错误信息 |
| [500 Internal Server Error](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/500) | 服务器错误，包括了其他 5xx 码 | 服务端代码运行出现异常并未被正确处理，或者服务器已经宕机 |

#### 不常见的 HTTP 错误状态码

| 状态码 | 说明 | 出现场景 |
|-------|-----|--------|
| [405 Method Not Allowed](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/405) | 当前请求的方法不被支持 | 如服务端要求 POST，而客户端使用 GET |
| [406 Not Acceptable](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/406) | 当前请求要求的返回格式不支持 | 如 API 返回 JSON，而客户端要求 XML |
| [413 Payload Too Large](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/413) | 当前请求提交的实体数据大小超过了能够处理的范围 | 比如文件上传过大 |
| [414 URI Too Long](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/414) | 当前请求的 URI 长度超过了服务器能够解释的长度 | 如 Query String 过长，或者一些安全攻击 |
| [415 Unsupported Media Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/415) | 当前请求发送的实体格式服务端不支持 | 如服务端要求发送 JSON，而客户端发送 FormData |
| [429 Too Many Requests](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/429) | 在一定的时间内用户发送了太多的请求，即超出了“频次限制” | 用于限制用户短时间内的请求频率和预防 DDoS |

#### 401 Unauthorized

用户未提供身份验证凭据，或者没有通过身份验证。发生 401 错误时，前端应跳转至授权页面重新获取用户授权。

#### 403 Forbidden

用户通过了身份验证，但是不具有访问资源所需的权限。发生 403 错误时，前端应重新跳转至 403 页面进行提示。

::: warning
注意 401 Unauthorized 与 403 Forbidden 的区别：
- 401 为用户未授权，通常是用户没有登录。
- 403 为用户已经得到授权，但是不允许访问该功能，通常是登录的用户角色不具备该功能的权限。
:::

#### 422 Unprocessable Entity

客户端上传的信息或附件无法处理，导致请求失败。该错误常用于表单验证，当表单信息验证未通过时，应该抛出 422 错误。

#### 5xx错误

5xx 状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息。

::: warning
一般来说，5xx 状态是服务端的错误，前端仅需要在页面提示异常，但是其错误的修补应由服务端完成。
:::

### 错误响应

在接口处理发生错误的时候，4xx 或者 5xx 的状态码。所有的异常对象都是对这个异常状态的描述，其中 error 字段是错误的描述，detail 字段（可选）是导致错误的详细原因。

对于 422 返回的信息应该尽可能详尽，方便前端捕捉以提示信息，以提升用户体验。

```json
{
  "error": "验证失败",
  "detail": [
    {
      "message": "required",
      "field": "name"
    }
  ]
}
```

对于其他 4xx 或 5xx，可以把状态描述放进 error 里

```json
{
  "error": "Bad Request",
  "detail": []
}
```

```json
{
  "error": "Internal Server Error",
  "detail": []
}
```

::: danger
注意，在开发环境中，可以把服务端的异常抛出方便调试，但是在生产环境中绝对不要这么做！
:::

## 操作

| 操作 | Methods | 示例路径 | 响应状态行 | 响应体 |
|-----|---------|------|-----------|-------|
| 读取（Read） | GET  | /article | 200 OK | JSON 数组 |
| 读取（Read） | GET  | /article/:id | 200 OK | JSON 对象 |
| 创建（Create） | POST  | /article | 201 Created | JSON 对象 |
| 更新（Update） | PUT  | /article/:id | 200 OK | JSON 对象 |
| 删除（Delete） | DELETE  | /article/:id | 204 No Content |  |

### 读取数据列表（不分页）

示例请求行

```
GET /article
```

示例 Model

```js
const response = await model.article.index()
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON数组

```json
[
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "content": "content",
    "title": "《一起学 Node.js》彻底重写完毕",
    "top": true,
    "replyCount": 155,
    "createAt": 1593836794422
  },
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "content": "content",
    "title": "《一起学 Node.js》彻底重写完毕",
    "top": true,
    "replyCount": 193,
    "createAt": 1593836794422
  }
]
```

### 读取数据列表（分页）

示例请求行

```
GET /article?page=1&pageSize=20
```

示例 Model

```js
const response = await model.article.index({
  page: 1,
  pageSize: 20,
})
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON 对象，该对象至少需要包括下列信息

| 参数 | 类型 | 说明 |
|-----|-----|------|
| `data` | `Object[]` | 数据库查询到的分页数据 |
| `meta` | `Object` |  |
| &emsp;&emsp;`total` | `Number` | 查询总数据数量 |
| &emsp;&emsp;`pages` | `Number` | 分页总页数 |

```json
{
  "data": [
    {
      "id": "57ea257b3670ca3f44c5beb6",
      "content": "content",
      "title": "《一起学 Node.js》彻底重写完毕",
      "top": true,
      "replyCount": 155,
      "createAt": 1593836794422
    },
    {
      "id": "57ea257b3670ca3f44c5beb6",
      "content": "content",
      "title": "《一起学 Node.js》彻底重写完毕",
      "top": true,
      "replyCount": 193,
      "createAt": 1593836794422
    }
  ],
  "meta": {
    "total": 100,
    "pages": 10
  }
}

```

### 读取数据详细信息

示例请求行

```
GET /article/:id
```

示例 Model

```js
const response = await model.article.show(id)
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON 对象

```json
{
  "id": "57ea257b3670ca3f44c5beb6",
  "content": "content",
  "title": "《一起学 Node.js》彻底重写完毕",
  "top": true,
  "replyCount": 155,
  "createAt": 1593836794422
}
```

### 创建

示例请求行

```
POST /article
```

示例 Model

```js
const response = await model.article.create(params)
```

响应状态行

```
HTTP/1.1 201 Created
```

响应体：JSON 对象，包含了新插入数据的 ID

```json
{
  "id": "57ea257b3670ca3f44c5beb6"
}
```

### 更新

示例请求行

```
PUT /article/:id
```

示例 Model

```js
const response = await model.article.update(id, params)
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON 对象，包含了更新的数据的 ID

```json
{
  "id": "57ea257b3670ca3f44c5beb6"
}
```

### 删除

```
DELETE /article/:id
```

Model

```js
const response = await model.article.destroy(id)
```

响应状态行

```
HTTP/1.1 204 No Content
```
