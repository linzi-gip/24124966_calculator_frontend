# 24124966_calculator_frontend

前后端分离计算器系统 —— **前端项目**

## 项目介绍

本项目是《软件工程》第一次作业"前后端分离计算器系统"的前端部分。

前端负责：
- 计算器界面展示
- 按钮交互与表达式输入
- 将表达式通过 HTTP API 发送给后端
- 展示后端返回的计算结果
- 展示计算历史、发送历史删除请求

**前端不参与任何计算**：所有计算均由后端完成，前端仅负责
收集用户输入、发送请求、展示结果，符合"前后端分离"的作业要求。

## 技术栈

- HTML5 + CSS3 + JavaScript（原生，无任何构建工具、无框架）
- 通过浏览器原生 `fetch` 与后端通信

## 运行环境

- 任意现代浏览器（Chrome / Edge / Firefox / Safari）
- 操作系统：Windows / macOS / Linux 均可
- 无需安装任何依赖

## 安装方法

本前端项目为纯静态页面，**无需安装**。将整个目录下载到本地即可。

## 启动方法

### 方式一：直接打开（最简单）

双击 `index.html`，浏览器会直接打开计算器页面。

### 方式二：本地静态服务器（可选）

```bash
# 在前端项目目录下执行（使用 Python 自带模块）
python -m http.server 8080
```

然后访问 `http://127.0.0.1:8080`。

> 无论哪种方式，都需要**先启动后端服务**才能完成计算。

## 配置说明

后端服务地址在 `calculator.js` 顶部配置：

```javascript
const API_BASE = "http://127.0.0.1:5000";
```

- 本地运行：保持默认即可
- 部署到公网后：改成公网后端地址，如 `https://xxx.xx/api` 对应的根地址

## 前后端连接方法

前端通过 HTTP 请求调用后端接口：

| 功能       | 请求                     |
| ---------- | ------------------------ |
| 计算       | `POST /api/calculate`    |
| 获取历史   | `GET /api/history`       |
| 删除单条   | `DELETE /api/history/{id}` |
| 清空历史   | `DELETE /api/history`    |

后端项目见 `24124966_calculator_backend` 仓库，API 详细文档见后端 README.md。

## 功能说明

- 基础四则运算：加（+）、减（-）、乘（×）、除（÷）
- 复合表达式：支持运算符优先级、括号、一元正负号（如 -5、3*-2）、小数
- 计算历史：成功后自动保存到后端数据库，刷新页面不丢失
- 删除历史：可删除单条记录，也可一键清空
- 键盘输入：支持数字键、运算符、Enter 计算、Backspace 退格、Esc 清空
- 错误提示：非法表达式、除零、后端不可用等均有明确提示

## 目录结构

```
24124966_calculator_frontend/
├── index.html       # 计算器页面
├── style.css        # 页面样式
├── calculator.js    # 交互逻辑与后端通信
├── README.md        # 项目说明
└── codestyle.md     # 代码规范
```

## 代码规范

代码遵循 [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)，
详见 [codestyle.md](codestyle.md)。
