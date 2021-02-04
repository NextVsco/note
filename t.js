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

function getWeekEnd(time = new Date()) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let day = time.getDay()
  let differ = 6 - day
  if (differ == 0) { differ = 7 }
  let weekEnd = (new Date(`${year}-${month}-${date}`).valueOf()) + (differ * 86400000)
  return weekEnd
}

for(var i =0;i<24;i++){
  let value = "2020-2-"+(i+1)
  var end = getWeekEnd(
    // new Date("2020-1-30")
    new Date(value)
  )
  console.log(
    value,
    new Date(value),
    new Date(end),
    timeDown(end,new Date(value))
  )
}
