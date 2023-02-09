var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(100, 65, 40, 0, 2 * Math.PI);
ctx.bezierCurveTo(180, 30, 250, 180, 300, 100);
ctx.stroke();
ctx.closePath();
ctx.fill();