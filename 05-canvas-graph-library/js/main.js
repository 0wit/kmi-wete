import * as elementUtils from "./Utils/ElementsUtils.js";
import * as otherUtils from "./Utils/OtherUtils.js";
import * as graphUtils from "./Utils/GraphDrawUtils.js";
import * as highlightUtils from "./Utils/HighlightUtils.js";
import * as collisionUtils from "./Utils/CollisionUtils.js";

// general variables
let ctx;
let colors = [];
let graphType = "point";

// graph description variables
let graphName;
let graphLegend;
let graphOrigin;
let savedValues;

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
const pointRadius = 4;

// starting function
export function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // listening for mouse click for higlighting values
  canvas.addEventListener("click", function (evt) {
    const cRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / cRect.width; // relationship bitmap vs. element for x
    const scaleY = canvas.height / cRect.height; // relationship bitmap vs. element for y
    const canvasX = Math.round((evt.clientX - cRect.left) * scaleX);
    const canvasY = Math.round((evt.clientY - cRect.top) * scaleY);
    checkCollisions(canvasX, canvasY);
  });
}

// setting up variables
function processValues(values) {
  savedValues = values;
  // forcing data type to number
  const total = values.map(Number).reduce((a, b) => a + b, 0);
  const length = values.length;
  const maxValue = Math.max.apply(Math, values);

  // counting width of columns based of the number of columns that user passed to function
  if (length > columnLimit) {
    columnWidth = columnWidth / Math.floor(length / columnLimit + 1);
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

// function used to draw and redraw graph elements
function drawGraphElements() {
  // legend has to be drawn first, because graph is redrawn
  if (graphLegend) {
    elementUtils.drawGraphLegend(ctx, colors, ...savedValues);
  }

  if (graphOrigin) {
    elementUtils.drawGraphOrigin(ctx);
  }

  if (graphName) {
    elementUtils.drawGraphName(ctx, "First quater statistics");
  }
}

// function used to draw graph of selected type

export function drawGraph(legend, origin, name, selectedGraph, ...values) {
  processValues(values);
  graphLegend = legend;
  graphOrigin = origin;
  graphName = name;
  graphType = selectedGraph;
  drawGraphElements();

  switch (graphType) {
    case "pie":
      pies = graphUtils.drawPieGraph(
        ctx,
        valuesPies,
        colors,
        pieCenterX,
        pieCenterY,
        pieRadius
      );
      break;
    case "column":
      columns = graphUtils.drawColumnGraph(
        ctx,
        valuesSegment,
        colors,
        columnWidth
      );
      break;
    case "point":
      points = graphUtils.drawPointGraph(
        ctx,
        valuesSegment,
        pointRadius,
        colors
      );
      break;
    case "line":
      points = graphUtils.drawLineGraph(
        ctx,
        valuesSegment,
        pointRadius,
        colors
      );
      break;
    default:
      break;
  }
}

// check where user has clicked

function checkCollisions(x, y) {
  switch (graphType) {
    case "pie":
      const pieIndex = collisionUtils.checkPies(
        x,
        y,
        pies,
        pieCenterX,
        pieCenterY,
        pieRadius
      );
      if (pieIndex != "none") {
        console.log(pieIndex);
        pies[pieIndex].highlighted = !pies[pieIndex].highlighted;
        if (pies[pieIndex].highlighted) {
          highlightUtils.highlightPie(
            ctx,
            pies[pieIndex],
            pieCenterX,
            pieCenterY,
            pieRadius
          );
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          pies = graphUtils.drawPieGraph(
            ctx,
            valuesPies,
            colors,
            pieCenterX,
            pieCenterY,
            pieRadius
          );
          drawGraphElements();
        }
      }
      break;
    case "column":
      const columnIndex = collisionUtils.checkColumns(x, y, columns);
      if (columnIndex != "none") {
        columns[columnIndex].highlighted = !columns[columnIndex].highlighted;
        if (columns[columnIndex].highlighted) {
          highlightUtils.highlightColumn(ctx, columns[columnIndex]);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          columns = graphUtils.drawColumnGraph(
            ctx,
            valuesSegment,
            colors,
            columnWidth
          );
          drawGraphElements();
        }
      }
      break;
    case "line":
    case "point":
      const pointIndex = collisionUtils.checkPoints(x, y, points, pointRadius);
      console.log(pointIndex);
      if (pointIndex != "none") {
        points[pointIndex].highlighted = !points[pointIndex].highlighted;
        if (points[pointIndex].highlighted) {
          highlightUtils.highlightPoint(ctx, points[pointIndex], pointRadius);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          points = graphUtils.drawPointGraph(
            ctx,
            valuesSegment,
            pointRadius,
            colors
          );
          drawGraphElements();
        }
      }
      break;
    default:
      break;
  }
}
