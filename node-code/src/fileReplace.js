/* 外部引用 */
const fb = require("./fileBase");

/**
 * 流程 根目录遍历文件=>文件匹配内容=>内容替换=>文件写入
 */
class fileReplace {

  /**
   * @param {*} e.root 查找目录
   * @param {*} e.fileType 文件类型
   * @param {*} e.ignoreDir 忽略文件
   * @param {*} e.logPath 修改记录文件地址
   */
  constructor(e = {}) {
    this.root = e.root
    this.fileType = e.fileType
    this.ignoreDir = e.ignoreDir
    this.logPath = e.logPath
    this.logData = ""
    // this.readLogData()
    this.ergodicFolder(this.root)
  }

  ergodicFolder(path) {
    if (this.ignore(path)) { return }
    fb.read(path, (data) => {
      if (typeof data == "object") {
        for (let i = 0; i < data.length; i++) {
          this.ergodicFolder(path + "/" + data[i])
        }
      } else {
        var ndata = this.dataHandle(data, path)
        if (ndata) { fb.write(path + ".css", ndata) }
      }
    })
  }

  dataHandle(data, path) {
    var targets = this.dataSearch(data)
    var ndata = ""
    var changelen = 0;
    if (targets.length == 0) { return null }
    for (let i = 0; i < targets.length; i++) {
      var workItem = this.workItem(targets[i].value)
      targets[i].value = workItem.value
      ndata += data.substring(i == 0 ? 0 : targets[i - 1].end, targets[i].start) + targets[i].value
      if (i == (targets.length - 1)) { ndata += data.substring(targets[i].end) }
      if (i > 0) { changelen += workItem.newValue.length - workItem.oldValue.length }
      // add log
      this.addHandleLog({
        index: targets[i].start + workItem.index + changelen,
        nvalue: workItem.newValue,
        ovalue: workItem.oldValue,
        data: ndata,
        path
      })
    }

    return ndata
  }

  /* 匹配内容 */
  dataSearch(data) {
    let searchList = []
    let subLen = 0;
    let index = 0;
    do {
      let value = data.match(/btn[^{]*{[^}]*height[^}]*border-radius[\s|:]*(6|8)[^}]*}/)
      if (!value) { data = "" }
      else {
        searchList.push({
          value:  value[0],
          start: subLen + value["index"],
          end: subLen + value["index"] + value[0].length
        })
        index = value["index"] + value[0].length;
        subLen += index
        data = data.substring(index)
      }
    } while (data.length > 0);

    return searchList
  }

  /* 处理数据 */
  workItem(data) {
    function rep(data) {
      return data || []
    }

    let index, value, nvalue;
    var height = rep(data.match(/([\s]|;|{)[\s]*height[\s|:]*[^;]*([\s]|;|})/))[0] || ""
    var num = rep(height.match(/([\d]+)/))[1]
    var unit = rep(height.match(/([0-9]+)([\w]+)([\s]|;|})/))[2]
    var borderRadius = rep(data.match(/([\s]|;)[\s]*border-radius[\s|:]*([^s|^;]*)[^;]*([\s]|;|})/))
    if (num && unit) {
      let borderRadiusValue = rep(borderRadius[0].match(/([\w|\d]+)([\s]|;|})/))
      value = borderRadiusValue[1]
      index = borderRadiusValue["index"] + borderRadius["index"]
      nvalue = parseFloat(num) / 2 + unit
      data = data.substring(0, index) + nvalue + data.substring(index + value.length)
    }
    return {
      value: data,
      oldValue: value,
      newValue: nvalue,
      index: index
    }
  }

  /**
   * 添加替换记录（缺陷，未考虑替换内容中出现的换行及内容部分）
   * @param {Object} object
   * @param {Number} object.index 替换字符串下标
   * @param {String} object.ovalue 旧数据
   * @param {String} object.nvalue 新替换数据
   * @param {String} object.data 文本内容（用于查找换行符）
   * @param {String} object.path 文件地址
   */
  addHandleLog({ index, nvalue, ovalue, data, path }) {
    function rep(data) {
      return data || []
    }
    function nofund(index) { return index == -1 ? 0 : index }
    var logData = ""
    logData += "\n\n" + new Date()
    logData += "\n" + path
    logData += "\n" + (rep(data.substring(0, index).match(/\n/g)).length + 1 ) + ":"
    logData += (index - nofund(data.substring(0, index).lastIndexOf("\n"))) + " (" + index + ")"
    logData += "\n" + "[before]" 
    logData += "\n" + ovalue
    logData += "\n" + "[after]" 
    logData += "\n" + nvalue

    this.logData += logData
    this.writerLogData()
  }

  /* 过滤文件 */
  ignore(path) {
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

  /* 读取记录文件内容 */
  readLogData() {
    fb.read(this.logPath, (data) => {
      this.logData = data + this.logData
    })
  }

  /* 写入记录文件 */
  writerLogData() {
    if (this.LogWriteTime) { clearTimeout(this.LogWriteTime) }
    this.LogWriteTime = setTimeout(() => {
      this.LogWriteTime = null
      fb.write(this.logPath, this.logData)
    }, this.LogWriteDelay || 500)
  }
}

new fileReplace({
  root: "C:/nowWork/note/demo/TEXT.wxss",
  fileType: "wxss",
  ignoreDir: [".svn"],
  logPath: "C:/nowWork/note/demo/PUT2.log"
})
