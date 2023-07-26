import * as canvasRedrawUtils from './CanvasRedrawUtils.js';

// creates graph origin (do not use in pie graph)

export function drawGraphOrigin(ctx) {
    ctx.beginPath();
    ctx.moveTo(100, 75);
    ctx.lineTo(100, 725);
    ctx.stroke();
    ctx.lineTo(1820, 725);
    ctx.stroke();
    ctx.closePath();
}

// create graph's name

export function drawGraphName(ctx, name) {
    ctx.font = '30px Arial';
    ctx.fillText(name, 760, 50); 
}

// graph legend

export function drawGraphLegend(ctx, colors, ...valueNames) {

  let currentLegendWidth = 100;
  let currentLegendHeight = 760;

  for (let i = 0; i < valueNames.length; i++) {

    // when number of objects is too high, store current canvas, make new one, taller and then redraw everything
    if (i + 1 % 16 == 0)
    {
      canvasRedrawUtils.storeCurrentCanvas(ctx);
      currentLegendWidth = 100;
      currentLegendHeight = currentLegendHeight + 50;
      ctx.canvas.height += 50;
      canvasRedrawUtils.redrawPreviousCanvas(ctx);
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