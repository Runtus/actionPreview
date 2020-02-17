const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDay = day => {
  if (day == 1) {
    return "一"
  }
  else if (day == 2) {
    return "二"
  }
  else if (day == 3) {
    return "三"
  }
  else if (day == 4) {
    return "四"
  }
  else if (day == 5) {
    return "五"
  }
  else if (day == 6) {
    return "六"
  }
  else if (day == 7) {
    return "日"
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDay: formatDay //别忘记把定义的函数暴露出去
}

