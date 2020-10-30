# [WEB API](https://developer.mozilla.org/zh-CN/docs/Web/API)
看一遍所有的api，笔记笔记（只记录蓝色）

## Ambient Light Events
`实验中`，环境`光线`事件
## Background Tasks
?
## Battery API
提供了有关系统充电级别的信息并提供了通过电池等级或者充电状态的改变提醒用户的事件。
## Beacon
`实验中`，接口用于将异步和非阻塞请求发送到服务器。`信标`请求使用HTTP协议中的POST方法。
## Bluetooth API
`实验中`，Web`蓝牙`API提供了连接低功耗蓝牙外围设备并与之交互的功能。
## Broadcast Channel API
可以实现同源下浏览器不同窗口，Tab页，frame或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单`通讯`
## CSS Font Loading API
`实验中`
## CSS Object Model
  - AnimationEvent
  `实验中`
  - [CSS](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS)
  是一个工具接口，无法创建该类型的对象：其内部只定义了静态属性
    - supports 
    用来校验浏览器是否支持一个给定的CSS特性
  - CSSConditionRule ?
  - CSSGroupingRule ?
  - CSSMediaRule ?
  ...
## [*Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
画布，它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面
  - ...

## *Channel Messaging API
允许两个不同的脚本运行在同一个文档的不同浏览器上下文直接通讯，在每端使用一个端口（port）通过双向频道（channel）向彼此传递消息
  - MessageChannel
  接口允许我们创建一个新的消息通道，并通过它的两个MessagePort属性发送数据（web Worker, iframe 间的`通信`，数据的`深拷贝`）。

## [*Console API](https://developer.mozilla.org/zh-CN/docs/Web/API/Console_API)
提供了允许开发人员执行`调试`任务的功能
  - ...

## Credential Management API
`实验中`

## [*DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
文档对象模型

## Encoding API
`实验中`，提供了在各种处理文本的机构的`字符编码`

## Encrypted Media Extensions API
`实验中`，用于控制受数字限制管理方案约束的内容的回放的接口。

## Fetch API
提供了一个获取资源的接口（包括跨域请求）
  - fetch
  发起获取资源的请求
  ```javaScript
  var myImage = document.querySelector('img');

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'image/jpeg');

  var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

  var myRequest = new Request('flowers.jpg');

  fetch(myRequest,myInit).then(function(response) {
    return response.blob();
  }).then(function(response) {
    var objectURL = URL.createObjectURL(response);
    myImage.src = objectURL;
  });
  ```
  - Headers 
  接口允许您对HTTP请求和响应头执行各种操作
  - Request
  - Response

## File System API
非标准
## Frame Timing API
`实验中`
## Fullscreen API
使得一个元素与其子元素`全屏`
```javaScript
var el = document.documentElement
el.requestFullscreen();  // 全屏
document.exitFullscreen(); // 退出全屏
```
通过 document.fullscreenElement 为null判断
是否为全屏
## Gamepad API
`实验中`，识别并响应游戏控制器（手柄）
## Geolocation API
允许用户向 Web 应用程序提供他们的位置

## [HTML Drag and Drop API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)
应用程序能够在浏览器中使用`拖放`功能
当从操作系统向浏览器中拖拽文件时，不会触发 dragstart 和dragend 事件。
浏览器的默认行为：能拖动文本选择，图像和链接。（属性：draggable）

## High Resolution Time
? 指向了 Performance API

## [*History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
对浏览器的会话历史的访问
  - back() 后退
  - forward() 前进
  - go() 传入1, -1前进后退层级
  - length 历史堆栈中页面的数量
  - pushState() 新建了当前的历史记录项
  - replaceState() 修改了当前的历史记录项
  - state 上述两种方法修改网页后，会获取到值
```javaScript
let stateObj = {
    foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");
```

## Image Capture API
实验中，用于从照相设备捕捉图像或视频的API

