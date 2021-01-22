var { codeType, selectObj } = require("./enCodeUnit");

/**
 * 待修复 fun().fun()
 */
/* run */
var text = `app.toPage({url:app.globalData.HOME,mold:console.log("hahaha")});console.log("aaaa")`
text = `app[0]["name"].toPage({url:wx.once(),mold:wx.two(wx.moldType(wx.three())),success:wx.back})`
text = `app.system.getPayNum(math.random())`
text = `{url:"pagesindexindex"}`
// text = `app.getObj({id:app.id,v:app.v})`

console.log(
  eatCodeString(),
)

/* 不支持换行和空格（字符串内除外），支持已定义对象内变量、函数的调用，JSON */
var index = 0
var dquote = false 
var nullObj = {}  // 执行空函数
function eatCodeString() {
  var str = ""
  var obj = {}
  while (text.length > 0) {
    index++
    var char = text.substring(0, 1); text = text.substring(1);
    var charType = codeType(char)
    if (
      dquote && (
        charType == "char" ||
        charType == "number" ||
        charType == "squote" || 
        charType == "sbracket" || 
        charType == "comma" || 
        charType == "spot" || 
        charType == "colon" || 
        charType == "semicolon" || 
        charType == "mbracket" || 
        charType == "qmark" || 
        charType == "andmask" || 
        charType == "slash" || 
        charType == "underline" || 
        charType == "space"
      )
    ) {
      str += char
    } else if (
      charType == "char" ||
      charType == "number" ||
      charType == "spot" || 
      charType == "mbracket" || 
      charType == "space" 
    ) {
      str += char
    } else {
      if (charType == "sbracket") {
        if (char == "(") {
          var result = eatCodeString()
          return result == nullObj ? selectObj(str)() : selectObj(str)(result)
        } else if (char == ")") {
          return str ? selectObj(str) : nullObj
        }
      } else if (charType == "dquote") {
        if (!dquote) {
          dquote = true;
          return eatCodeString()
        } else {
          return str
        }
      } else if (charType == "lbracket") {
        if (char == "{") {
          /* recursion */
          return eatCodeString()
        } else if (char == "}") {
          // 兼容末尾的不带 , 的JSON
          if (str) { text += "}"; return selectObj(str) }
          return obj
        }
      } else if (char == ":") {
        obj[str] = eatCodeString()
      } else if (char == ",") {
        return selectObj(str)
      } else if (char == ";") {
        return selectObj(str)
      } else {
        break
      }
      str = ""
    }
  }
  return selectObj(str)
}
