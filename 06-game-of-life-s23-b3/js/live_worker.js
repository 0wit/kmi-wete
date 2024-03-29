// this worker deals with and county only live cells, it's more effective than going through the whole array and checking each cell

self.onmessage = function(event) {

  const aliveCells = event.data;  
  let newAliveCells = [];
  
  for (let i = 0; i < aliveCells.length; i++) {

    aliveCellsAround = 0;
    for (let j = 0; j < aliveCells.length; j++) {
      if (j != i) {
        const x = aliveCells[i].x;
        const y = aliveCells[i].y;
        const currentCell = aliveCells[j];

        if ((x == (currentCell.x - 1) && y == currentCell.y) ||
            (x == (currentCell.x - 1) && y == currentCell.y - 1) ||
            (x == (currentCell.x - 1) && y == currentCell.y + 1) ||
            (x == (currentCell.x) && y == currentCell.y - 1) ||
            (x == (currentCell.x) && y == currentCell.y + 1) ||
            (x == (currentCell.x + 1) && y == currentCell.y) ||
            (x == (currentCell.x + 1) && y == currentCell.y - 1) ||
            (x == (currentCell.x + 1) && y == currentCell.y + 1)) {
            aliveCellsAround += 1;                        
        }
      }        
    }

    if (aliveCellsAround == 2 || aliveCellsAround == 3) {
      newAliveCells.push(aliveCells[i]);
    }
  }
  
  self.postMessage(newAliveCells);
};