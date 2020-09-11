// var sizeUnit = ['Byte', 'K', 'M', 'G', 'T']
var uploadMap = {
  image: 'image/*'
}
var _global = {}
/**
 * 选择文件 默认图片
 */
_global.chooseFile = function (type = 'image') {
  return new Promise(function (resolve, reject) {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = uploadMap[type]
    input.style.visibility = 'hidden'
    input.addEventListener('change', function (evt) {
      var src = evt.srcElement
      resolve(src.files[0])
    })
    input.click()
  })
}
/**
 * 图片文件转base64
 */
_global.imageToBase64 = function (file) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line no-undef
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      if (e.result) {
        resolve(e.result)
      } else {
        reject()
      }
    }
  })
}
/**
 * 图片压缩
 * CompressImageOptions
 * 文件
 * file: File,
 * 品质，默认.8  quality值越小，所绘制出的图像越模糊
 * quality?: number,
 * 是否返回Blob，否则返回base64
 * toBlob?: boolean
 */
_global.compressImage = function (options) {
  return new Promise(function (resolve, reject) {
    _global.imageToBase64(options.file).then(function (data) {
      var img = document.createElement('img')
      img.src = data
      img.onload = function (image) {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.setAttribute('width', image.width)
        canvas.setAttribute('height', image.height)
        ctx.drawImage(image, 0, 0, image.width, image.height)
        var base64 = canvas.toDataURL(options.file.type, options.quality || 0.8)
        if (options.toBlob) {
          resolve(_global.base64ToBlob(base64))
        } else {
          resolve(base64)
        }
      }
    })
  })
}
/**
 * base64转Blob
 */
_global.base64ToBlob = function (base64) {
  var arr = base64.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = window.atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // eslint-disable-next-line no-undef
  return new Blob([u8arr], {
    type: mime
  })
}

module.exports = _global
