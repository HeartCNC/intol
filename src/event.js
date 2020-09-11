var _fns = {}
var event = {}

function _isEvent (eventName, fn) {
  return typeof eventName === 'string' &&
      typeof fn === 'function'
}
  /**
   * 监听
   */
function on (eventName, fn) {
  if (!_isEvent(eventName, fn)) {
    return false
  }
  if (!(eventName in _fns)) {
    _fns[eventName] = []
  }
    // 将事件存入
  _fns[eventName].push(fn)
  return true
}
event.on = on
  /**
   * 触发
   */
event.emit = function (eventName, data) {
    // 没有注册该事件
  if (!(eventName in _fns)) {
    return false
  }
  if (typeof _fns[eventName] !== 'undefined') {
    var evts = _fns[eventName]
    var i = 0
    var amax = _fns[eventName].length
    for (; i < amax; i++) {
      evts[i](data)
    }
  }
  return true
}
  /**
   * 解绑
   */
function off (eventName, fn) {
    // 无效事件抛出
  if (!_isEvent(eventName, fn) || !(eventName in _fns)) {
      // console.warn('无效事件')
    return false
  }
  if (!fn) {
      // 直接移除事件
    delete _fns[eventName]
  } else {
    var idx = _fns[eventName].indexOf(fn)
      // 抛出异常事件
    if (idx === -1) {
        // new Error('无该绑定事件')
      return
    }
      // 移除事件
    _fns[eventName].splice(idx, 1)
    if (_fns[eventName].length === 0) {
      delete _fns[eventName]
    }
  }
  return true
}
event.off = off
event.once = function (eventName, fn) {
  var removeFn
  if (on(eventName, fn)) {
    removeFn = function () {
      off(eventName, fn)
      off(eventName, removeFn)
    }
    on(eventName, removeFn)
    return true
  }
  return false
}

module.exports = event
