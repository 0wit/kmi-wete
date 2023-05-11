import {Pie} from '../Objects/Pie.js';
import {Point} from '../Objects/Point.js';

// drawing the pie graph type

const pieCenterX = 960;
const pieCenterY = 400;
const pieRadius = 300;

export function drawPieGraph(ctx, valuesPies, colors) {
    let startAngle = 0;
    let endAngle;
    let pies = [];
  
    for (let i = 0; i < valuesPies.length; i++) {
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
  
    //currentGraph = 'pie';

    return pies;
}

// drawing the column graph type

let columnWidth = 100;

export function drawColumnGraph(ctx, valuesSegment, colors) {

    let xAxisSegment = 1820/(valuesSegment.length + 1);
    let yAxisSegment = 0;
    let columns = []
  
    for (let i = 0; i < valuesSegment.length; i++) {
      yAxisSegment = 725 - (650 * valuesSegment[i]);
      ctx.fillStyle = colors[i];
  
      ctx.fillRect(xAxisSegment + i * xAxisSegment, yAxisSegment,
       columnWidth, (650 * valuesSegment[i]) - 1);
  
       columns[i] = [xAxisSegment + i * xAxisSegment, yAxisSegment,
        (650 * valuesSegment[i]) - 1, colors[i]];
    }
  
    //currentGraph = 'column';

    return columns;
}
