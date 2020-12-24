// const DigPrime = require("./dig");
// new DigPrime().main()

// require("./statistics");

// let i = 0
// do {
//   i++
//   console.log(
//     // i,
//     i.toString(2)
//   )
//   let powNum = Math.pow(i, 2)
//   console.log(
//     // powNum,
//     powNum.toString(2)
//   )
//   console.log(
//     // powNum,
//     Math.pow(i, 3).toString(2)
//   )
//   console.log(
//     // powNum,
//     Math.pow(i, 4).toString(2)
//   )
//   console.log()
// } while (i < 32)


function formatTime(date, fmt = "YYYY-mm-dd") {
  if (typeof date == "number") { date = new Date(date) }  // date自动转换
  var ret;
  var opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

console.log(formatTime(1579708800000,"d天"))