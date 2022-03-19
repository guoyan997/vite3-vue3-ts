/**
 * @description 常用工具方法集合
 */
 interface ICommon {
  getUrlParam: any
  getMonthWeek: any
  isIPhone: any
  isAndroid: any
  formatNumber: any
  initNum: any
  switchPercent: any
   stringToDate: any
   sleep: any
}
/**
 * @description 判断当前日期是第几周
 * @param {Number} 年
 * @param {Number} 月
 * @param {Number} 日
 * @returns {Number} 周
 */
function getMonthWeek(year: any, month: any, day: any) {
  // 获取当月第一日是星期几
  const firstDate = new Date(year, month, 1).getDay()
  const week = Math.ceil((day + firstDate - 8) / 7)
  return week + 1
}
/**
 * 获取URL参数
 * @param {String} name
 * @returns {String} value
 */
function getUrlParam(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r !== null) {
    console.log('getUrlParam decodeURI(r[2]) =', decodeURI(r[2]))
    return decodeURI(r[2]) // 返回参数值，转码中文使中文参数不乱码
    // return unescape(r[2]) // 返回参数值，中文出现乱码
  }
}
/**
 * @description 判断客户端是否iphone
 */
const isIPhone = () => window.navigator.appVersion.match(/iphone/gi)
/**
 * @description 判断客户端是否android
 */
const isAndroid = () => window.navigator.appVersion.match(/android/gi)
function formatNumber(num: any, precision: any, separator: any, init: any = 0) {
  let parts
  // 判断是否为数字
  if (!Number.isNaN(parseFloat(num)) && Number.isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num)
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
    // 分离数字的小数部分和整数部分
    parts = num.split('.')
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','))
    return parts.join('.')
  }
  return init
}
function initNum(val: any) {
  if (val === undefined || val === '' || Number.isNaN(val) || Number.isNaN(parseFloat(val))) {
    return 0
  } 
  return parseFloat(val)
}
function switchPercent(val: any, precision = 1, flag = '') {
  const str = (initNum(val) * 100).toFixed(precision) + flag
  return str
}
// 'yyyy-MM-dd HH:mm:ss'格式的字符串转日期
function stringToDate(str: any) {
  const tempStrs = str.split(' ')
  const dateStrs = tempStrs[0].split('-')
  const year = parseInt(dateStrs[0], 10)
  const month = parseInt(dateStrs[1], 10) - 1
  const day = parseInt(dateStrs[2], 10)
  const timeStrs = tempStrs[1].split(':')
  const hour = parseInt(timeStrs[0], 10)
  const minute = parseInt(timeStrs[1], 10)
  const second = parseInt(timeStrs[2], 10)
  const date = new Date(year, month, day, hour, minute, second)
  return date
}

function sleep(time:Number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
const common: ICommon = {
  getUrlParam,
  getMonthWeek,
  isIPhone,
  isAndroid,
  formatNumber,
  initNum,
  switchPercent,
  stringToDate,
  sleep
}
export {
  getUrlParam,
  getMonthWeek,
  isIPhone,
  isAndroid,
  formatNumber,
  initNum,
  switchPercent,
  stringToDate,
  sleep
}
export default common