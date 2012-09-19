// If the browser does not support any URL, getUserMedia or
// requestAnimationFrame implementation, we just ignore it.
// My policy for experimental software is: if you don't have a
// nightly build, you don't deserve exceptions.
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

// Aaaand, let's get going!
window.onload = function(){new camvas()}

function camvas() {
  var self = this

  // Here's the canvas we'll use for our images.
  this.ctx = document.getElementsByTagName('canvas')[0].getContext('2d')

  // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.
  var streamContainer = document.createElement('div')
  this.video = document.createElement('video')

  // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual 
  // for streamed videos.
  this.video.setAttribute('autoplay', '1')

  // The video should fill out all of the canvas
  this.video.setAttribute('width', ctx.width)
  this.video.setAttribute('height', ctx.width)

  this.video.setAttribute('style', 'display:none')
  streamContainer.appendChild(this.video)
  document.body.appendChild(streamContainer)

  // The callback happens when we are starting to stream the video.
  navigator.getUserMedia({video: true}, function(stream) {
    // Yay, now our webcam input is treated as a normal video and
    // we can start having fun
    self.video.src = window.URL.createObjectURL(stream)
    // Let's start drawing the canvas!
    self.update()
  })

  // The `canvas` element treats our video like any other DOM element,
  // drawing its current status. We will have to take care of the updates.
  this.update = function() {
    var self = this

    // So what we do is, we copy the current video frame on the canvas
    // as soon as we can change the canvas' frame...
    var loop = function() {
      self.draw()
      requestAnimationFrame(loop) 
    }
    requestAnimationFrame(loop) 
  } 
  
  // ... just like that!
  this.draw = function() {
    this.ctx.drawImage(this.video, 0, 0)
  }
}

