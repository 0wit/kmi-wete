let total = 0;
let length = 0;
let fullAngle = 2 * Math.PI;
let colors = [];

function init()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', mouseDown(4,5,6,7), false);
    // canvas.addEventListener("mousemove", mouseXY(), false);
    // canvas.addEventListener("touchstart", touchDown(), false);
    // canvas.addEventListener("touchmove", touchXY(), true);
    // canvas.addEventListener("touchend", touchUp(), false);
    // document.body.addEventListener("mouseup", mouseUp(), false);
    // document.body.addEventListener("touchcancel", touchUp(), false);
}

window.addEventListener("load", init, false);

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function processValues(values) {
    total = values.reduce((a, b) => a + b, 0);
    length = values.length;
    for (let i = 0; i < length; i++) {
        values[i] = values[i] / total;
        colors[i] = generateRandomColor();
    }
    return values;
}

function mouseDown(...values) {

    values = processValues(values); 
    let startAngle = 0;
    let endAngle;
    
    for (let i = 0; i< values.length; i++) {
        endAngle = startAngle + (values[i] * fullAngle)
        ctx.beginPath();
        ctx.arc(100, 65, 60, startAngle, endAngle);
        ctx.lineTo(100, 65)
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        startAngle = endAngle;
    }    
}