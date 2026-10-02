/* ============================================================
   前后端分离计算器 - 前端交互逻辑
   ============================================================
   职责：
   1. 接收用户输入，拼装表达式
   2. 把表达式发送给后端（POST /api/calculate）
   3. 展示后端返回的结果或错误信息
   4. 查询并展示计算历史（GET /api/history）
   5. 删除指定历史（DELETE /api/history/{id}）
   6. 清空全部历史（DELETE /api/history）
   7. 支持键盘输入（附加功能）

   注意：前端只负责发送表达式和展示结果，
        计算完全由后端完成，前端不做任何计算。
   ============================================================ */

// 后端服务地址（部署到公网后改成对应地址即可）
// 本地开发可用 http://127.0.0.1:5000；当前已部署到 PythonAnywhere：
const API_BASE = "https://zlin05.pythonanywhere.com";

// 页面元素
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const errorMsgEl = document.getElementById("errorMsg");
const historyListEl = document.getElementById("historyList");
const statusEl = document.getElementById("status");

// 当前表达式
let currentExpression = "";

/* ---------------- 工具函数 ---------------- */

/** 显示连接状态提示 */
function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "status" + (type ? " " + type : "");
}

/** 清空错误提示 */
function clearError() {
    errorMsgEl.textContent = "";
}

/** 刷新表达式与结果展示区 */
function renderDisplay() {
    expressionEl.innerHTML =
        currentExpression === ""
            ? "&nbsp;"
            : currentExpression.replace(/\*/g, "×").replace(/\//g, "÷");
    if (currentExpression === "") {
        resultEl.innerHTML = "&nbsp;";
    }
}

/* ---------------- 核心操作 ---------------- */

/** 向按钮区追加内容 */
function appendToExpression(value) {
    clearError();
    currentExpression += value;
    renderDisplay();
}

/** 退格：删除最后一个字符 */
function backspace() {
    clearError();
    currentExpression = currentExpression.slice(0, -1);
    renderDisplay();
}

/** 清空表达式 */
function clearExpression() {
    currentExpression = "";
    resultEl.innerHTML = "&nbsp;";
    clearError();
    renderDisplay();
}

/** 请求后端执行计算 */
async function calculate() {
    clearError();
    if (currentExpression.trim() === "") {
        return;
    }
    try {
        setStatus("正在请求后端计算…");
        const response = await fetch(API_BASE + "/api/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression: currentExpression }),
        });
        const data = await response.json();

        if (data.success) {
            // 展示后端返回的结果
            resultEl.textContent = "= " + data.result;
            setStatus("计算成功", "ok");
            // 计算成功后刷新历史列表
            loadHistory();
        } else {
            resultEl.innerHTML = "&nbsp;";
            errorMsgEl.textContent = "错误：" + (data.message || "计算失败");
            setStatus("计算失败", "error");
        }
    } catch (err) {
        resultEl.innerHTML = "&nbsp;";
        errorMsgEl.textContent = "无法连接后端服务，请确认后端已启动";
        setStatus("后端服务不可用", "error");
    }
}

/** 从后端加载全部计算历史 */
async function loadHistory() {
    try {
        const response = await fetch(API_BASE + "/api/history");
        const data = await response.json();
        if (data.success) {
            renderHistory(data.data);
        } else {
            setStatus("获取历史失败", "error");
        }
    } catch (err) {
        setStatus("无法连接后端服务", "error");
    }
}

/** 渲染历史列表 */
function renderHistory(records) {
    if (!records || records.length === 0) {
        historyListEl.innerHTML =
            '<li class="history-empty">暂无计算记录</li>';
        return;
    }
    historyListEl.innerHTML = "";
    records.forEach(function (record) {
        const li = document.createElement("li");
        li.className = "history-item";

        const info = document.createElement("div");
        info.className = "history-info";

        const expr = document.createElement("div");
        expr.className = "history-expr";
        expr.textContent = record.expression
            .replace(/\*/g, "×")
            .replace(/\//g, "÷") + " =";

        const resultText = document.createElement("div");
        resultText.className = "history-result";
        resultText.textContent = record.result;

        const time = document.createElement("div");
        time.className = "history-time";
        time.textContent = record.created_at;

        info.appendChild(expr);
        info.appendChild(resultText);
        info.appendChild(time);

        const delBtn = document.createElement("button");
        delBtn.className = "btn-delete";
        delBtn.title = "删除这条记录";
        delBtn.textContent = "🗑";
        delBtn.addEventListener("click", function () {
            deleteHistory(record.id);
        });

        li.appendChild(info);
        li.appendChild(delBtn);
        historyListEl.appendChild(li);
    });
}

/** 删除一条历史记录 */
async function deleteHistory(id) {
    try {
        const response = await fetch(API_BASE + "/api/history/" + id, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
            setStatus("已删除记录 #" + id, "ok");
            loadHistory(); // 删除后按后端最新状态重新查询
        } else {
            setStatus(data.message || "删除失败", "error");
        }
    } catch (err) {
        setStatus("无法连接后端服务", "error");
    }
}

/** 清空全部历史记录 */
async function clearAllHistory() {
    if (!confirm("确定要清空全部计算历史吗？")) {
        return;
    }
    try {
        const response = await fetch(API_BASE + "/api/history", {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
            setStatus("已清空全部历史", "ok");
            loadHistory();
        } else {
            setStatus(data.message || "清空失败", "error");
        }
    } catch (err) {
        setStatus("无法连接后端服务", "error");
    }
}

/* ---------------- 事件绑定 ---------------- */

// 按钮点击
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const value = btn.getAttribute("data-value");
        if (value === "C") {
            clearExpression();
        } else if (value === "backspace") {
            backspace();
        } else if (value === "=") {
            calculate();
        } else {
            appendToExpression(value);
        }
    });
});

// 清空历史按钮
document
    .getElementById("clearAllBtn")
    .addEventListener("click", clearAllHistory);

// 键盘输入支持（附加功能）
document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key >= "0" && key <= "9") {
        appendToExpression(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendToExpression(key);
    } else if (key === ".") {
        appendToExpression(".");
    } else if (key === "(" || key === ")") {
        appendToExpression(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        backspace();
    } else if (key === "Escape") {
        clearExpression();
    }
});

/* ---------------- 初始化 ---------------- */

// 页面加载时自动获取历史记录
loadHistory();
