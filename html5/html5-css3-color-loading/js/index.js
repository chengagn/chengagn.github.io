var W,H,
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    hsl = 0,
    angle = 0.01;

function size(){
  W = window.innerWidth,
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}

function paint(){
  angle += 0.03;
  hsl <= 360 ? hsl+=0.25 : hsl = 0;
  var s = -Math.sin(angle);
  var c = Math.cos(angle);

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.fillStyle = 'hsla('+hsl+', 100%, 50%, 1)';
  ctx.arc(W/2+(s*75),H/2+(c*75),25,0,2*Math.PI);
  ctx.fill();
  ctx.restore();
}

setInterval(paint, 5)

size();
$(window).on('resize', size);