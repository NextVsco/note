function timeDown(endDateStr, nowDate = new Date()) {
  var endDate = new Date(endDateStr);
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  var data = {
    "day": Math.floor(totalSeconds / (60 * 60 * 24)),                 // 日
    "hour": Math.floor(totalSeconds % (60 * 60 * 24) / (60 * 60)),     // 时
    "minute": Math.floor(totalSeconds % (60 * 60 * 24) % (60 * 60) / 60),// 分
    "second": totalSeconds % (60 * 60 * 24) % (60 * 60) % 60          // 秒
  }
  return data;
}

function getMonthEnd(time = new Date()) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  if (month == 12) { month = 0; year++ }
  let monthEnd = (new Date(`${year}-${month + 1}-1`).valueOf())
  return monthEnd
}

function getWeekEnd(time = new Date()) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let day = time.getDay()
  let differ = 7 - day
  if (differ == 7) { differ = 0 }
  let weekEnd = (new Date(`${year}-${month}-${date}`).valueOf()) + ((differ + 1) * 86400000)
  return weekEnd
}

function timeT(nowTime){
  console.log(
    "当前时间", nowTime
  )
  // console.log(
  //   "月末", timeDown(getMonthEnd(new Date(nowTime)), new Date(nowTime))
  // )
  console.log(
    "周末", timeDown(getWeekEnd(new Date(nowTime)), new Date(nowTime))
  )
}

console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
for(var i=0;i<28;i++){
  timeT(`2021-2-${i+1} 12:00`)
}
