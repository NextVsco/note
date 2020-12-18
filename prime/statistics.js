const { list } = require("./resource");

let maxLen = 19
var data = {}
i = 0
while (list[i].length <= maxLen) {
  let len = list[i].length
  if (!data[len]) { data[len] = 0 + ( !1 && data[len-1] || 0 ) }
  data[len]++
  i++
}

console.log(
  data
)

for(var j in list) {
  let index = parseInt(list[j], 2)
  if (index > maxLen) { break }
  console.log(
    index,
    data[index],
    data[index].toString(2)
  )
}