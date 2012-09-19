window.URL = window.URL || window.webkitURL

navigator.getUserMedia  = navigator.getUserMedia || 
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame

window.onload = function(){new camorama()}

function camorama() {
  var self = this
  this.ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
  var streamContainer = document.createElement('div')
  this.video = document.createElement('video')
  this.video.setAttribute('autoplay', '1')
  this.video.setAttribute('style', 'display:none')
  streamContainer.appendChild(this.video)
  document.body.appendChild(streamContainer)
  navigator.getUserMedia({video: true}, function(stream) {
    self.video.src = window.URL.createObjectURL(stream)
    localMediaStream = stream
    self.update()
  })

  this.update = function() {
    var self = this
    var loop = function() {
      self.draw()
      requestAnimationFrame(loop) 
    }
    requestAnimationFrame(loop) 
  } 

  this.draw = function() {
    this.ctx.drawImage(this.video, 0, 0)
  }
}

