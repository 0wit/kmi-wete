// highlighting a column after user input

export function highlightColumn(ctx, column) {
    ctx.save();
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 30;
    ctx.fillStyle = column.color;
    ctx.fillRect(column.x, column.y, column.width, column.height);
    ctx.restore();
}

// highlighting a part of pie graph after user input

export function highlightPie(ctx, pie, pieCenterX, pieCenterY, pieRadius) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(pieCenterX, pieCenterY, pieRadius, pie.startAngle, pie.endAngle);
  ctx.lineTo(pieCenterX, pieCenterY);
  ctx.closePath();
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(pieCenterX, pieCenterY, pieRadius, pie.startAngle, pie.endAngle);
  ctx.lineTo(pieCenterX, pieCenterY);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Set shadow color
  ctx.shadowBlur = 50; // Set shadow blur radius
  ctx.fill();

  ctx.restore();
}