var meta = [{
  name: 'viewport',
  content: 'width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
},
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes'
  },
  {
    name: 'full-screen',
    content: 'true'
  },
  {
    name: 'screen-orientation',
    content: 'portrait'
  },
  {
    name: 'x5-fullscreen',
    content: 'true'
  },
  {
    name: '360-fullscreen',
    content: 'true'
  }
]

function setFontSize () {
  var _document = document
  var _documentElement = _document.documentElement
  var width = _documentElement && _documentElement.clientWidth && _documentElement.clientWidth ||
  window.innerWidth && window.innerWidth ||
  _document.body.clientWidth
  _documentElement.style.fontSize = width / 10 + 'px'
}

function init () {
  var i = 0
  var amax = meta.length
  var metaEl
  for (; i < amax; i++) {
    metaEl = document.querySelector('meta[name="' + meta[i].name + '"]')
    if (!metaEl) {
      metaEl = document.createElement('meta')
      document.head.append(metaEl)
      metaEl.name = meta[i].name
    }
    metaEl.content = meta[i].content
  }

  setFontSize()
  window.addEventListener('resize', function () {
    setTimeout(function () {
      setFontSize()
    }, 16)
  })
}

module.exports = {
  init
}
