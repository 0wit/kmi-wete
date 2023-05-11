import {Pie} from './Objects/Pie.js';
import {Point} from './Objects/Point.js';
import * as redrawUtils from './Utils/RedrawUtils.js';

// general variables 

let total = 0;
let length = 0;
let colors = [];
let valuesSegment = [];
let ctx;
let currentGraph = '';
let canvasData;

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
  button.addEventListener('click', testingFunction('4', '7', '18', '16', '31', '23', '8', '12', '41', '4', '7', '18', '16', '31', '4', '7', '18', '16', '31', '23', '8', '12', '41', '4', '7', '18', '16', '31'), false);
}

window.addEventListener('load', init, false);

// generating random colors for graphs

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function currently used for testing

function testingFunction(...values) {
  values = processValues(values);

  // legend has to be first, because graph is redrawn

  createGraphLegend(...values);
  createGraphOrigin();
  createGraphName('First quater statistics')
  createColumnGraph(values)
  //createPieGraph(values);
  //createPointGraph(values);
  //createLineGraph(values)highlightColumn(valuesColumns[0]);
  //highlightPie(pies[0])
  //highlightPoint(points[1]);
}

// creates graph origin (not used in pie graph)

function createGraphOrigin() {
  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.lineTo(100, 725);
  ctx.stroke();
  ctx.lineTo(1820, 725);
  ctx.stroke();
  ctx.closePath();
}

// setting up variables

function processValues(values) {
  total = values.reduce((a, b) => a + b, 0);
  length = values.length;

  // counting width of columns based of the number of columns that user passed to function 

  if (length > columnLimit) {
    columnWidth = columnWidth/Math.floor((length / columnLimit) + 1);
  }

  // in order to get proper size and lengths of objects that are drawn on canvas, we need to know
  // how big the current drawn object is relative to the biggest object (columns and points) and total (pies) 

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

//pie graph

function createPieGraph(values) {
  let startAngle = 0;
  let endAngle;

  for (let i = 0; i < values.length; i++) {
    endAngle = startAngle + values[i] * fullAngle;
    const pie = new Pie(i, startAngle, endAngle, colors[i]);
    
    ctx.beginPath();
    ctx.arc(pieCenterX, pieCenterY, pieRadius, pie.startAngle, pie.endAngle);
    ctx.lineTo(pieCenterX, pieCenterY);
    ctx.closePath();
    ctx.fillStyle = pie.color;
    ctx.fill();

    pies[i] = pie;
    startAngle = endAngle;
  }

  currentGraph = 'pie';
}

//column graph

function createColumnGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < values.length; i++) {
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

function createPointGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 0;

  for (let i = 0; i < values.length; i++) {
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

function createLineGraph(values) {

  let xAxisSegment = 1820/(values.length + 1);
  let yAxisSegment = 725 - (650 * valuesSegment[0]);
  ctx.beginPath();
  ctx.arc(xAxisSegment, yAxisSegment, 3, 0, 2 * Math.PI);
  ctx.fill();

  const point = new Point(0, xAxisSegment, yAxisSegment);
  points[0] = point;

  for (let i = 1; i < values.length; i++) {

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

// graph name

function createGraphName(name) {
  ctx.font = '30px Arial';
  ctx.fillText(name, 760, 50); 
}

// graph legend (TODO add lines)

function createGraphLegend(...valueNames) {

  let currentLegendWidth = 100;
  let currentLegendHeight = 710;

  for (let i = 0; i < valueNames.length; i++) {

    // when number of objects is too high, store current canvas, make new one, taller and then redraw everything

    if (i % columnLimit == 0)
    {
      redrawUtils.storeCurrentCanvas(ctx);
      currentLegendWidth = 100;
      currentLegendHeight = currentLegendHeight + 50;
      ctx.canvas.height += 50;
      redrawUtils.redrawPreviousCanvas(ctx);
    }

    // draw legend object, text + square

    ctx.beginPath();
    ctx.rect(currentLegendWidth, currentLegendHeight, 10, 10);
    ctx.fillStyle = colors[i];
    ctx.fill(); 
    ctx.strokeRect(currentLegendWidth, currentLegendHeight, 11, 11);
    ctx.stroke();
    ctx.font = '10px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(valueNames[i], currentLegendWidth + 15, currentLegendHeight + 10);
    currentLegendWidth += 120; 
  }
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