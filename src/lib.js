/* eslint-disable*/
var _global = {}
  /**
   * 复制内容
   * 需引入第三方 Clipboard
   * cdn https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js
   */
if (window['Clipboard']) {
  _global.copy = function (str) {
    var button = document.createElement('button')
    new window.Clipboard(button)
    button.setAttribute('data-text', str)
    button.click()
  }
}
  /**
   * 获取指纹
   * cdn https://cdn.bootcdn.net/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js
   */
if (window['Fingerprint2']) {
  _global.getFingerprint = function () {
    var fingerprint = window.localStorage.getItem('fingerprint')
    if (fingerprint && fingerprint !== '') return (fingerprint)
    return new Promise(function (resolve, reject) {
      if (fingerprint && fingerprint !== '') resolve(fingerprint)
      if (window['Fingerprint2']) {
        window['Fingerprint2'].getV18 = function ({}, result) {
          window.localStorage.setItem('fingerprint', result)
          resolve(result)
        }
      } else reject()
    })
  }
}
  /**
   * cnzz统计
   */
if (window['_czc']) {
  _global.cnzz = function (eventName, eventType = 'click', eventValue = 1) {
    window['_czc'].push(['_trackEvent', eventName, eventType, 'startup', eventValue])
  }
}

module.exports = _global
