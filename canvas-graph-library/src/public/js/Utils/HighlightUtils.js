// highlighting a column after user input

export function highlightColumn(ctx, column) {
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 30;
    ctx.fillStyle = column.color;
    ctx.fillRect(column.x, column.y, column.width, column.height);
  }