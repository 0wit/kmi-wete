let total = 0;
let length = 0;

function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown(4,5,6,7), false);
    // canvas.addEventListener("mousemove", mouseXY(), false);
    // canvas.addEventListener("touchstart", touchDown(), false);
    // canvas.addEventListener("touchmove", touchXY(), true);
    // canvas.addEventListener("touchend", touchUp(), false);
    // document.body.addEventListener("mouseup", mouseUp(), false);
    // document.body.addEventListener("touchcancel", touchUp(), false);
}

window.addEventListener("load", init, false);

function mouseDown(...values) {
    ctx.beginPath();
    ctx.arc(100, 65, 60, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    total = values.reduce((a, b) => a + b, 0);
    length = values.length;
    
    for (value of values) {

    }
}