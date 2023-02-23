let w;
let cells = [];
let height, width = 300 + 50;

function start() {
  if (typeof Worker !== "undefined") {
    if (typeof w == "undefined") {
      w = new Worker("demo_workers.js");
    }
    w.onmessage = function (event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML =
      "Sorry! No Web Worker support.";
  }
}

function stop() {
  w.terminate();
  w = undefined;
}

function init() {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  for (let i = 0; i < height; i++)
  {
    for (let j = 0; j < width; j++)
    {
      cells[i][j] = false;
    }
  }
}

function step() {

  for (let i = 1; i < height; i++)
  {
    for (let j = 1; j < width; j++)
    {  
      aliveNeighbours = 0;

      if (cell[i-1, j]){
        aliveNeighbours += 1;
      }
      if (cell[i+1, j]){
        aliveNeighbours += 1;
      }
      if (cell[i, j-1]){
        aliveNeighbours += 1;
      }
      if (cell[i, j+1]){
        aliveNeighbours += 1;
      }
      
      if (aliveNeighbours < 2  || aliveNeighbours > 3) {
        ctx.fillStyle = "white";
        cells[i][j] = false;
      }

      if (!cells[i][j] && aliveNeighbours == 3) {
        ctx.fillStyle = "black";
        cells[i][j] = true;
      }
      
      ctx.fillRect(i, j, 1, 1);      
    }
  }
}

init();