function getPow(max = 32, max2 = 5) {
  for (var i = 2; i < max; i++) {
    for (var j = 0; j < max2; j++) {
      console.log(
        Math.pow(i, j + 1).toString(2),
        Math.pow(i, j + 1)
      )
    }
    console.log(
    )
  }
}

function getMul(num = 2, max = 32) {
  for (var i = 1; i < max; i++) {
    let value = i * num
    console.log(
      value.toString(2),
      `${value} = ${i} * ${num}`
    )
  }
}

getMul()

module.exports = { name: "1" }