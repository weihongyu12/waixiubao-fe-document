---
lang: zh-cmn-Hans-CN
---

# RESTful API

## 快速开始

| 操作 | Methods | SQL | Model | 路径 |
|-----|---------|------|------|------|
| 读取（READ） | GET | SELECT | model.collection.index | /collection |
| 读取（READ） | GET | SELECT | model.collection.show | /collection/:id |
| 创建（Create） | POST | INSERT | model.collection.create | /collection |
| 更新（Update） | PUT | UPDATE | model.collection.update | /collection/:id |
| 删除（Delete） | DELETE | DELETE | model.collection.destroy | /collection/:id |

## 协议和域名

- 总是启用 **HTTPS 协议**
- API 应该与前端页面部署在不同的域名

```
https://api.waixiubao.com/
```

::: tip
服务端 API 与前端页面在不同域名时，应该使用 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 避免跨域。
:::

## 操作

| 操作 | Methods | 路径 | 响应状态行 | 响应体 |
|-----|---------|------|-----------|-------|
| 读取（READ） | GET  | /collection | 200 OK | JSON 数组 |
| 读取（READ） | GET  | /collection/:id | 200 OK | JSON 对象 |
| 创建（Create） | POST  | /collection | 201 Created | JSON 对象 |
| 更新（Update） | PUT  | /collection/:id | 200 OK | JSON 对象 |
| 删除（Delete） | DELETE  | /collection/:id | 204 No Content |  |

### 读取列表

```
GET /collection
```

Model

```js
const response = await model.collection.index()
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
    "createAt": "2016-09-27T07:53:31.872Z"
  },
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "content": "content",
    "title": "《一起学 Node.js》彻底重写完毕",
    "top": true,
    "replyCount": 193,
    "createAt": "2016-09-27T07:53:31.872Z"
  }
]
```

::: tip
如果该列表是个分页列表，可以允许返回 JSON 对象，但是主数据依然为 JSON 数组。
:::

### 读取资源

```
GET /collection/:id
```

Model

```js
const response = await model.collection.show(id)
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON对象

```json
{
  "id": "57ea257b3670ca3f44c5beb6",
  "content": "content",
  "title": "《一起学 Node.js》彻底重写完毕",
  "top": true,
  "replyCount": 155,
  "createAt": "2016-09-27T07:53:31.872Z"
}
```

### 创建

```
POST /collection
```

Model

```js
const response = await model.collection.create(params)
```

响应状态行

```
HTTP/1.1 201 Created
```

响应体：JSON对象

```json
{
  "topicId": "57ea257b3670ca3f44c5beb6"
}
```

### 更新

```
PUT /collection/:id
```

Model

```js
const response = await model.collection.update(id, params)
```

响应状态行

```
HTTP/1.1 200 OK
```

响应体：JSON对象

```json
{
  "topicId": "57ea257b3670ca3f44c5beb6"
}
```

### 删除

```
DELETE /collection/:id
```

Model

```js
const response = await model.collection.destroy(id)
```

响应状态行

```
HTTP/1.1 204 No Content
```

## 错误处理

### 4xx错误

4xx状态码表示客户端错误，主要有下面几种

#### 400 Bad Request

服务器不理解客户端的请求，未做任何处理。该错误通常为程序逻辑手动抛出的异常。

::: warning
注意 400 Bad Request 与 422 Unprocessable Entity 的区别，400 为服务端程序执行逻辑异常，422 为数据校验异常，两者都不会对数据库发生更改。422 拦截位于 400 之前，常用于表单验证。
:::

#### 401 Unauthorized

用户未提供身份验证凭据，或者没有通过身份验证。发生 401 错误时，前端应跳转至授权页面重新获取用户授权。

#### 403 Forbidden

用户通过了身份验证，但是不具有访问资源所需的权限。发生 403 错误时，前端应重新跳转至 403 页面进行提示。

::: warning
注意 401 Unauthorized 与 403 Forbidden 的区别，401 为用户为授权，通常是用户没有登录。403 为用户已经得到授权，但是不允许访问该功能。
:::

#### 422 Unprocessable Entity

客户端上传的信息或附件无法处理，导致请求失败。该错误常用于表单验证，当表单信息验证未通过时，应该抛出 422 错误。

### 5xx错误

5xx 状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息。

::: warning
一般来说，5xx 状态是服务端的错误，前端仅需要在页面提示异常，但是其错误的修补应由服务端完成。
:::

### 错误响应

在接口处理发生错误的时候，4xx 或者 5xx 的状态码。所有的异常对象都是对这个异常状态的描述，其中 error 字段是错误的描述，detail 字段（可选）是导致错误的详细原因。

对于 400 或者 422 返回的信息应该尽可能详尽，方便前端捕捉以提示信息，以提升用户体验。

```json
{
	"error": "验证失败",
	"detail": [{
		"message": "required",
		"code": "missing_field"
	}]
}
```

对于其他 4xx 或 5xx，可以把状态描述放进 error 里

```json
{
	"error": "Internal Server Error",
	"detail": []
}
```

::: danger
注意，在开发环境中，可以把服务端的异常抛出方便调试，但是在生产环境中绝对不要这么做！
:::

## 过滤信息

API 可以提供参数，过滤返回结果

```
?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?key=value：指定筛选条件
```

## 其他

- API的身份认证应该使用 OAuth 2.0 框架。
- 服务器返回的数据格式，应该尽量使用JSON，避免使用XML。
