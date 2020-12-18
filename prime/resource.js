const fs = require("fs");
var config = require("./config.json");

var list = []
try {
  list = require(config.dataPath);
} catch (error) { }
var start = parseInt(config.start,2)
var additional = parseInt(config.additional,2)

function writeList(add, all) {
  var value = ""
  for (var i = 0; i < all.length; i++) {
    value += ((i > 0 ? ',\n' : '') + `"${all[i]}"`)
  }
  value = `[\n${value}\n]`
  fs.writeFileSync(__dirname + config.dataPath.substring(1), value)
}

function setStart(num) {
  config.start = num.toString(2)
  fs.writeFileSync(__dirname + "/config.json", JSON.stringify(config))
}

module.exports = { list, writeList, start, setStart, additional }