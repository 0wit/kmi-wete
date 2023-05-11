// creates graph origin (not used in pie graph)

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