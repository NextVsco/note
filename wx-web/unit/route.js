import Filter from "./filter-route";
const point = wx;
const keys = ["url", "appid", "mold", "success", "fail", "complete"]
const modeType = {
  to: { keys, necessity: "url", carry: function (param) { wx.navigateTo(param); } },
  back: { keys, carry: function (param) { wx.navigateBack(param); } },
  redirect: { keys, necessity: "url", carry: function (param) { wx.redirectTo(param); } },
  reLaunch: { keys, carry: function (param) { wx.reLaunch(param); } },
  toTabbar: { keys, necessity: "url", carry: function (param) { wx.switchTab(param); } }
}
/**
 * Route 小程序路由 注册router
 */
class Route extends Filter {
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


  }
}

/**
 * 对多样的数据进行统一处理
 * @param {*} param
 */
function getData(param) {
  return param
}

function urlParse(param) {

}

function urlMerge(param) {

}