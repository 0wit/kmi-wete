// highlighting a column after user input
// highlights it with black shadow

export function highlightColumn(ctx, column) {
    ctx.save();
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 30;
    ctx.fillStyle = column.color;
    ctx.fillRect(column.x, column.y, column.width, column.height);
    ctx.restore();
}

// highlighting a part of pie graph after user input
// highlights the part with red color and makes it bigger

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

// highlighting point, higlights point red and makes it bigger
// same for point and line graphs

export function highlightPoint(ctx, point, pointRadius) {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(point.x, point.y, 1.5 * pointRadius, 0, 2 * Math.PI);
  ctx.fill();
}