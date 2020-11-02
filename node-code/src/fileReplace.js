/* 外部引用 */
const fb = require("./fileBase");

class fileReplace {
  /**
   * 
   * @param {*} e.root 查找目录
   * @param {*} e.fileType 文件类型
   */
  constructor(e = {}) {
    this.root = e.root
    this.fileType = e.fileType
    this.ignoreDir = e.ignoreDir
    this.ergodicFolder(this.root)
  }

  ergodicFolder(path) {
    if (this.ignore(path)){ return }
    fb.read(path, (data) => {
      if (typeof data == "object") {
        for (let i = 0; i < data.length; i++) {
          this.ergodicFolder(path + "/" + data[i])
        }
      } else {
        this.dataHandle(data,path)
      }
    })
  }

  dataHandle(data, path) {
    console.log("read", path)
  }

  ignore(path){
    if (this.fileType == undefined) { return false }
    if (path.indexOf(".") == -1) { return false }
    else if (path.substring(path.lastIndexOf(".") + 1) !== this.fileType) {
      // 判断是否为文件类型
      let isFile = fb.lstatSync(path).isFile()
      if (!isFile) {
        for (let i = 0; i < this.ignoreDir.length; i++) {
          if (path.substring(path.lastIndexOf("/") + 1) == this.ignoreDir[i]) { return true }
        }
      }
      return isFile
    }
    else { return false }
  }
}

new fileReplace({
  root: "C:/nowWork/wx-project/celebrityMall",
  fileType: "wxss",
  ignoreDir: [".svn"]
})
