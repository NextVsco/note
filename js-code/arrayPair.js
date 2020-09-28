/**
 * 二位数组的搭配，用于规格
 */
function openList(list) {
  var templist = new Array(i)
  var temp2list = []
  for (var i in list) {
    for (var j in list[i]) {
      for (var l = 0; l < templist.length; l++) {
        let text = (templist[l] || "") + list[i][j]
        temp2list.push(text)
      }
    }
    templist = JSON.parse(JSON.stringify(temp2list))
    temp2list = []
  }
  return templist
}

function getIndex(list, targetList) {
  var index = 0
  var len = 1
  for (var i in targetList) {
    index += list[i] * len
    len = targetList[i].length * len
  }
  return index
}

function getlistLoc(list, targetList) {
  var value = ""
  for (var i in list) {
    value += targetList[i][list[i]]
  }
  return value
}

/* demo */
var list = [
  ["a", "b", "c", "d", "e"],
  [1, 2],
  ["x", "y", "z"]
]
var selIndex = [2, 1, 1]
// console.log(openList(list))
console.log(getIndex(selIndex, list))
console.log(getlistLoc(selIndex, list))
console.log(openList(list)[getIndex(selIndex, list)])