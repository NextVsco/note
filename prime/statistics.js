const { list } = require("./resource");

var num = 0;
var target = "11111111111111111111111111111111111111111"
// var target2 = "164511353"

function searchChildren(target){
  console.log("target =>",target, target.length)
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

if (!(typeof target == "undefined")) {
  searchChildren(target)
} else if (!(typeof target2 == "undefined")) {
  searchChildren(parseInt(target2).toString(2))
}