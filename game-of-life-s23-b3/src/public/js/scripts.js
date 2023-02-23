import {Cell} from "./Cell.js";

let worker;
let stopped = true;
let cells = [];
let ctx;
const gameScale = 4
const gameBorder = 5;
const height = 800;
const width = 800;

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

  const i = Math.floor(x / gameScale) + gameBorder;
  const j = Math.floor(y / gameScale) + gameBorder;  
  
  cells[i][j].state = !cells[i][j].state;
  ctx.fillStyle = "black";

  if (!cells[i][j].state) {
    console.log(cells[i][j].state);
    ctx.fillStyle = "white";
  }

  ctx.fillRect(x, y, 1 * gameScale, 1 * gameScale);  
}

function init() {

  for (let i = 0; i < (height/gameScale) + gameBorder; i++)
  {
    cells[i] = [];
    for (let j = 0; j < (width/gameScale) + gameBorder; j++)
    {
      cells[i][j] = new Cell(i, j, gameScale, false);
    }
  }
  canvas = document.getElementById('canvas');
  canvas.addEventListener("mousedown", function(e){changeCellState(canvas, e)});
  ctx = canvas.getContext('2d');
}

function step() {

  for (let i = 0; i < height; i++)
  {
    for (let j = 0; j < width; j++)
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