var userAgent = window.navigator.userAgent

function _hasKeyWordInUa (type, rule = '') {
  return new RegExp(type, rule).test(userAgent)
}
  /**
   * 操作系统
   */
var os = _hasKeyWordInUa('Android') || _hasKeyWordInUa('Adr') ? 'android' : (
    /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent) ? 'ios' : null
  )
var allBrowser = [
    // QQ
  'MQQBrowser',
    // chrome
  'Chrome',
    // VivoBrowser
  'VivoBrowser',
    // UC
  'UCBrowser',
    // baidubrowser
  'baidubrowser',
    // MIUI浏览器
  'MiuiBrowser',
  // Safari
  'Safari'
]
  /**
   * 浏览器
   */
var browser = (function () {
  var i = 0
  var amax = allBrowser.length
  var result = null
  for (; i < amax; i++) {
    if (_hasKeyWordInUa(allBrowser[i])) {
      result = allBrowser[i].toLocaleLowerCase()
      break
    }
  }
  return result
})()

  /**
   * wifi / 4g / 3g / 2g
   */
var network = window.navigator.connection.effectiveType.toLocaleLowerCase()
var allPlatform = [
  // 微信
  'MicroMessenger',
  // 爱音乐客户端
  'iMusic',
  // 中国电信营业厅客户端
  'CtClient',
  // QQ
  'QQ'
]
  /**
   * 平台
   */
var platform = (function () {
  var i = 0
  var amax = allPlatform.length
  var result = null
  for (; i < amax; i++) {
    // eslint-disable-next-line no-useless-escape
    if (_hasKeyWordInUa('\\s' + allPlatform[i] + '\/[\\d.]+', 'i')) {
      result = allPlatform[i].toLocaleLowerCase()
      break
    }
  }
  return result
})()

/**
 * 设备
 */
// var device = null
/**
 * 机型
 */
// var model = null

var _document = document
var _documentElement = _document.documentElement

  /**
   * 窗口宽
   */
var windowWidth = _documentElement && _documentElement.clientWidth && _documentElement.clientWidth ||
  window.innerWidth && window.innerWidth ||
  _document.body.clientWidth

  /**
   * 窗口高
   */
var windowHeight = _documentElement && _documentElement.clientHeight && _documentElement.clientHeight ||
  window.innerWidth && window.innerWidth

  /**
   * 窗口高/宽
   */
var windowHexW = Number(windowHeight / windowWidth).toFixed(4)

  /**
   * 窗口宽/高
   */
var windowWexH = Number(windowWidth / windowHeight).toFixed(4)

var _global = {
  userAgent,
  os,
  // device,
  // model,
  browser,
  network,
  platform,
  windowWidth,
  windowHeight,
  windowHexW,
  windowWexH
}

module.exports = _global
