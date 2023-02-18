import {Pie} from './Pie.js';

// general variables 

let total = 0;
let length = 0;
let colors = [];
let valuesSegment = [];
let ctx;
let currentGraph = "";

// column variables

let columnWidth = 100;
let columnLimit = 15;
let fullAngle = 2 * Math.PI;
let maxValue = 0;
let valuesColumns = [];

// pie variables

let pies = [];

// starting function

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", mouseDown(4, 7, 5, 6), false);
  //canvas.addEventListener("mousedown", mouseDown(4, 7, 18, 16, 31, 23, 8, 12, 41, 4, 7, 18, 16, 31), false);
}

window.addEventListener("load", init, false);

// generating random colors for graphs

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function currently used for testing

function mouseDown(...values) {
  values = processValues(values);
  //createGraphOrigin();
  //createGraphName("First quater statistics")
  //createColumnGraph(values)
  createPieGraph(values);
  //createPointGraph(values);
  //createLineGraph(values)
  //createGraphLegend("alpha", "beta", "gamma", "delta");
  //highlightColumn(valuesColumns[0]);
  highlightPie(pies[0])
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

  if (values.length > columnLimit) {
    columnWidth = columnWidth/Math.floor((values.length / columnLimit) + 1);
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

//pie graph

function createPieGraph(values) {
  let startAngle = 0;
  let endAngle;

  for (let i = 0; i < values.length; i++) {
    endAngle = startAngle + values[i] * fullAngle;
    const pie = new Pie(i, startAngle, endAngle, colors[i]);
    
    ctx.beginPath();
    ctx.arc(960, 400, 300, pie.startAngle, pie.endAngle);
    ctx.lineTo(960, 400);
    ctx.closePath();
    ctx.fillStyle = pie.color;
    ctx.fill();

    pies[i] = pie;
    startAngle = endAngle;
  }

  currentGraph = "pie";
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

  currentGraph = "column";
}

// point graph

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

  currentGraph = "point";
}

// line graph

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

  currentGraph = "line";
}

// graph name

function createGraphName(name) {
  ctx.font = "30px Arial";
  ctx.fillText(name, 760, 50); 
}

// graph legend (TODO add lines)

function createGraphLegend(...valueNames) {

  let currentLegendWidth = 100;
  let currentLegendHeight = 760;

  for (let i = 0; i < valueNames.length; i++) {
    ctx.beginPath();
    ctx.rect(currentLegendWidth, currentLegendHeight, 10, 10);
    ctx.fillStyle = colors[i];
    ctx.fill(); 
    ctx.strokeRect(currentLegendWidth, currentLegendHeight, 11, 11);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = '#000000';
    ctx.fillText(valueNames[i], currentLegendWidth + 15, currentLegendHeight + 10);
    currentLegendWidth += 100; 
  }
}

// highlighting a column after user input

function highlightColumn(column) {
  ctx.shadowColor = "black";
  ctx.shadowBlur = 30;
  ctx.fillStyle = column[3];
  ctx.fillRect(column[0], column[1], columnWidth, column[2]);
}

// highlighting a part of pie graph after user input

function highlightPie(pie) {
  ctx.beginPath();
  ctx.arc(960, 400, 300, pie.startAngle, pie.endAngle);
  ctx.lineTo(960, 400);
  ctx.closePath();
  ctx.fillStyle = pie.color;
  ctx.fill();
}