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
  if (typeof keyArray == "string") { keyArray = jsonStringKey(keyArray) }
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
  } else if (char == 38) {
    return "andmask" // &
  } else if (char == 39) {
    return "squote" // 单引号
  } else if (char == 40 || char == 41) {
    return "sbracket" // 小括号
  } else if (char == 44) {
    return "comma" // 逗号
  } else if (char == 46) {
    return "spot" // 点
  } else if (char == 47) {
    return "slash" // /
  } else if (char >= 48 && char <= 57) {
    return "number" // 数字
  } else if (char == 58) {
    return "colon" // 冒号
  } else if (char == 59) {
    return "semicolon" // 分号
  } else if (char == 63) {
    return "qmark" // 问号
  } else if (char >= 65 && char <= 122) {
    return "char" // 字符
  } else if (char == 91 || char == 93) {
    return "mbracket" // 中括号
  } else if (char == 95) {
    return "underline" // _
  } else if (char == 96) {
    return "rquote" // 反引号
  } else if (char == 123 || char == 125) {
    return "lbracket" // 大括号
  }
}

function builtObj(str) {
  switch (str) {
    case "app":
      return {
        id: "ID452sas4d2",
        v: "1.0.0",
        get: function (t = "nullt") { return t },
        getObj: function (t) { return "_" + JSON.stringify(t) },
        system: {
          language: "zh_CN",
          model: "iPhone 6/7/8 Plus",
          pixelRatio: 3,
          platform: "devtools",
          getPayNum: function (num = "335") {
            return parseInt(num.toString().substring(2, 7)).toString(2)
          }
        }
      }
    case "math":
      return Math;
    default:
      break;
  }
}

/**
 * 为空下返回空，
 * 纯数字下返回数字
 */
function selectObj(strs) {
  if (!strs) { return (function(e){ return e }) }
  strs = strs.toString()
  // 匹配数字
  if (strs.replace(".","").match(/\D/) == null) { return strs }
  var m = strs.match(/[\w]+[.|[]/)
  if (m) {
    var name = m[0].substring(0, m[0].length - 1)
    var value = selectObject({ [name]: builtObj(name) }, strs)
    return value
  }
  return builtObj(strs)
}

module.exports = { selectObject, codeType, builtObj, selectObj }