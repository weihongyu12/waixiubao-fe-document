# RESTful API 示例文档

## 通用

::: tip
关于 RESTful API 的设计可以参考 [RESTful API 设计文档](../restful-api/README.md)
:::

### Success

| 操作 | 响应状态行 |
|-----|-------|
| 读取（READ） | 200 OK |
| 读取（READ） | 200 OK |
| 创建（Create） | 201 Created |
| 更新（Update） | 200 OK |
| 删除（Delete） | 204 No Content |

### Error

#### 400 Bad Request

服务器不理解客户端的请求，未做任何处理。

```json
{
  "error": "UserNotFound",
  "detail": []
}
```

#### 401 Unauthorized

用户未提供身份验证凭据，或者没有通过身份验证。

#### 403 Forbidden

用户通过了身份验证，但是不具有访问资源所需的权限。

#### 422 Unprocessable Entity

客户端上传的信息或附件无法处理，导致请求失败。

```json
{
  "error": "UserNameTooShort",
  "detail": [{
  	"message": "required",
  	"code": "missing_field"
  }]
}
```

#### 500 Internal Server Error

5xx 状态码表示服务端错误。

```json
{
  "error": "Internal Server Error",
  "detail": []
}
```

## User

### 获取多个用户信息 <CustomBadge text="GET" type="tip" vertical="middle"/>

```
GET /user
```

#### Success 200

| 参数 | 类型 | 描述 |
|-----|------|------|
| id | String | 用户ID |
| registered | Date | 登记日期 |
| name | Date | 用户的全名 |
| nicknames | String[] | 用户昵称列表 （字符串数组） |
| profile | Object | 档案数据 |
| &emsp;age | Number | 用户年龄 |
| &emsp;image | String | 头像图片 |
| options | Object[] | 用户列表选项（对象数组） |
| &emsp;name | String | 选项名称 |
| &emsp;value | String | 选项值 |

#### 响应体示例

```json
[
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "registered": "2019-04-22T05:41:23.222Z",
    "name": "",
    "nicknames": [],
    "profile": {
      "age": 20,
      "image": ""
    },
    "options": [
      {
        "name": "",
        "value": ""
      }
    ]
  }
]
```

### 获取单个用户信息 <CustomBadge text="GET" type="tip" vertical="middle"/>

```
GET /user/:id
```

#### 参数

| 字段 | 类型 | 描述 |
|-----|------|-----|
| id | String | 用户ID |

#### Success 200

| 字段 | 类型 | 描述 |
|-----|------|------|
| id | String | 用户ID |
| registered | Date | 登记日期 |
| name | Date | 用户的全名 |
| nicknames | String[] | 用户昵称列表 （字符串数组） |
| profile | Object | 档案数据 |
| &emsp;age | Number | 用户年龄 |
| &emsp;image | String | 头像图片 |
| options | Object[] | 用户列表选项（对象数组） |
| &emsp;name | String | 选项名称 |
| &emsp;value | String | 选项值 |

#### Error 4xx

| 错误信息 | 描述 |
|---------|------|
| UserNotFound | 找不到用户的ID |

#### 响应体示例

```json
{
  "id": "57ea257b3670ca3f44c5beb6",
  "registered": "2019-04-22T05:41:23.222Z",
  "name": "",
  "nicknames": [],
  "profile": {
    "age": 20,
    "image": ""
  },
  "options": [
    {
      "name": "",
      "value": ""
    }
  ]
}
```

### 创建用户 <CustomBadge text="POST" type="info" vertical="middle"/>

```
POST /user
```

#### Success 200

| 字段 | 类型 | 描述 |
|-----|------|------|
| id | String | 用户ID |

#### Error 4xx

| 错误信息 | 描述 |
|---------|------|
| UserNameTooShort | 至少需要5个字符 |

#### 响应体示例

```json
{
  "id": "57ea257b3670ca3f44c5beb6"
}
```

### 更新用户 <CustomBadge text="PUT" type="warn" vertical="middle"/>

```
PUT /user/:id
```

#### 参数

| 字段 | 类型 | 描述 |
|-----|------|-----|
| id | String | 用户ID |

#### Success 200

| 字段 | 类型 | 描述 |
|-----|------|------|
| id | String | 用户ID |

#### Error 4xx

| 错误信息 | 描述 |
|---------|------|
| UserNameTooShort | 至少需要5个字符 |

#### 响应体示例

```json
{
  "id": "57ea257b3670ca3f44c5beb6"
}
```

### 删除用户 <CustomBadge text="DELETE" type="error" vertical="middle"/>

```
DELETE /user/:id
```

#### 参数

| 字段 | 类型 | 描述 |
|-----|------|------|
| id | String | 用户ID |
