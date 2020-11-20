var isFinished = false
var secondMask = document.getElementById('secondMask')
var element = document.getElementById('firstMask')
secondMask.style.opacity = '0'
var lunch = document.getElementById('lunch')
lunch.addEventListener('click', function () {
  isFinished = true
  secondMask.style.opacity = '0'
})
var ifr = document.getElementById('MainPopupIframe')
var x = 0
var video = document.getElementById('video')
ifr.onload = function () {
  window.setInterval(function () {
    var focus = document.activeElement
    if (document.activeElement == ifr) {
      if (isFinished) {
        console.log('erererere')
      } else {
        element.style.opacity = '0'
        console.log('dsdsdsdsdsdsd')
        secondMask.style.opacity = '100'
        lunch.style['pointer-events'] = 'auto'
      }
    }
  }, 1000)
}
