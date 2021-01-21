var { codeType, selectObj } = require("./enCodeUnit");

/* run */
var text = `app.toPage({url:app.globalData.HOME,mold:console.log("hahaha")});console.log("aaaa")`
text = `app[0]["name"].toPage({url:wx.once(),mold:wx.two(wx.moldType(wx.three())),success:wx.back})`
text = `app.system.getPayNum(math.random())`
text = `("app.id")`
// text = `app.getObj({id:app.id,v:app.v})`

console.log(
  eatCodeString(text).value
)

/* 不支持换行和空格（字符串内除外），支持已定义对象内变量、函数的调用，JSON */
function eatCodeString(text) {
  var str = ""
  var obj = {}
  var index = 0
  var point = null
  var value = null
  while (text.length > 0) {
    index++
    var char = text.substring(0, 1); text = text.substring(1)
    var charType = codeType(char)
    if (
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
          point = selectObj(str)
          /* recursion */
          var recursion = eatCodeString(text)
          index += recursion.index
          text = text.substring(recursion.index)
          value = recursion.value
          console.log("recursion", recursion, value)
          return {
            index,
            value: selectObj(str)(value)
          }
        } else if (char == ")") {
          return {
            index,
            value: selectObj(str)
          }
        }
      } else if (charType == "lbracket") {
        if (char == "{") {
          /* recursion */
          var recursion = eatCodeString(text)
          index += recursion.index
          text = text.substring(recursion.index)
          value = recursion.value
          return {
            index,
            value: value
          }
        } else if (char == "}") {
          return {
            index,
            value: selectObj(str)
          }
        }
      } else if (charType == "dquote") {
        if (value == null) { value = "" }
        else {
          return {
            index, value: str
          }
        }
      } else if (char == ":") {
        var recursion = eatCodeString(text)
        index += recursion.index
        text = text.substring(recursion.index)
        obj[str] = recursion.value
      } else if (char == ",") {
        return {
          index,
          value: selectObj(str)
        }
      } else if (char == ";") {
        return {
          index,
          value: point(value)
        }
      } else {
        break
      }
      str = ""
    }
  }
  return {
    index,
    value: selectObj(str)
  }
}
