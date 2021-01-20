/* 查找obj对象 */
function selectObject(obj, keyArray) {
  function jsonStringKey(key) {
    let stop = false
    do {
      let value = key.match(/\[[\d]+\]/)
      if (value) {
        key = key.substring(0, value.index) + "." + value[0].substring(1, value[0].length - 1) + key.substring(value.index + value[0].length)
      } else {
        stop = true
      }
    } while (!stop);
    return key.split(".")
  }
  if(typeof keyArray == "string") { keyArray = jsonStringKey(keyArray) }
  for (var i = 0; i < keyArray.length; i++) {
    obj = obj[keyArray[i]]
  }
  return obj
}

/* 字符串char类型 */
function codeType(char) {
  if (typeof char == "string") { char = char.charCodeAt() }
  if (char == 32) {
    return "space" // 空格
  } else if (char == 34) {
    return "dquote" // 双引号
  } else if (char == 39) {
    return "squote" // 单引号
  } else if (char == 40 || char == 41) {
    return "sbracket" // 小括号
  } else if (char == 44) {
    return "comma" // 逗号
  } else if (char == 46) {
    return "spot" // 点
  } else if (char >= 48 && char <= 57) {
    return "number" // 数字
  } else if (char == 58) {
    return "colon" // 冒号
  } else if (char == 59) {
    return "semicolon" // 分号
  } else if (char >= 65 && char <= 122) {
    return "char" // 字符
  } else if (char == 91 || char == 93) {
    return "mbracket" // 中括号
  } else if (char == 96) {
    return "rquote" // 反引号
  } else if (char == 123 || char == 125) {
    return "lbracket" // 大括号
  }
}

/**
 * {name:"a",sex:1}
 * app.toPage(wx.getHomeToPage())
 * app.toPage({url:wx.once(),mold:wx.two(wx.moldType(wx.three())),success:wx.back})
 */
/* run */
var text = `app.toPage({url:app.globalData.HOME,mold:console.log("hahaha")});console.log("aaaa")`
text = `app[0]["name"].toPage({url:wx.once(),mold:wx.two(wx.moldType(wx.three())),success:wx.back})`
text = `app.system.getPayNum(math.random())`
text = `math.random()`

function builtObj(str) {
  switch (str) {
    case "app":
      return {
        id: "452sas4d2",
        v: "1.0.0",
        system: {
          language: "zh_CN",
          model: "iPhone 6/7/8 Plus",
          pixelRatio: 3,
          platform: "devtools",
          getPayNum: function (num="335") {
            return parseInt(num.toString().substring(2,7)).toString(2)
          }
        }
      }
    case "math":
      return Math;
    default:
      break;
  }
}

function selectObj(strs) {
  console.log(strs)
  var m = strs.match(/[\w]+[.|[]/)
  if (m) {
    var name = m[0].substring(0, m[0].length - 1)
    console.log("m=>",name,strs)
    return selectObject({ [name]: builtObj(name) },strs)
  }
  return builtObj(strs)
}


/* 不支持换行和空格（字符串内除外），支持已定义对象内变量、函数的调用，JSON */
function eatCodeString(text) {
  var str = ""
  var wait = ""
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
      // 特殊符
      charType == "spot" ||
      charType == "mbracket" ||
      charType == "space"
    ) {
      str += char
    } else {
      if (charType == "lbracket") {
        if (char == "{") {
          /* recursion */
          var recursion = eatCodeString(text)
          index += recursion.index
          text = text.substring(recursion.index)
          value = recursion.value
        } else if (char == "}") {
          return {
            index,
            value: obj
          }
        }
      } else if (charType == "sbracket") {
        if(char == "(") {
          point = selectObj(str)
          /* recursion */
          var recursion = eatCodeString(text)
          index += recursion.index
          text = text.substring(recursion.index)
          value = recursion.value
          return {
            index,
            value: value
          }
        } else if (char == ")") {
          console.log(index,value,str)
          return {
            index,
            value: selectObj(str)
          }
        }
      } else if (charType == "dquote") {
        console.log("wait plan")
        if (value == null) { value = "" }
        else { value = str }
      } else if (char == ":") {
        obj[str] = ""
        wait = str
      } else if (char == ",") {
        obj[wait] = ""
      } else if (char == ";") {
        return {
          index,
          value: point(value)
        }
      } else {
        console.log("undefined plan", char)
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


console.log(
  eatCodeString(text)
  // builtObj("math")

)
