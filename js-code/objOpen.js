var waitPool = []
function ObjParse(obj, list = [], weight = 0) {
  for (var i in obj) {
    list.push(new Array(2 * weight + 1).join("&nbsp;") + i + "-" + (typeof obj[i]))
    if (
      typeof obj[i] == "string" ||
      typeof obj[i] == "boolean" ||
      typeof obj[i] == "undefined" ||
      typeof obj[i] == "number"
    ) {
      list[i] += (`<span style="color:#00bd0b;">"${obj[i]}"</span>`)
    } else if (typeof obj[i] == "object") {
      waitPool.push({ obj: obj[i], list: list, weight: weight + 1 })
    } else if (typeof obj[i] == "function") { }
  }
  if (waitPool.length > 0 && waitPool[0].weight - 1 == weight) {
    var len = waitPool.length
    for (var i = 0; i < len; i++) {
      var data = waitPool.splice(0, 1)[0]
      ObjParse(data.obj, data.list, data.weight)
    }
  }
  return list
}
