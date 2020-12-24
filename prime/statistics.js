const { list } = require("./resource");

/* 计算二进制数的因数 */
function methodOne(target) {
  target = target || "100100101111000100010011100001"
  var num = 0;
  console.log(target, target.length)
  for (var i = target.length - 1; i >= 0; i--) {
    num += ((target[i] == "1") ? Math.pow(2, target.length - 1 - i) : 0)
  }
  console.log(num)
  
  for (var i in list) {
    let value = parseInt(list[i], 2)
    if (num % value == 0) {
      console.log('ero', value, num / value)
      break
    }
  }
}

/* 遍历一定范围内的最大因数 */
function methodTwo(max, min = 1) {
  var i = min
  do {
    i++
    console.log(i,i.toString(2))
  } while (i < max)

}

module.exports = { methodOne, methodTwo }
