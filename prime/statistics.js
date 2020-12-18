const { list } = require("./resource");

var num = 0;
var target = "11001100011110110000001"

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