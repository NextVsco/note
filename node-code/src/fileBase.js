const fs = require("fs")

function write(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
      throw err;
    }
  });
}

function read(path, back) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      if (err.errno == -4068) { readDir(path, back); return }
      else { throw err; }
    }
    back(data)
  })
}

function readDir(path, back){
  fs.readdir(path, function (err, data) {
    if (err) {
      throw err;
    }
    back(data)
  })
}

function lstatSync(path){
  return fs.lstatSync(path)
}

module.exports = { write, read, lstatSync }