let total = 0;
let length = 0;
let fullAngle = 2 * Math.PI;
let colors = [];

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", mouseDown(4, 5, 6, 7), false);
}

window.addEventListener("load", init, false);

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function createLineGraphOrigin() {
function mouseDown() {
  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.lineTo(100, 725);
  ctx.stroke();
  ctx.lineTo(1820, 725);
  ctx.stroke();
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

function create(...values) {
  values = processValues(values);

  for (let i = 0; i < values.length; i++) {}
  ctx.fillStyle = "#00f";
  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 4;
}

function createPieGraph(...values) {
  values = processValues(values);
  let startAngle = 0;
  let endAngle;

  for (let i = 0; i < values.length; i++) {
    endAngle = startAngle + values[i] * fullAngle;
    ctx.beginPath();
    ctx.arc(960, 400, 300, startAngle, endAngle);
    ctx.lineTo(960, 400);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    startAngle = endAngle;
  }
}
