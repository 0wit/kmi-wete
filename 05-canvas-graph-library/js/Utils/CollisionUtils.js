// check if clicked point coordinates are in the rectangle

export function checkColumns(x, y, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (x >= column.x && x <= column.x + column.width && y >= column.y && y <= column.y + column.height) {
        return i;
      }
    }
    return "none";
}

 // distance of clicked point is / is not within circle radius and in the specific part of the whole circle (maths, maths and maths)

function isInPie(x, y, pie, pieCenterX, pieCenterY) {
    let angle = Math.atan2(y - pieCenterY, x - pieCenterX);
    if (angle < 0) {
        angle += 2 * Math.PI; // convert negative angles to positive
    }    
    return angle >= pie.startAngle && angle <= pie.endAngle;    
}

export function checkPies(x, y, pies, pieCenterX, pieCenterY, pieRadius) {
    for (let i = 0; i < pies.length; i++) {
      const pie = pies[i];
      if (Math.sqrt(Math.pow(x - pieCenterX, 2) + Math.pow(y - pieCenterY, 2)) <= pieRadius && isInPie(x, y, pie, pieCenterX, pieCenterY)) {
        return i;
      }
    }
    return "none";
}

export function checkPoints(x, y, points, pointRadius) {
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)) <= pointRadius * 2) {
      return i;
    }
  }
  return "none";
}