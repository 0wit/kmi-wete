let cells = [];
let aliveCells = [];
let ctx;
const gameScale = 4
const height = 800;
const width = 800;

class Cell {
  constructor(x, y, size, state) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.state = state;
  }
}


// init function that sets the cells based on the desired height and width
function init() {

  for (let i = 0; i < (height/gameScale); i++)
  {
    cells[i] = [];
    for (let j = 0; j < (width/gameScale); j++)
    {
      cells[i][j] = new Cell(i, j, gameScale, false);
    }
  }
  canvas = document.getElementById('canvas');
  canvas.addEventListener("click", function(e){changeCellStateByClick(canvas, e)});
  ctx = canvas.getContext('2d');
}

// buttons' functions
function start() {
  const worker = new Worker('live_worker.js');
  worker.postMessage(aliveCells);
  worker.onmessage = function(event) {
    const result = event.data;
    console.log(result);
  }
}

function stop() {
  if (worker) {
    worker.terminate();
    worker = undefined;
  }
}

function reset() {
  if (worker) {
    worker.terminate();
    worker = undefined;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// cell has died, remove it from array
function removeAliveCell(cell) {
  for (let i = 0; i < aliveCells.length; i++) {
    const aliveCell = aliveCells[i];
    if (aliveCell === cell) {
      aliveCells.splice(i, 1);
      break;
    }
  }
}

// manually change state of a specific cell (by click of a mouse)
function changeCellStateByClick(canvas, e) {  
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor((e.clientX - rect.left) / gameScale) * gameScale;
  let y = Math.floor((e.clientY - rect.top) / gameScale) * gameScale;

  const i = Math.floor(x / gameScale)
  const j = Math.floor(y / gameScale);
  
  cells[i][j].state = !cells[i][j].state;

  if (cells[i][j].state) {
    ctx.fillStyle = "black";
    aliveCells.push(cells[i][j]);
  }

  else {
    ctx.fillStyle = "white";
    removeAliveCell(cells[i][j]);
  }

  ctx.fillRect(x, y, 1 * gameScale, 1 * gameScale);  
}

init();