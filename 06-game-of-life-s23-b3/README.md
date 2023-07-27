Implementation of Game of Life with rules S23/B3 with moore neighborhood.
Developed using live-server VSCode extension. (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a web technologies course on UPOL in 2022/2023.

To test the library use:
npm install -g live-server

Then run this command in cmd in the folder with index.html with administrator rights:
live-server

Important notes about testing and the game:

I tried to make a personal twist on the formula. To test the game of life simply click anywhere on the canvas to make the cell alive, you can also use it to kill a cell.
After making your desired number of cells alive, press Start button to test the game and observe life of each cell. You can also Stop the game with a button and also Reset it.

The game is also scaled because one pixel for each cell was difficult to observe. Implemented scale is 4 pixels for one cell.
With some little work this scale can be lowered/increased.

By the algorithm's nature there won't be majority of cells alive therefore I decided to focus workers' work on the live cells.
(usage of workers is in task's description and therefore mandatory)
Cells that are alive are saved with their location and workers only check them and their surroundings. The rest of the canvas stays the same.
This method is (I think) better in all cases then going through the whole canvas.

Videos demonstrating the functionality:

https://github.com/0wit/kmi-wete/assets/61089322/505ad79b-44d4-4c0c-bfb3-c5a04135b656
https://github.com/0wit/kmi-wete/assets/61089322/f05cd2d7-3737-4ff5-b55a-5e8f85ffa2c2
