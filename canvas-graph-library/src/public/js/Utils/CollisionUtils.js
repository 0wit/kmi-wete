export function checkColumns(x, y, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (x >= column.x && x <= column.x + column.width && y >= column.y && y <= column.y + column.height) {
        return i;
      }
    }
    return "none";
  }