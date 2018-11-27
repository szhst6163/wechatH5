/**
 * 获得前后30天的日期
 */
import formatDate from "./formatDate";

let date = {
  dateArr: [],
  timeArr: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  month: []
};
var hours
const now = new Date().getTime();
(() => {
  for (let i = 0; i < 366; i++) {
    let Time = new Date(now + 24 * 60 * 60 * 1000 * i);
    date.dateArr.push({
      // name: `${formatDate(Time,'MM月dd日')}  ${isCur(Time)}`,
      name: `${formatDate(Time,'yyyy-MM-dd')}`,
      value: formatDate(Time, 'yyyy/MM/dd')
    });
  }
  for (let i = 1; i < 181; i++) {
    let beforeTime = new Date(now - 24 * 60 * 60 * 1000 * i);
    date.dateArr.unshift({
      name: `${formatDate(beforeTime,'yyyy-MM-dd')}`,
      value: formatDate(beforeTime, 'yyyy/MM/dd')
    });
  }
  for (let i = 0; i < 60; i++) {
    date.month.push({
      name: `${i}个月`,
      value: i + ""
    })
  }
})();

function isCur(val) {
  if (val - now === 0) {
    return '今天'
  } else if (val - now === 24 * 60 * 60 * 1000) {
    return '明天'
  } else if (val - now === 24 * 60 * 60 * 1000 * 2) {
    return "后天"
  } else {
    return ''
  }
}
export default date
