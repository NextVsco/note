# Component
## [options](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)
  - multipleSlots {Boolen} 在组件定义时的选项中启用多slot支持
  - styleIsolation 组件样式隔离
    - isolated
    - apply-shared
    - shared
    - ...
  - addGlobalClass
  - virtualHost

# 项目问题
## 场景一
部分功能需要全局控制，在保证不跳转新页面的情况下，做出弹出式窗口

应用：授权登录、状态窗口、消息窗口...

解决方案：为每个页面添加组件

缺点：部分不需要的功能将被注入

### 场景二
视图数据操作时，存在