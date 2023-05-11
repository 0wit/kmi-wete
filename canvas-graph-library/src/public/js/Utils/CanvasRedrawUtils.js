// store and redraw canvas

let canvasData;

export function storeCurrentCanvas(ctx) {
  canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function redrawPreviousCanvas(ctx) {
  ctx.putImageData(canvasData, 0, 0);
}