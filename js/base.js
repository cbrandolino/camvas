window.URL = window.URL || window.webkitURL

navigator.getUserMedia  = navigator.getUserMedia || 
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia

window.onload = function() {
  var streamContainer = document.createElement('div')
  var video = document.createElement('video')
  video.setAttribute('autoplay', '1')
  streamContainer.appendChild(video)
  document.body.appendChild(streamContainer)

  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream)
    localMediaStream = stream
  })
}
