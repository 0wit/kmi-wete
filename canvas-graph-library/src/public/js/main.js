import * as elementUtils from './Utils/ElementsUtils.js';
import * as otherUtils from './Utils/OtherUtils.js';
import * as graphUtils from './Utils/GraphDrawUtils.js';
import * as highlightUtils from './Utils/HighlightUtils.js';
import * as collisionUtils from './Utils/CollisionUtils.js';


// general variables
let ctx;
let colors = [];
let currentGraph = 'column';

// pie variables
let pies = [];
let valuesPies = [];
const pieCenterX = 960;
const pieCenterY = 400;
const pieRadius = 300;

// column variables
let columns = [];
let valuesSegment = [];
let columnLimit = 15;
let columnWidth = 100;

// point + line variables
let points = [];
const pointRadius = 3;


// starting function

window.addEventListener('load', init, false);
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.addEventListener('click', function(evt) {
    const cRect = canvas.getBoundingClientRect();
    const canvasX = Math.round(evt.clientX - cRect.left);
    const canvasY = Math.round(evt.clientY - cRect.top);
    console.log(cRect.left+ "+"+ cRect.top) 
    checkCollisions(canvasX, canvasY);
  });
  const button = document.querySelector("button");
  //button.addEventListener('click', testingFunction('24', '7', '16' , '11', '24', '7', '16', '24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16', '24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16','24', '7', '16' , '11', '24', '7', '16'), false);
  button.addEventListener('click', testingFunction('24', '7', '16' , '11', '24', '7'), false);
}

// setting up variables

function processValues(values) {

  // forcing data type to number
  const total = values.map(Number).reduce((a, b) => a + b, 0);
  const length = values.length;
  const maxValue = Math.max.apply(Math, values);

  // counting width of columns based of the number of columns that user passed to function 
  if (length > columnLimit) {
    columnWidth = columnWidth/Math.floor((length / columnLimit) + 1);
  }

  // in order to get proper size and lengths of objects that are drawn on canvas, we need to know
  // how big the current drawn object is relative to the biggest object (columns and points) and total (pies) 

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
  elementUtils.drawGraphLegend(ctx, colors, ...values);
  elementUtils.drawGraphOrigin(ctx);
  elementUtils.drawGraphName(ctx, 'First quater statistics')

  //pies = graphUtils.drawPieGraph(ctx, valuesPies, colors);
  columns = graphUtils.drawColumnGraph(ctx, valuesSegment, colors, columnWidth);
  //points = graphUtils.drawPointGraph(ctx, valuesSegment, pointRadius);
  //points = graphUtils.drawLineGraph(ctx, valuesSegment, pointRadius);
  //highlightPie(pies[0])
  //highlightUtils.highlightColumn(ctx, columns[0], colors[0]);
  //highlightPoint(points[1]);
}

// check where user has clicked

function checkCollisions(x, y) {
  switch(currentGraph) {
      case 'pie':
      // code block
        break;
      case 'column':
        collisionUtils.checkColumns(x, y, columns);
        break;
      case 'point':
      // code block
        break;
      default:
    } 
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