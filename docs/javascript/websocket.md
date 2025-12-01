# WebSocket 详解

WebSocket 是一种网络传输协议，可在单个 TCP 连接上进行全双工通信。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。

## 1. 基础概念

### 什么是 WebSocket？

WebSocket 协议在 2011 年由 IETF 标准化为 RFC 6455，后由 RFC 7936 补充规范。API 也被 W3C 定为标准。

在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

### WebSocket vs HTTP

虽然 WebSocket 握手阶段采用 HTTP 协议，但它们有本质区别：

| 特性         | HTTP                                                           | WebSocket                            |
| :----------- | :------------------------------------------------------------- | :----------------------------------- |
| **通信方式** | 单向（客户端请求 -> 服务端响应）                               | 双向（全双工）                       |
| **连接性质** | 短连接（HTTP 1.0/1.1），虽然有 Keep-Alive 但本质是请求响应模型 | 长连接（持久连接）                   |
| **开销**     | 每次请求包含较长的 Header                                      | 握手后数据帧头部很小（2-14 字节）    |
| **实时性**   | 轮询或长轮询，有延迟                                           | 实时推送，延迟极低                   |
| **使用场景** | 获取资源、API 调用                                             | 聊天室、即时通讯、股票行情、协同编辑 |

## 2. API 使用

### 创建连接

```javascript
// 创建 WebSocket 对象
// 参数1: url (ws:// 或 wss://)
// 参数2: protocol (可选，子协议)
const ws = new WebSocket("wss://example.com/socket");
```

### 监听事件

```javascript
// 1. 连接建立时触发
ws.onopen = function (event) {
  console.log("WebSocket 连接已建立");
  // 连接成功后发送第一条消息
  ws.send("Hello Server!");
};

// 2. 接收到消息时触发
ws.onmessage = function (event) {
  console.log("收到消息:", event.data);
  // 处理接收到的数据
};

// 3. 连接关闭时触发
ws.onclose = function (event) {
  console.log("连接已关闭");
  console.log("Code:", event.code); // 关闭代码，如 1000 正常关闭
  console.log("Reason:", event.reason);
};

// 4. 发生错误时触发
ws.onerror = function (error) {
  console.error("WebSocket 错误:", error);
};
```

### 发送数据

数据可以是字符串、Blob 或 ArrayBuffer。

```javascript
// 发送字符串
ws.send("Hello");

// 发送 JSON
ws.send(JSON.stringify({ type: "message", content: "Hello" }));

// 发送二进制数据
const buffer = new ArrayBuffer(16);
ws.send(buffer);
```

## 3. 核心机制

### 3.1 握手过程 (Handshake)

1.  **客户端发送请求**：
    - 使用 HTTP GET 请求。
    - Header 包含 `Upgrade: websocket` 和 `Connection: Upgrade`。
    - `Sec-WebSocket-Key`: 随机 Base64 字符串。
2.  **服务端响应**：
    - 状态码 `101 Switching Protocols`。
    - `Sec-WebSocket-Accept`: 经过计算后的 Key。

### 3.2 心跳机制 (Heartbeat)

为了防止连接因网络波动或长时间无数据传输而被防火墙/路由切断，需要定时发送心跳包。

```javascript
// 简单的心跳实现
let heartbeatTimer = null;

function startHeartbeat() {
  heartbeatTimer = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "ping" }));
    }
  }, 30000); // 每30秒发送一次
}

ws.onopen = () => {
  startHeartbeat();
};

ws.onclose = () => {
  clearInterval(heartbeatTimer);
};
```

### 3.3 断线重连 (Reconnection)

网络不稳定时需要自动重连。通常采用指数退避算法（Exponential Backoff）来避免频繁重连冲击服务器。

```javascript
let reconnectAttempts = 0;

function connect() {
  const ws = new WebSocket("wss://example.com");

  ws.onclose = () => {
    const timeout = Math.min(1000 * 2 ** reconnectAttempts, 30000); // 最多等待30秒
    setTimeout(() => {
      reconnectAttempts++;
      connect();
    }, timeout);
  };

  ws.onopen = () => {
    reconnectAttempts = 0; // 重置重试次数
  };
}
```

## 4. 常见面试题

### Q1: WebSocket 和 Socket.io 有什么区别？

- **WebSocket**: 浏览器原生 API，HTML5 标准。
- **Socket.io**: 一个封装库。它在 WebSocket 不可用时会自动降级到长轮询（Long Polling），并提供了更多功能如断线重连、广播、房间概念等。
- **选型**: 如果只支持现代浏览器且只需简单推送，原生 WebSocket 足够；如果需要兼容旧浏览器或需要复杂的房间/广播逻辑，Socket.io 更方便。

### Q2: 能够自定义 WebSocket 的 HTTP Header 吗？

- 标准 `WebSocket` API **不支持**自定义 Header（如 `Authorization`）。
- **解决方案**:
  1.  将 Token 放在 URL 参数中: `wss://example.com?token=xyz`。
  2.  在连接建立后的第一条消息中发送认证信息。
  3.  利用 Cookie（浏览器会自动携带同域 Cookie）。

### Q3: WebSocket 的状态码有哪些？

- `0` (CONNECTING): 正在连接。
- `1` (OPEN): 连接已建立，可以通信。
- `2` (CLOSING): 正在关闭。
- `3` (CLOSED): 连接已关闭或无法建立。

### Q4: 如何处理粘包/拆包问题？

WebSocket 协议本身是**基于帧（Frame）**的，它已经处理了消息边界问题。与 TCP 不同，`ws.onmessage` 收到的总是一个完整的消息，**不需要**像在 TCP Socket 编程中那样自己处理粘包。
