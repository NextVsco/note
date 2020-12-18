const { list, writeList, start, setStart, additional } = require("./resource");

class DigPrime {
  constructor() {
    this.list = list.length > 0 ? list : []
    this.addList = []
  }

  main(index, maxIndex) {
    if (!index) { index = this.getAuto() }
    if (index < 2) { index = 2 }
    if (!maxIndex) { maxIndex = index + additional }
    if (index > maxIndex) { return console.error('Invalid range') }
    while (index < maxIndex) {
      let pass = true
      for (let i = 0; i < this.list.length; i++) {
        let value = parseInt(this.list[i], 2)
        if (index % value == 0) {
          pass = false
          break;
        }
      }
      if (pass) { this.setListData(index.toString(2)) }
      index++
    }
    this.writeData()
    setStart(maxIndex)
  }

  getAuto() {
    if (start && start >= 2) {
      return start
    }
    if (this.list.length > 0) {
      return parseInt(this.list[this.list.length - 1], 2)
    }
    return 2
  }

  setListData(num) {
    this.list.push(num)
    this.addList.push(num)
  }

  writeData() {
    if (this.timeid) {
      clearTimeout(this.timeid)
    }
    this.timeid = setTimeout(() => {
      writeList(this.addList, this.list)
      this.timeid = null
    }, 500)
  }
}

module.exports = DigPrime