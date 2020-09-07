# Web Worker
JavaScript 语言采用的是单线程模型。
## 作用
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。
## 目的
这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
## 限制
- 同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

- DOM 限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

- 通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

- 脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

- 文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

## 基本用法
### 主线程

```javascript
var worker = new Worker('work.js');
```
Worker()构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。

由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。
```javascript
// 发送
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
// 接收
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
}
```
### Worker 线程
```javascript
this.addEventListener('message', function (e) {
  // 返回结果
  this.postMessage('You said: ' + e.data);
}, false);
```
Worker 线程内部需要有一个监听函数，监听message事件。this|self 代表子线程自身，即子线程的全局对象。
### Worker 线程加载脚本
```javascript
importScripts('script1.js','script2.js');
```
### 错误处理
主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
```javascript
// 主线程监听错误
worker.addEventListener('error', function (event) {
  // ...
});
```
### 关闭 Worker
```javascript
// 主线程
worker.terminate();
// Worker 线程
self.close();
```