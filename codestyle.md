# 前端代码规范（Code Style）

> **规范来源**：[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
> （Google 官方 JavaScript 代码风格标准）

本项目前端 JavaScript 代码遵循 Google JavaScript Style Guide，
以下列出与本项目直接相关的核心约定。

## 1. 缩进

- 使用 **2 个空格** 缩进，不使用 Tab。

## 2. 分号

- 每条语句末尾以分号 `;` 结束，不使用 ASI 自动分号插入。

## 3. 引号

- 字符串优先使用**单引号** `'...'`，避免不必要的转义。

## 4. 命名规范

| 对象     | 命名风格       | 示例                 |
| -------- | -------------- | -------------------- |
| 变量     | 小驼峰         | `currentExpression`  |
| 函数     | 小驼峰         | `loadHistory()`      |
| 常量     | 全大写+下划线  | `API_BASE`           |
| DOM 变量 | 小驼峰 + El 后缀 | `historyListEl`    |

## 5. 空白

- 运算符两侧各留一个空格：`a + b`
- 逗号后跟一个空格：`func(a, b)`
- 控制语句关键字后留一个空格：`if (cond)`、`for (...)`

## 6. 函数

- 优先使用函数声明，明确函数用途。
- 每个函数在定义前用注释说明其职责。
- 避免函数过长，单一职责。

## 7. 字符串拼接

- 优先使用模板字符串（反引号）：`` `已删除记录 #${id}` ``

## 8. 异步处理

- 使用 `async/await` 处理网络请求，配合 `try/catch` 捕获错误。
- 网络请求失败时必须在界面上给出用户可见的错误提示。

## 9. 注释

- 使用中文注释说明代码逻辑，关键函数必须有注释。

## 10. 浏览器兼容

- 使用标准化的原生 API（`fetch`、`addEventListener` 等），
  不依赖特定框架或构建工具。
