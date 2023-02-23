let worker;
let stopped = true;
let cells = [];
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

function start() {
  if (typeof Worker !== "undefined") {
    if (typeof worker == "undefined") {
      worker = new Worker("demo_workers.js");
    }
    worker.onmessage = function (event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML =
      "Sorry! No Web Worker support.";
  }
}

function stop() {
  worker.terminate();
  worker = undefined;
}

function reset() {
  worker.terminate();
  worker = undefined;
}

function changeCellState(canvas, e) {  
  const rect = canvas.getBoundingClientRect();
  let x = Math.floor((e.clientX - rect.left) / gameScale) * gameScale;
  let y = Math.floor((e.clientY - rect.top) / gameScale) * gameScale;

  const i = Math.floor(x / gameScale)
  const j = Math.floor(y / gameScale);
  
  cells[i][j].state = !cells[i][j].state;
  ctx.fillStyle = "black";

  if (!cells[i][j].state) {
    ctx.fillStyle = "white";
  }

  ctx.fillRect(x, y, 1 * gameScale, 1 * gameScale);  
}

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
  canvas.addEventListener("mousedown", function(e){changeCellState(canvas, e)});
  ctx = canvas.getContext('2d');
}

function step() {

  for (let i = 0; i < height/gameScale; i++)
  {
    for (let j = 0; j < width/gameScale; j++)
    {  
      aliveNeighbours = 0;

      if (cell[i-1, j].state){
        aliveNeighbours += 1;
      }
      if (cell[i+1, j].state){
        aliveNeighbours += 1;
      }
      if (cell[i, j-1].state){
        aliveNeighbours += 1;
      }
      if (cell[i, j+1].state){
        aliveNeighbours += 1;
      }
      
      if (aliveNeighbours < 2  || aliveNeighbours > 3) {
        ctx.fillStyle = "white";
        cells[i][j].state = false;
      }

      if (!cells[i][j].state && aliveNeighbours == 3) {
        ctx.fillStyle = "black";
        cells[i][j].state = true;
      }
      
      ctx.fillRect(i, j, 1, 1);      
    }
  }
}

init();