var datam = {
  1:"first",
  2:"last",
  "f":function(){
    return 1
  }
}
var data = {
  b:null,
  a:1,
  c:undefined,
  d:"name",
  f:datam
}

var copyData = JSON.parse(JSON.stringify(data))

console.log(JSON.stringify(datam))
console.log(copyData)