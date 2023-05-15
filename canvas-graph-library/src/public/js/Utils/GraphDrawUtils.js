import {Pie} from '../Objects/Pie.js';
import {Point} from '../Objects/Point.js';
import {Column} from '../Objects/Column.js';

// drawing the pie graph type

export function drawPieGraph(ctx, valuesPies, colors, pieCenterX, pieCenterY, pieRadius) {
    let startAngle = 0;
    let endAngle;
    let pies = [];
  
    for (let i = 0; i < valuesPies.length; i++) {
      endAngle = startAngle + valuesPies[i] * (Math.PI * 2);
      const pie = new Pie(i, startAngle, endAngle, colors[i], false);
  
      ctx.beginPath();
      ctx.moveTo(pieCenterX, pieCenterY);
      ctx.arc(pieCenterX, pieCenterY, pieRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = pie.color;
      ctx.fill();
  
      pies[i] = pie;
      startAngle = endAngle;
    }
  
    //currentGraph = 'pie';

    return pies;
}

// drawing the column graph type

export function drawColumnGraph(ctx, valuesSegment, colors, columnWidth) {

    let xAxisSegment = 1710/valuesSegment.length;
    let columns = [];
    let topLeftCornerX;
    let topLeftCornerY;
    let height;
  
    for (let i = 0; i < valuesSegment.length; i++) {

      topLeftCornerX = 125 + i * xAxisSegment;
      topLeftCornerY = 725 - (650 * valuesSegment[i]);
      height = (650 * valuesSegment[i]) - 1;      
      ctx.fillStyle = colors[i]; 
      ctx.fillRect(topLeftCornerX, topLeftCornerY, columnWidth, height); //-1 is for the y line of graph
      columns[i] = new Column(topLeftCornerX, topLeftCornerY, columnWidth, height, colors[i], false);
    }

    return columns;
}

// drawing the point graph type

export function drawPointGraph(ctx, valuesSegment, pointRadius, colors) {

    let xAxisSegment = 1820/(valuesSegment.length + 1);
    let yAxisSegment = 0;
    let points = [];
  
    for (let i = 0; i < valuesSegment.length; i++) {
      yAxisSegment = 725 - (650 * valuesSegment[i]);
      const point = new Point(i, xAxisSegment + i * xAxisSegment, yAxisSegment, false);
  
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i];
      ctx.fill();
  
      points[i] = point;
    }

    return points;
}

// drawing the line graph type

export function drawLineGraph(ctx, valuesSegment, pointRadius) {

    let xAxisSegment = 1820/(valuesSegment.length + 1);
    let yAxisSegment = 725 - (650 * valuesSegment[0]);
    let points = [];

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

    return points;
  }
