import * as elementUtils from './Utils/ElementsUtils.js';
import * as otherUtils from './Utils/OtherUtils.js';
import * as graphUtils from './Utils/GraphDrawUtils.js';
import * as highlightUtils from './Utils/HighlightUtils.js';
import * as collisionUtils from './Utils/CollisionUtils.js';


// general variables
let ctx;
let colors = [];
let currentGraph = 'pie';

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

  // listening for mouse click for higlighting values
  canvas.addEventListener('click', function(evt) {
    const cRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / cRect.width;    // relationship bitmap vs. element for x
    const scaleY = canvas.height / cRect.height;  // relationship bitmap vs. element for y
    const canvasX = Math.round((evt.clientX - cRect.left) * scaleX);
    const canvasY = Math.round((evt.clientY - cRect.top) * scaleY);
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

function drawGraphicsElements(...values) {
  // legend has to be drawn first, because graph is redrawn
  elementUtils.drawGraphLegend(ctx, colors, ...values);
  elementUtils.drawGraphOrigin(ctx);
  elementUtils.drawGraphName(ctx, 'First quater statistics')  
}

function testingFunction(...values) {

  processValues(values);
  //drawGraphicsElements(...values)

  pies = graphUtils.drawPieGraph(ctx, valuesPies, colors, pieCenterX, pieCenterY, pieRadius);
  //columns = graphUtils.drawColumnGraph(ctx, valuesSegment, colors, columnWidth);
  //points = graphUtils.drawPointGraph(ctx, valuesSegment, pointRadius);
  //points = graphUtils.drawLineGraph(ctx, valuesSegment, pointRadius);
  highlightUtils.highlightPie(ctx, pies[0], pieCenterX, pieCenterY, pieRadius)
  //highlightUtils.highlightColumn(ctx, columns[0], colors[0]);
  //highlightPoint(points[1]);
}

// check where user has clicked

function checkCollisions(x, y) {
  switch(currentGraph) {
      case 'pie':
        const pieIndex = collisionUtils.checkPies(x, y, pies, pieCenterX, pieCenterY, pieRadius);
        console.log(pieIndex);
        break;
      case 'column':
        const columnIndex = collisionUtils.checkColumns(x, y, columns);
        if (columnIndex != "none") {
          columns[columnIndex].highlighted = !columns[columnIndex].highlighted;
          if (columns[columnIndex].highlighted) {
            highlightUtils.highlightColumn(ctx, columns[columnIndex]);
          }
          else {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            columns = graphUtils.drawColumnGraph(ctx, valuesSegment, colors, columnWidth);
          }
        }
        break;
      case 'point':
      // code block
        break;
      default:
    } 
}

// highlighting point

function highlightPoint(point) {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(point.x, point.y, 2 * pointRadius, 0, 2 * Math.PI);
  ctx.fill();
}