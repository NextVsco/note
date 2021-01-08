/**
 * 细胞战争
 * 周围细胞过多，资源匮乏死亡 
 * 周围细胞过少，孤独死亡 
 * 设置适当的阈值（建议2、3）
 */

/**
 * 初始化
 * @param {*} size 地图大小
 * @param {*} weight 生物数量，值越大生物越少
 */
function Init(size = 10, weight = 2) {
  var map = new Array(size)
  for (var i = 0; i < size; i++) {
    map[i] = new Array(size)
    for (var j = 0; j < size; j++) {
      map[i][j] = (parseInt(Math.random() * 10) % weight == 0) ? 1 : 0
    }
  }
  return map
}

function canvas(map, x = " #", y = " .") {
  let value = ""
  for(var i in map){
    let t = ""
    for(var j in map[i]){
      t += map[i][j] ? x : y
    }
    value += t + "\n"
  }
  return value
}

function motion(map, alone = 2, life = 3) {
  let nmap = new Array(map.length)
  let lifeNum = 0;
  for (let i = 0; i < map.length; i++) {
    nmap[i] = new Array(map[i].length)
    for (let j = 0; j < map[i].length; j++) {
      let hapi = 0
      if (i > 0 && j > 0 && map[i - 1][j - 1]) { hapi++ }
      if (i > 0 && map[i - 1][j]) { hapi++ }
      if (i > 0 && j < map[i].length - 1 && map[i - 1][j + 1]) { hapi++ }
      if (j > 0 && map[i][j - 1]) { hapi++ }
      if (j < map[i].length - 1 && map[i][j + 1]) { hapi++ }
      if (i < map.length - 1 && j > 0 && map[i + 1][j - 1]) { hapi++ }
      if (i < map.length - 1 && map[i + 1][j]) { hapi++ }
      if (i < map.length - 1 && j < map[i].length - 1 && map[i + 1][j + 1]) { hapi++ }
      if (hapi == life) {
        lifeNum++
        nmap[i][j] = 1
      } else if (hapi < life && hapi >= alone) {
        let value = map[i][j]
        if (value) { lifeNum++ }
        nmap[i][j] = value
      } else {
        nmap[i][j] = 0
      }
    }
  }
  return lifeNum ? nmap : null
}

/* demo */
var map = Init(10)
console.log(
  canvas(map)
)
var timeid = setInterval(()=>{
  console.clear()
  map = motion(map, 1, 2)
  if(!map){ clearInterval(timeid) }
  console.log(
    canvas(map)
  )
},50)