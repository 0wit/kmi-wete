// this worker deals only with dead cells adjacent to live cells, it's more effective than going through the whole array and checking each cell

self.onmessage = function (event) {

    const workerData = event.data;
    const cells = workerData.cells;
    const aliveCells = workerData.aliveCells;
    let deadCells = [];
    let newAliveCells = [];
  
    for (let i = 0; i < aliveCells.length; i++) {
      const x = aliveCells[i].x;
      const y = aliveCells[i].y;
  
      if (!cells[x - 1][y].state) {
        deadCells.push(cells[x - 1][y]);
      }
      if (!cells[x - 1][y - 1].state) {
        deadCells.push(cells[x - 1][y - 1]);
      }
      if (!cells[x - 1][y + 1].state) {
        deadCells.push(cells[x - 1][y + 1]);
      }
      if (!cells[x][y - 1].state) {
        deadCells.push(cells[x][y - 1]);
      }
      if (!cells[x] [y + 1].state) {
        deadCells.push(cells[x] [y + 1]);
      }
      if (!cells[x + 1][y].state) {
        deadCells.push(cells[x + 1][y]);
      }
      if (!cells[x + 1][y - 1].state) {
        deadCells.push(cells[x + 1][y - 1]);
      }
      if (!cells[x + 1][y + 1].state) {
        deadCells.push(cells[x + 1][y + 1]);
      }
    }
  
    // if the neighbouring cells are in the array 3x it comes alive
    newAliveCells = deadCells.filter((item) => {
      const count = deadCells.reduce((accumulator, currentValue) => {
        if (currentValue === item) {
          accumulator++;
        }
        return accumulator;
      }, 0);
  
      return count === 3;
    });
  
    // filter the resulting array
    newAliveCells = newAliveCells.filter((element, index) => {
        return newAliveCells.indexOf(element) === index;
      });
      
    self.postMessage(newAliveCells);
};
