import { init, drawGraph } from './js/main.js';
window.addEventListener('load', () => {
    init();
    drawGraph(true, true, true, "column", '24', '7', '16', '11', '24', '7');
  });