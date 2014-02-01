# Camvas

A simple HTML5 library to stream a webcam video to a `<canvas>` object. 

Uses WebRTC (getUserMedia), Canvas and HTML5 Video.

Check out a sample application, too: [camvas_photobooth](http://cbrandolino.github.io/camvas_photobooth/).

## Example usage:
  ```javascript
  window.onload = function(){
    var ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
    var draw = function(video, dt) {
      ctx.drawImage(video, 0, 0)
    }
    var myCamvas = new camvas(ctx, draw)
  }
  ```

## Homepage

You can find annotated source code, demo and useful resources at [http://cbrandolino.github.com/camvas](http://cbrandolino.github.com/camvas)

