// this worker deals only with dead cells adjacent to live cells, it's more effective than going through the whole array and checking each cell


self.onmessage = function(event) {

    const [cells, aliveCells] = event.data;
    let deadCells = [];
    let newAliveCells = [];

    for (let i = 0; i < aliveCells.length; i++) {

        const x = aliveCells[i].x;
        const y = aliveCells[i].y;

        if (!cells[x-1, y].state) {
            deadCells.push(cells[x-1, y]);
        }
        if (!cells[x-1, y-1].state) {
            deadCells.push(cells[x-1, y-1]);
        }
        if (!cells[x-1, y+1].state) {
            deadCells.push(cells[x-1, y+1]);
        }
        if (!cells[x, y-1].state) {
            deadCells.push(cells[x, y-1]);
        }
        if (!cells[x, y+1].state) {
            deadCells.push(cells[x, y+1]);
        }
        if (!cells[x+1, y].state) {
            deadCells.push(cells[x+1, y]);
        }
        if (!cells[x+1, y-1].state) {
            deadCells.push(cells[x+1, y-1]);
        }
        if (!cells[x+1, y+1].state) {
            deadCells.push(cells[x+1, y+1]);
        }
    }    

    
    newAliveCells = deadCells.filter((item) => {
        const count = deadCells.reduce((accumulator, currentValue) => {
          if (currentValue === item) {
            accumulator++;
          }
          return accumulator;
        }, 0);
      
        return count === 3;
      });

    self.postMessage(newAliveCells);
};