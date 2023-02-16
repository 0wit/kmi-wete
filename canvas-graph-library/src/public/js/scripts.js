let total = 0;
let length = 0;
let maxValue = 0;
let valuesSegment = [];
let columnWidth = 100;
let columnLimit = 15;
let fullAngle = 2 * Math.PI;
let colors = [];

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", mouseDown(4, 7, 5, 6), false);
  //canvas.addEventListener("mousedown", mouseDown(4, 7, 18, 16, 31, 23, 8, 12, 41, 4, 7, 18, 16, 31), false);
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

function mouseDown(...values) {
  values = processValues(values);
  createGraphOrigin();
  //createColumnGraph(values)
  //createPointGraph(values);
  createLineGraph(values)
}

function createGraphOrigin() {
  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.lineTo(100, 725);
  ctx.stroke();
  ctx.lineTo(1820, 725);
  ctx.stroke();
  ctx.closePath();
}

function processValues(values) {
  total = values.reduce((a, b) => a + b, 0);
  length = values.length;

  if (values.length > columnLimit) {
    columnWidth = columnWidth/Math.floor((values.length / columnLimit));
  }

  maxValue = Math.max.apply(Math, values);

  for (let i = 0; i < length; i++) {
    valuesSegment[i] = values[i] / maxValue;
    colors[i] = generateRandomColor();
  }

  for (let i = 0; i < length; i++) {
    values[i] = values[i] / total;
  }
  
  return values;
}

function createPieGraph(values) {
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


function createColumnGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < values.length; i++) {
    yAxisSegment = 725 - (650 * valuesSegment[i]);
    ctx.fillStyle = colors[i];
    ctx.fillRect(xAxisSegment + i * xAxisSegment, yAxisSegment,
     columnWidth, (650 * valuesSegment[i]) - 1);
  }
}

function createPointGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < values.length; i++) {
    yAxisSegment = 725 - (650 * valuesSegment[i]);
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(xAxisSegment + i * xAxisSegment, yAxisSegment, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function createLineGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 725 - (650 * valuesSegment[0]);
  ctx.beginPath();
  ctx.arc(xAxisSegment, yAxisSegment, 3, 0, 2 * Math.PI);
  ctx.fill();

  for (let i = 1; i < values.length; i++) {
    yAxisSegment = 725 - (650 * valuesSegment[i]);
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(xAxisSegment + i * xAxisSegment, yAxisSegment, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.moveTo(xAxisSegment + (i-1) * xAxisSegment, 725 - (650 * valuesSegment[i-1]));
    ctx.lineTo(xAxisSegment + i * xAxisSegment, yAxisSegment);
    ctx.stroke();
  }
}