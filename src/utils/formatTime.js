const toTwo = date => {
  return date < 10 ? ("0" + date) : date;
}
export const formatDateTime = (date) => {
  var y = date.getFullYear();
  var m = toTwo(date.getMonth() + 1);
  var d = toTwo(date.getDate());
  var h = toTwo(date.getHours());
  var minute = toTwo(date.getMinutes());
  var second = toTwo(date.getSeconds());
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}
