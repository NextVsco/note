const fs = require("fs");
const { parse } = require("path");
console.putlog = function () {
  console.log("write")
  let value = ""
  for (var i = 0; i < arguments.length; i++) {
    value += ((i > 0 ? "\n" : "") + arguments[i])
  }
  fs.writeFileSync(__dirname + "\\text.json", `[\n${value}\n]`)
  console.log("write " + __dirname + "\\text.json")
}

var oldTime = null
var nowTime = new Date().valueOf()
function logTime() {
  return
  oldTime = nowTime
  nowTime = new Date().valueOf()
  console.log('node1',nowTime - oldTime)
}

/* main */

var list = []
/* max 10011 */
var maxLoop = Math.pow(2, parseInt(1101, 2))
console.log("loop", maxLoop)
for (var i = 2; i < maxLoop; i++) {
  let pass = true
  for (var j = 0; j < list.length; j++) {
    if (i % list[j] == 0) {
      if (i == parseInt(11111111111, 2)) { console.log("iden",list[j]) }
      pass = false
      break
    }
  }
  if (pass) list.push(i)
}
logTime()
console.putlog(list.map(item => `"${item.toString(2)}"`).join(",\n"))
logTime()