## IndexedDB
在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））
官方建议使用三方类库
```javaScript
var db;
function openDB() {
 var DBOpenRequest = window.indexedDB.open("toDoList");
//  deleteDatabase 删除数据库
 DBOpenRequest.onsuccess = function(e) {
   db = DBOpenRequest.result;
 };
}
```
更多查看IndexedDB的案例

## *Intersection Observer API
一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。
[某个元素是否进入了"视口"，即用户是否能看到它](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)，由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做`交叉观察器`。

为了解决相关产生的性能问题：
  - 图片懒加载——当图片滚动到可见时才进行加载
  - 内容无限滚动——也就是用户滚动到接近内容底部时直接加载更多，而无需用户操作翻页，给用户一种网页可以无限滚动的错觉
  - 检测广告的曝光情况——为了计算广告收益，需要知道广告元素的曝光情况
  - 在用户看见某个区域时执行任务或播放动画
```javaScript
/**
 *  @parame {function} callback 观察器的回调函数
 *  @parame {function} option 配置对象
 */
var io = new IntersectionObserver(callback, option);
var dom;   // 需要监听的dom对象
io.observe(dom)
```

## Long Tasks API
`实验中`，它可以直观地告诉我们哪些任务执行耗费了50毫秒或更多时间。

## Media Capture and Streams
`实验中`，媒体流处理API

## Media Session API
? 提供了一种自定义媒体通知的方法

## Media Source Extensions API
实验中

## MediaStream Recording API
? 录音

## Navigation Timing API
? 提供了可用于衡量一个网站性能的数据
```javaScript
// 计算页面加载所需的总时长：
var perfData = window.performance.timing; 
var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
// 计算请求返回时长：
var connectTime = perfData.responseEnd - perfData.requestStart;
```

## Network Information API
`实验中`，`网络状态`API可以获取到系统的网络连接信息，比如说连接方式是 WiFi 还是蜂窝。应用程序可以根据此信息为用户展现不同清晰度的内容。

## Page Visibility API
使用选项卡式浏览，任何给定网页都有可能在后台，因此对用户不可见。页面可见性 API提供了您可以观察的事件，以便了解文档何时可见或隐藏，以及查看页面当前`可见性`状态的功能。

页面可见性 API对于节省资源和提高性能特别有用，它使页面在文档不可见时避免执行不必要的任务。

使用场景：
  - 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片。
  - 显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。
  - 页面想要检测是否正在渲染，以便可以准确的计算网页浏览量
  - 当设备进入待机模式时，网站想要关闭设备声音（用户按下电源键关闭屏幕）

## Payment Request API
`支付`请求API为商家和支付者提供了统一的用户体验。
改善表单支付带来的重复操作。

## Performance API
? `性能`相关，页面内渲染时间等信息。该接口支持应用程序中客户端的延时测量。
https://w3c.github.io/perf-timing-primer/

## Performance Timeline
和上述 Performance API 近似。

## Permissions API
`权限`API可用于确定是否已授予或拒绝访问特定API的权限。

## Pointer events
`指针`是指一个可以明确指向屏幕上某一组坐标的硬件设备。

## Pointer Lock API
`实验中`，把鼠标事件的目标锁定到一个单独的元素，这就消除了鼠标在一个单独的方向上到底可以移动多远这方面的限制，并从视图中删去光标（第一人称视角?）。

## Proximity Events
`实验中`，API要求设备具有`接近传感器`，而该传感器仅在移动设备上才可用。
例如，当用户在手机靠近耳朵的状态下拨打电话时，可以通过关闭智能手机的屏幕来应对。

## Push API
? `实验中`，Web应用程序接收从服务器发出的`推送消息`的能力，无论Web应用程序是否在用户设备前台，甚至刚加载完成。这样，开发人员就可以向用户投放异步通知和更新，从而让用户能更及时地获取新内容。

## Resize Observer API
通过该机制，代码可以`监视元素的大小`更改，并且每次大小更改时都会向观察者传递通知。

