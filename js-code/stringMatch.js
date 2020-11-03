var md = {
  key: "view ---- {",
  index: 0,
  first: null,
  end: null,
  value: []
}

function codeMatch(char, index) {
  if (md.index <= 3) {
    if (char == md.key[md.index].charCodeAt(0)) {
      if (md.index == 0) { md.first = index }
      md.index++
    } else if (md.first != null) {
      clear()
    }
  } else if (char == "{".charCodeAt(0)) {
    md.end = index
    md.value.push([md.first, md.end])
    clear()
  }
  function clear() {
    md.first = null
    md.end = null
    md.index = 0
  }
}

for (var i = 0; i < data.length; i++) {
  let value = data[i]
  let valueCode = data[i].charCodeAt(0)
  codeMatch(valueCode, i)
}
console.log(md.value)

for (var i in md.value) {
  console.log(data.substring(md.value[i][0], md.value[i][1] + 1))
}
