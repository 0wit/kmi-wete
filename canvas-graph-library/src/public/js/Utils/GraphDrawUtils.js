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