## Resource Timing API
获取和分析应用资源加载的详细网络计时数据

## [*Server Sent Events](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。这些被推送进来的信息可以在这个页面上作为 Events + data 的形式来处理。
服务器向浏览器推送信息，除了 WebSocket，还有一种方法：Server-Sent Events（以下简称 SSE）。本文介绍它的用法。
HTTP 协议无法做到服务器主动推送信息。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息（streaming）。
总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为流信息本质上就是下载。
- SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。
```javaScript
var source = new EventSource(url);
// withCredentials 表示是否一起发送 Cookie
var source = new EventSource(url, { withCredentials: true });

// 建立连接
source.onopen = function (event) {

};
// or
source.addEventListener('open', function (event) {

}, false);

// 接收数据
source.onmessage = function (event) {
  var data = event.data;
  // handle message
};
// or
source.addEventListener('message', function (event) {
  var data = event.data;
  // handle message
}, false);

// 关闭连接
source.close();
```
- open 建立连接
- message 接收消息
- error 通信错误

## Service Worker API
充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器
...

## Storage API
? 定义了一个通用的、共享的存储系统，供所有 API 和技术使用，以存储各个网站的内容可访问数据。

## Storage Access API
?

## Streams API
文件流

## Touch_events
触摸事件接口

## URL_API
URL解析
```javaScript
let addr = new URL("https://mysite.com/login?user=someguy&page=news");
try {
  loginUser(addr.searchParams.get("user"));
  gotoPage(addr.searchParams.get("page"));
} catch(err) {
  showErrorMessage(err);
}
// 参数排序
addr.searchParams.sort();
```

## Vibration_API
该`振动`硬件允许软件代码通过引起设备震动来向用户提供物理反馈
```javaScript
window.navigator.vibrate(200);
window.navigator.vibrate([200]);

// 使设备振动200毫秒，然后暂停100毫秒，然后再次使设备振动200毫秒
window.navigator.vibrate([200, 100, 200]);
```

## Visual Viewport (ReadableStream)
? 流API表示字节数据的可读流

## Web Animations API
网页动画API允许用于同步和定时更改网页的呈现，即DOM元素的动画

## Web_Audio_API
用于控制Web上的`音频`，为音频添加效果，创建音频可视化效果，应用空间效果（例如平移）等。

## Web_Authentication_API
web`身份验证`

## Web_Crypto_API
网络加密API是允许脚本中使用密码原语以使用密码的构建系统的接口。
```javaScript
window.crypto.getRandomValues(new Uint32Array(10))

// window.crypto.subtle.generateKey

```

## Notifications_API
`消息`通知，允许网页控制向最终用户显示系统通知。

## Web Storage API
在Web存储API提供了通过浏览器可以存储键/值对，以更直观的方式比使用机制

## Web Workers API
详见Worker

## WebGL
Web图形库，可在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件

## WebRTC
WebRTC（Web实时通信）是一项使Web应用程序和站点能够捕获和可选地传输音频和/或视频媒体，以及在不需要中介程序的情况下在浏览器之间交换任意数据的技术

## WebVR API
`不推荐`，WebVR提供了将虚拟现实设备（例如Oculus Rift或HTC Vive等头戴式显示器）暴露于Web应用程序的支持，从而使开发人员能够将显示器的位置和运动信息转换为围绕3D场景的运动。

## WebVTT_API
是一种用于使用`<track>`元素显示定时文本轨道（例如字幕或标题）的格式

## WebXR_Device_API
WebXR 是一组标准，这些标准一起用于支持将3D场景渲染到设计用于呈现虚拟世界（虚拟现实或 VR）或将图形图像添加到现实世界（增强现实或 AR）的硬件。 所述 WebXR设备API 实现WebXR功能集的核心，管理输出设备的选择，呈现3D场景到所选择的设备在适当的帧速率，和管理使用输入控制器创建运动矢量。