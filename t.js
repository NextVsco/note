var list = []

var data = [
  {name:1},
  {name:2},
  {name:3},
  {name:2}
]

function vote(item,item2){
  return item.name == item2.name
}
for(var i=0;i<data.length;i++){
  let pass = true
  for(var j=0;j<list.length;j++){
    if (vote(data[i], list[j])){
      pass = false
      break;
    }
  }
  pass && list.push(data[i])
}
console.log(list)