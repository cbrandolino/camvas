window.URL = window.URL || window.webkitURL

navigator.getUserMedia  = navigator.getUserMedia || 
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia

window.onload = function() {
  var video = document.querySelector('video');

  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream)
    localMediaStream = stream
  })
}
