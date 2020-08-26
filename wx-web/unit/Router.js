import Filter from "./Router-filter";

const point = wx;
const keys = ["url", "appid", "mold", "success", "fail", "complete"]
const modeType = {
  to: { keys, necessity: "url", carry: function (param) { wx.navigateTo(param); } },
  back: { keys, carry: function (param) { wx.navigateBack(param); } },
  redirect: { keys, necessity: "url", carry: function (param) { wx.redirectTo(param); } },
  reLaunch: { keys, carry: function (param) { wx.reLaunch(param); } },
  tabbar: { keys, necessity: "url", carry: function (param) { wx.switchTab(param); } },
  app: { keys, necessity: "appid", carry: function (param) { } },
  phone: { keys, necessity: "url", carry: function (param) { } },
  picture: { keys, necessity: "url", carry: function (param) { } },
  location: { keys, necessity: "url", carry: function (param) { } }
}
/**
 * Route 小程序路由 注册router
 * 基本介绍：
 * 防抖，防止短暂时间内弹出多个窗口
 * <getData> 过滤获取数据，小程序view返回到事件中的数据包含其他多余信息
 */
class Router extends Filter {
  constructor(e = {}) {
    point.router = this
  }
  /**
   * 主方法，跳转页面或其他功能
   * @param {String} e.url 跳转页面地址
   * @param {String} e.mold 模式 （to 跳转,back 返回,redirect 重定向,reLaunch 关闭所有后跳转）
   */
  toPage(e) {
    var data = getData(e)
    data = defaultFill(data)
    // 执行
  }
}
/**
 * defaultFill 数据类型完善
 * @param {*} data 
 */
function defaultFill(data){
  if(data.mold==undefined){

  }
}
/**
 * 对多样的数据进行统一处理
 * @param {*} param
 */
function getData(param) {
  return param.currentTarget ? param.currentTarget.dataset : param
}

// url地址string转json
function urlParse(param) {

}
// url地址json转string
function urlMerge(url,param) {

}