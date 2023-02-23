let w;
let stopped = true;
let cells = [];
let height = 800;
let width = 800;

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

function changeCellState(canvas, e) {  
  const rect = canvas.getBoundingClientRect();
  scaleX = canvas.width / rect.width,
  scaleY = canvas.height / rect.height;
  x = Math.round((e.clientX - rect.left) * scaleX);
  y = Math.round((e.clientY - rect.top) * scaleY);

  i = x;
  j = y;

  console.log(cells[i][j]);
  
  cells[i][j] = !cells[i][j];
  ctx.fillStyle = "black";

  console.log(cells[i][j]);

  if (!cells[i][j]) {
    ctx.fillStyle = "white";
  }

  ctx.beginPath();
  ctx.fillRect(i, j, 1, 1);
  
}

function init() {

  for (let i = 0; i < height; i++)
  {
    cells[i] = [];
    for (let j = 0; j < width; j++)
    {
      cells[i][j] = false;
    }
  }
  canvas = document.getElementById('canvas');
  canvas.addEventListener("mousedown", function(e){changeCellState(canvas, e)});
  ctx = canvas.getContext('2d');
}

function step() {

  for (let i = 5; i < height; i++)
  {
    for (let j = 5; j < width; j++)
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
        cells[i][j] = true;
      }
      
      ctx.fillRect(i, j, 1, 1);      
    }
  }
}

init();