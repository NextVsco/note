/**
 * 深度遍历对象
 * 待完善，配置遍历层级，次数等
 */

function ObjParse(obj, option, list = [], weight = 0, waitPool = []) {
  option = option || {}
  let level = option.level = option.level || 2
  let optNum = option.optNum = option.optNum || 100

  for (var i in obj) {
    let index = list.length
    list.push(new Array(2 * weight + 1).join("&nbsp;") + i + "-" + (typeof obj[i]))
    if (
      typeof obj[i] == "string" ||
      typeof obj[i] == "boolean" ||
      typeof obj[i] == "undefined" ||
      typeof obj[i] == "number"
    ) {
      list[index] += (`|<span style="color:#00bd0b;">"${obj[i]}"</span>`)
    } else if (typeof obj[i] == "object") {
      waitPool.push({ obj: obj[i], list: list, weight: weight + 1 })
    } else if (typeof obj[i] == "function") { }
  }
  // 解析下一层级Obj
  if (waitPool.length > 0 && waitPool[0].weight - 1 == weight && weight < (level - 1)) {
    var len = waitPool.length
    for (var i = 0; i < len; i++) {
      optNum--
      var data = waitPool.splice(0, 1)[0]
      ObjParse(data.obj, option, data.list, data.weight, waitPool)
      if (optNum <= 0) { break }
    }
  }
  return list
}

module.exports = ObjParse