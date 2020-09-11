// share
function weibo (options = {
  url: '', title: '', pic: '', appKey: ''
}) {
  var shareUrl = `https://service.weibo.com/share/share.php?appkey=${options.appKey}&url=${encodeURIComponent(options.url)}&title=${encodeURIComponent(options.title)}&pic=${encodeURIComponent(options.pic)}`
  window.open(shareUrl, '_blank')
}
// share.weibo({
//   url: 'https://m.imusic.cn/h5v/yuntour/share?videoId=3602&cc=2020&activityId=201',
//   title: '琐琐碎碎是',
//   pic: 'http://res.ctmus.cn/audio.diyaudit.v6/sx/share.jpg'
// })

var share = {
  weibo
}

module.exports = share
