import { init, drawGraph } from './js/main.js';
window.addEventListener('load', () => {
    init();
    drawGraph(true, true, true, "column", '24', '7', '16', '11', '24', '7');
    //drawGraph(true, true, true, "line", '24', '7', '16', '11', '19', '22', '5', '8', '14', '32', '17', '6', '28', '9', '3', '25', '12', '15', '2', '10', '31', '4', '13', '1', '23', '27', '30', '21', '18', '26', '29');
  });