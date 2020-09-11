const event = require('./event')
const ua = require('./ua')
const file = require('./file')
const mobile = require('./mobile')
const axios = require('axios')
// import axios from 'axios'

mobile.init()

var _global = {
  event,
  ua,
  file,
  http: axios
}

function _isType (type) {
  return function (target) {
    '[object ' + type + ']' === Object.prototype.toString.call(target)
  }
}

/**
 * 判断类型
 */
/**
 * 判断是否为Object
 */
_global.isObject = _isType('Object')
/**
 * 判断是否为Array
 */
_global.isArray = _isType('Array')
/**
 * 判断是否为string
 */
_global.isString = _isType('String')
/**
 * 判断是否为null
 */
_global.isNull = _isType('Null')
/**
 * 判断是否为number
 */
_global.isNumber = _isType('Number')
/**
 * 判断是否为undefined
 */
_global.isUndefined = _isType('Undefined')
/**
 * 判断是否为非undefined
 */
_global.isNotUndefined = function (type) {
  return !_isType('Undefined')(type)
}
/**
 * 判断是否为regexp
 */
_global.isRegExp = _isType('RegExp')
/**
 * 判断是否为function
 */
_global.isFunction = _isType('Function')
/**
 * 判断是否为promise
 */
_global.isPromise = function (fn) {
  return !_isType('Undefined')(fn) && _isType('Function')(fn.then) && _isType('Function')(fn.catch)
}
/**
 * 判断是否为空
 */
// _global.isEmpty = function (target) {
//   return isNull(target) ||
//     isUndefined(target) ||
//     (isString(target) && target === '') ||
//     (isArray(target) && target.length === 0) ||
//     (isObject(target) && Object.keys(target).length === 0)
// }
/**
 * 对象合并
 */
_global.assgin = function (target, source) {
  if (!Object.isFrozen(target)) {
    var key
    for (key in source) {
      target[key] = source[key]
    }
  }
}
/**
 * 对象深拷贝
 */
_global.clone = function (res) {
  var deep = function (obj) {
    var o
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          var i = 0
          var amax = obj.length
          for (; i < amax; i++) {
            o.push(deep(obj[i]))
          }
        } else {
          o = {}
          var key
          for (key in obj) {
            o[key] = deep(obj[key])
          }
        }
      }
    } else {
      o = obj
    }
    return o
  }
  return deep(res)
}
/**
 * 数组填充
 */
_global.fill = function (array, target) {
  if (_global.isArray(array)) {
    var i = 0
    var amax = array.length
    for (; i < amax; i++) {
      array[i] = target
    }
  }
  return array
}
/**
 * 去除首尾指定字符
 */
_global.trim = function (str, char = '\\s') {
  return str.replace(new RegExp('^[' + char + ']*|[' + char + ']*$', 'g'), '')
}
/**
 * 获取数字
 */
_global.getStringNumber = function (str) {
  return str.replace(/[^\d]/g, '')
}
/**
 * 获取中文
 */
_global.getStringCnText = function (str) {
  return str.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, '')
}
/**
 * 获取字母
 */
_global.getStringEnText = function (str) {
  return str.replace(/[^A-Za-z]/g, '')
}
/**
 * 获取区间内随机数
 */
_global.random = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

var _weeks = ['日', '一', '二', '三', '四', '五', '六', '日']
/**
 * 日期格式化
 * yyyy - 年
 * MM - 月
 * dd - 日
 * hh - 时
 * mm - 分
 * ss - 秒
 * w - 星期（数字）
 * W - 星期（大写数字）
 * q - 季度
 * S - 微秒
 */
_global.dateFormat = function (fmt = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'W+': _weeks[date.getDay()],
    'w+': date.getDay(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  var k
  for (k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 日期差值
 * s - 秒
 * n - 分
 * h - 时
 * w - 周
 * d - 日
 * m - 月
 * y - 年
 */
_global.dateDiff = function (date, ddate = new Date(), interval = 'd') {
  var diffms = +date - +ddate
  switch (interval) {
    // 计算秒差
    case 's':
      return Math.abs(diffms / 1000)
      // 计算分差
    case 'n':
      return Math.abs(diffms / 60000)
      // 计算時差
    case 'h':
      return Math.abs(diffms / 3600000)
      // 计算周差
    case 'w':
      return Math.abs(diffms / (86400000 * 7))
      // 计算月差
    case 'm':
      return (date.getMonth() + 1) + ((date.getFullYear() - ddate.getFullYear()) * 12) - (ddate.getMonth() + 1)
      // 计算年差
    case 'y':
      return date.getFullYear() - ddate.getFullYear()
      // 计算日差
    case 'd':
    default:
      return Math.abs(diffms / 86400000)
  }
}
/**
 * 秒转换为HH:mm:ss格式
 */
_global.sencondsToTimeFormat = function (seconds = 0) {
  var h = Math.floor(seconds / 3600)
  var m = Math.floor(seconds / 60) % 60
  var s = seconds % 60
  var fh = '' + (h > 9 ? h : '0' + h)
  var fm = '' + (m > 9 ? m : '0' + m)
  var fs = '' + (s > 9 ? s : '0' + s)
  var fw = fm + ':' + fs
  return h > 0 ? fh + ':' + fw : fw
}
/**
 * url paramer
 */
_global.urlParamer = function (url = window.location.href) {
  var options = {}
  if (url.indexOf('?') !== -1) {
    var params = url.split('?').pop().split('&')
    var i = 0
    var amax = params.length
    for (; i < amax; i++) {
      var param = params[i].split('=')
      var v = param[1]
      try {
        v = decodeURIComponent(v)
        v = JSON.parse(v)
      } catch (e) {
        v = decodeURIComponent(v)
      }
      options[param[0]] = v
    }
  }
  return options
}
/**
 * url stringify
 */
_global.urlStringify = function (o) {
  var arr = []
  var k
  for (k in o) {
    arr.push('' + k + '=' + encodeURIComponent(JSON.stringify(o[k])))
  }
  return arr.join('&')
}
/**
 * 检测格式
 * @param type 'phone' | 'tel' | 'idcard' | 'postal' | 'qq' | 'email' | 'money' | 'url' | 'ip' | 'date' | 'english' | 'chinese' | 'lower' | 'upper'
 */
_global.checkFormat = function (type, str) {
  var regObject = {
    phone: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
    tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
    idcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    postal: /[1-9]\d{5}(?!\d)/,
    qq: /^[1-9][0-9]{4,9}$/,
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    money: /^\d*(?:\.\d{0,2})?$/,
    // eslint-disable-next-line no-useless-escape
    url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
    ip: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/,
    // eslint-disable-next-line no-useless-escape
    date: /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/,
    english: /^[a-zA-Z]+$/,
    chinese: /^[\u4E00-\u9FA5]+$/,
    lower: /^[a-z]+$/,
    upper: /^[A-Z]+$/
  }
  return regObject.hasOwnProperty(type) && regObject[type].test(str)
}

/**
 * 休眠/ms
 */
_global.wait = function (time = 0) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time)
  })
}

module.exports = _global
