let liveWorker;
let deadWorker;
let cells = [];
let aliveCells = [];
let ctx;
const gameScale = 4;
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

// create a promise for a worker
function createWorkerPromise(worker, arrays) {
  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      resolve(event.data);
    };

    worker.onerror = (error) => {
      reject(error);
    };

    worker.postMessage(arrays);
  });
}

// init function that sets the cells based on the desired height and width
function init() {
  for (let i = 0; i < height / gameScale; i++) {
    cells[i] = [];
    for (let j = 0; j < width / gameScale; j++) {
      cells[i][j] = new Cell(i, j, gameScale, false);
    }
  }
  canvas = document.getElementById("canvas");
  canvas.addEventListener("click", function (e) {
    changeCellStateByClick(canvas, e);
  });
  ctx = canvas.getContext("2d");
}

function updateCells(newAliveCells) {
  const deadCells = aliveCells.filter((element) => !newAliveCells.includes(element));
  const bornCells = newAliveCells.filter((element) => !aliveCells.includes(element));
  let k;
  let l;

  for (let i = 0; i < deadCells.length; i++) {
    const x = deadCells[i].x;
    const y = deadCells[i].y;
    k = Math.ceil(x * gameScale);
    l = Math.ceil(y * gameScale);
    cells[x][y].state = cells[x][y].state = !cells[x][y].state;
    ctx.fillStyle = "white";
    ctx.fillRect(k, l, 1 * gameScale, 1 * gameScale);
  }

  for (let i = 0; i < bornCells.length; i++) {
    const x = bornCells[i].x;
    const y = bornCells[i].y;
    k = Math.ceil(x * gameScale);
    l = Math.ceil(y * gameScale);
    cells[x][y].state = cells[x][y].state = !cells[x][y].state;
    ctx.fillStyle = "black";
    ctx.fillRect(k, l, 1 * gameScale, 1 * gameScale);
  }

  aliveCells = newAliveCells;
}

// buttons' functions
function start() {
  liveWorker = new Worker("live_worker.js");
  deadWorker = new Worker("dead_worker.js");

  // const liveWorkerPromise = createWorkerPromise(liveWorker, aliveCells);
  // const deadWorkerPromise = createWorkerPromise(deadWorker, cells, aliveCells);

  // Promise.all([liveWorkerPromise, deadWorkerPromise])
  // .then((results) => {
  //   console.log('Workers finished:', results);
  // })
  // .catch((error) => {
  //   console.error('Error in workers:', error);
  // });

  let liveResult = [];
  let deadResult = [];

  liveWorker.postMessage(aliveCells);
  liveWorker.onmessage = function (event) {
    liveResult = event.data;
    console.log(liveResult);
  };

  const workerData = {
    cells: cells,
    aliveCells: aliveCells,
  };

  deadWorker.postMessage(workerData);
  deadWorker.onmessage = function (event) {
    deadResult = event.data;
    console.log(deadResult);
  };

  const resultArray = liveResult.concat(deadResult);

  updateCells(resultArray);
}

function stop() {
  if (liveWorker) {
    liveWorker.terminate();
    liveWorker = undefined;
  }
}

function reset() {
  if (liveWorker) {
    liveWorker.terminate();
    liveWorker = undefined;
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

  const i = Math.floor(x / gameScale);
  const j = Math.floor(y / gameScale);

  cells[i][j].state = !cells[i][j].state;

  if (cells[i][j].state) {
    ctx.fillStyle = "black";
    aliveCells.push(cells[i][j]);
  } else {
    ctx.fillStyle = "white";
    removeAliveCell(cells[i][j]);
  }

  ctx.fillRect(x, y, 1 * gameScale, 1 * gameScale);
}

init();
