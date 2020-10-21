# [JS API](https://developer.mozilla.org/zh-CN/docs/Web/API)
看一遍所有的api，笔记笔记（只记录蓝色）

## Background Tasks
?
## Battery API
提供了有关系统充电级别的信息并提供了通过电池等级或者充电状态的改变提醒用户的事件。
## Beacon
`实验中`
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
### Gamepad API
`实验中`，识别并响应游戏控制器（手柄）