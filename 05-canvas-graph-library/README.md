Developed using live-server VSCode extension. (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a web technologies course on UPOL in 2022/2023.

To test the library use:
npm install -g live-server

Then run this command in cmd in the folder with index.html with administrator rights:
live-server

To test the library it's best to use provided function and styles. Everything is of course adjustable to your current needs.
Main function to draw graph is in index.js that also serves as a test file.
drawGraph takes 6 arguments:

drawGraph(isGraphLegendVisible, isGraphOriginVisible, isGraphNameVisible
           typeOfGraph, values, graphName)

isGraphLegendVisible - boolean according to which a legend is drawn
isGraphOriginVisible - boolean  according to which a graph's origin is drawn (lines)
isGraphNameVisible   - boolean according to which a graph's name is drawn
typeOfGraph          - string that can have 4 values that correlates with a type of graph you want to drawn
                     - possible values: column, pie, point, line

Graph is also semi-responsive, that means I tried to make the values and corresponding legend as responsive as I can even for many values, see images.
I think I quite succeeded and am proud of that. :D

There is also an option for highliting specific values. To do that click on column/part of pie/point you want to highlight.
To clear highlights click on previously highlighted value. This clears all highlighted values.

columns are highlighted using black shadow
pie parts are highlighted using bright red with small shadow
points are highlighted using bright red and their size increases

Images of highlighted values: