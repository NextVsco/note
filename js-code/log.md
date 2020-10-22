# [JS API](https://developer.mozilla.org/zh-CN/docs/Web/API)
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

## Encoding_API
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