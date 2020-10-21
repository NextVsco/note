const fs = require("fs")

function write(path, data) {
  fs.writeFile(path, data, function (err, data) {
    if (err) {
      throw err;
    }
  });
}

function read(path, back) {
  fs.readFile(path, function (err, data) {
    if (err) {
      throw err;
    }
    back(data)
  })
}

module.exports = { write, read }