import { Pie } from "../Objects/Pie.js";
import { Point } from "../Objects/Point.js";
import { Column } from "../Objects/Column.js";

// drawing the pie graph type

export function drawPieGraph(
  ctx,
  valuesPies,
  colors,
  pieCenterX,
  pieCenterY,
  pieRadius
) {
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

  return pies;
}

// drawing the column graph type

export function drawColumnGraph(ctx, valuesSegment, colors, columnWidth) {
  let xAxisSegment = 1710 / valuesSegment.length;
  let columns = [];
  let topLeftCornerX;
  let topLeftCornerY;
  let height;

  for (let i = 0; i < valuesSegment.length; i++) {
    topLeftCornerX = 125 + i * xAxisSegment;
    topLeftCornerY = 725 - 650 * valuesSegment[i];
    height = 650 * valuesSegment[i] - 1;
    ctx.fillStyle = colors[i];
    ctx.fillRect(topLeftCornerX, topLeftCornerY, columnWidth, height); //-1 is for the y line of graph
    columns[i] = new Column(
      topLeftCornerX,
      topLeftCornerY,
      columnWidth,
      height,
      colors[i],
      false
    );
  }

  return columns;
}

// drawing the point graph type

export function drawPointGraph(ctx, valuesSegment, pointRadius, colors) {
  let xAxisSegment = 1710 / valuesSegment.length;
  let xPoint;
  let yPoint;
  let points = [];

  for (let i = 0; i < valuesSegment.length; i++) {
    xPoint = 125 + i * xAxisSegment;
    yPoint = 725 - 650 * valuesSegment[i];

    const point = new Point(i, xPoint, yPoint, false);
    ctx.beginPath();
    ctx.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
    ctx.fillStyle = colors[i];
    ctx.fill();

    points[i] = point;
  }

  return points;
}

// drawing the line graph type

export function drawLineGraph(ctx, valuesSegment, pointRadius, colors) {
  let xAxisSegment = 1710 / valuesSegment.length;
  let yPoint;
  let yPointNext;
  let points = [];

  for (let i = 0; i < valuesSegment.length - 1; i++) {
    yPoint = 725 - 650 * valuesSegment[i];
    yPointNext = 725 - 650 * valuesSegment[i + 1];
    const currentPoint = new Point(i, 125 + i * xAxisSegment, yPoint, false);
    const nextPoint = new Point(
      i + 1,
      125 + (i + 1) * xAxisSegment,
      yPointNext,
      false
    );

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.arc(currentPoint.x, currentPoint.y, pointRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.moveTo(nextPoint.x, nextPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    points[i] = currentPoint;
  }

  const lastIndex = valuesSegment.length - 1;
  const lastPoint = new Point(
    lastIndex,
    125 + lastIndex * xAxisSegment,
    725 - 650 * valuesSegment[lastIndex],
    false
  );
  ctx.beginPath();
  ctx.arc(lastPoint.x, lastPoint.y, pointRadius, 0, 2 * Math.PI);
  ctx.fillStyle = colors[colors.length - 1];
  ctx.fill();

  return points;
}
