# 数据字典（MySQL） 示例文档

## 表 user

| 字段名 | 数据类型 | 默认值 | 空 | 自动递增 | 备注 |
|---|---|---|---|---|---|
| id | BIGINT |   | 否 | 是 | 用户ID |
| registered | DATE |   | 否 |   | 注册日期 |
| name | VARCHAR(32) |   | 否 |   | 用户全名 |
| nicknames | VARCHAR(255) |   | 是 |   | 用户昵称 |
