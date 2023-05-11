import {Pie} from './Objects/Pie.js';
import {Point} from './Objects/Point.js';
import * as graphElementUtils from './Utils/GraphElementsUtils.js';
import * as otherUtils from './Utils/OtherUtils.js';

// general variables

let ctx;
let colors = [];
let valuesSegment = [];
let currentGraph = '';

// column variables

let columnWidth = 100;
let columnLimit = 15;
let fullAngle = 2 * Math.PI;
let maxValue = 0;
let valuesColumns = [];

// pie variables

let pies = [];
const pieCenterX = 960;
const pieCenterY = 400;
const pieRadius = 300;
let valuesPies = [];

// point + line variables
let points = [];
const pointRadius = 3;

// check where user has clicked

function checkCollision() {
  switch(currentGraph) {
    case 'point':
      // code block
      break;
    case 'column':
      // code block
      break;
    case 'pie':
    // code block
      break;
    default:
  } 
}

// starting function

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.addEventListener('mousedown', function(evt) {
    const cRect = canvas.getBoundingClientRect();
    const canvasX = Math.round(evt.clientX - cRect.left);
    const canvasY = Math.round(evt.clientY - cRect.top); 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillText("X: "+canvasX+", Y: "+canvasY, 10, 20);
  });
  const button = document.querySelector("button");
  button.addEventListener('click', testingFunction('24', '7', '16' , '11'), false);
}

window.addEventListener('load', init, false);

// setting up variables

function processValues(values) {

  // forcing data type to number (want type string because of  graph's legend)
  const total = values.map(Number).reduce((a, b) => a + b, 0);
  const length = values.length;

  // counting width of columns based of the number of columns that user passed to function 
  if (length > columnLimit) {
    columnWidth = columnWidth/Math.floor((length / columnLimit) + 1);
  }

  // in order to get proper size and lengths of objects that are drawn on canvas, we need to know
  // how big the current drawn object is relative to the biggest object (columns and points) and total (pies) 

  maxValue = Math.max.apply(Math, values);

  for (let i = 0; i < length; i++) {
    valuesSegment[i] = values[i] / maxValue;
    colors[i] = otherUtils.generateRandomColor();
  }

  for (let i = 0; i < length; i++) {
    valuesPies[i] = values[i] / total;
  }
}

// function currently used for testing

function testingFunction(...values) {
  
  processValues(values);

  // legend has to be first, because graph is redrawn
  graphElementUtils.drawGraphLegend(ctx, colors, ...values);
  graphElementUtils.drawGraphOrigin(ctx);
  graphElementUtils.drawGraphName(ctx, 'First quater statistics')

  createPieGraph();
  //createColumnGraph()
  //createPointGraph();
  //createLineGraph();
  //highlightColumn(valuesColumns[0]);
  //highlightPie(pies[0])
  //highlightPoint(points[1]);
}

//pie graph

function createPieGraph() {
  let startAngle = 0;
  let endAngle;

  for (let i = 0; i < valuesSegment.length; i++) {
    const pie = new Pie(i, startAngle, endAngle, colors[i]);
    endAngle = startAngle + valuesPies[i] * (Math.PI * 2);

    ctx.beginPath();
    ctx.moveTo(pieCenterX, pieCenterY);
    ctx.arc(pieCenterX, pieCenterY, pieRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = pie.color;
    ctx.fill();

    pies[i] = pie;
    startAngle = endAngle;
  }

  currentGraph = 'pie';
}

//column graph

function createColumnGraph() {

  let xAxisSegment = 1820/(valuesSegment.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < valuesSegment.length; i++) {
    yAxisSegment = 725 - (650 * valuesSegment[i]);
    ctx.fillStyle = colors[i];

    ctx.fillRect(xAxisSegment + i * xAxisSegment, yAxisSegment,
     columnWidth, (650 * valuesSegment[i]) - 1);

    valuesColumns[i] = [xAxisSegment + i * xAxisSegment, yAxisSegment,
      (650 * valuesSegment[i]) - 1, colors[i]];
  }

  currentGraph = 'column';
}

// point graph

function createPointGraph() {

  let xAxisSegment = 1820/(valuesSegment.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < valuesSegment.length; i++) {
    yAxisSegment = 725 - (650 * valuesSegment[i]);
    const point = new Point(i, xAxisSegment + i * xAxisSegment, yAxisSegment);

    ctx.beginPath();
    ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
    ctx.fill();

    points[i] = point;
  }

  currentGraph = 'point';
}

// line graph

function createLineGraph() {

  let xAxisSegment = 1820/(valuesSegment.length + 1);
  let yAxisSegment = 725 - (650 * valuesSegment[0]);
  ctx.beginPath();
  ctx.arc(xAxisSegment, yAxisSegment, 3, 0, 2 * Math.PI);
  ctx.fill();

  const point = new Point(0, xAxisSegment, yAxisSegment);
  points[0] = point;

  for (let i = 1; i < valuesSegment.length; i++) {

    yAxisSegment = 725 - (650 * valuesSegment[i]);
    const currentPoint = new Point(i, xAxisSegment + i * xAxisSegment, yAxisSegment);
    const previousPoint = points[i-1];

    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, pointRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.moveTo(previousPoint.x, previousPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    points[i] = currentPoint;
  }

  currentGraph = 'line';
}

// highlighting a column after user input

function highlightColumn(column) {
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 30;
  ctx.fillStyle = column[3];
  ctx.fillRect(column[0], column[1], columnWidth, column[2]);
}

// highlighting a part of pie graph after user input

function highlightPie(pie) {
  
  ctx.beginPath();
  ctx.arc(pieCenterX, pieCenterY, pieRadius, pie.startAngle, pie.endAngle);
  ctx.lineTo(pieCenterX, pieCenterY);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(pieCenterX + 20, pieCenterY + 20, pieRadius, pie.startAngle, pie.endAngle);
  ctx.lineTo(pieCenterX, pieCenterY);
  ctx.closePath();
  ctx.fillStyle = pie.color;
  ctx.fill();
}

// highlighting point

function highlightPoint(point) {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(point.x, point.y, 2 * pointRadius, 0, 2 * Math.PI);
  ctx.fill();
}