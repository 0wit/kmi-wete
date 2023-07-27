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

![columns_few_values](https://github.com/0wit/kmi-wete/assets/61089322/10464006-b470-4e00-b2bc-75bc93f9f250)
![columns_normal_values](https://github.com/0wit/kmi-wete/assets/61089322/c0151443-3950-46ba-ac35-cd9a6fe26847)
![columns_many_values](https://github.com/0wit/kmi-wete/assets/61089322/b5debafa-1bf8-429a-957c-f26ec57cf6ac)


There is also an option for highliting specific values. To do that click on column/part of pie/point you want to highlight.
To clear highlights click on previously highlighted value. This clears all highlighted values.

columns are highlighted using black shadow
pie parts are highlighted using bright red with small shadow
points are highlighted using bright red and their size increases

Images of highlighted values:

![columns_highlighted](https://github.com/0wit/kmi-wete/assets/61089322/120329b1-a364-4286-9195-2a1630ffe484)
![pies_highlighted](https://github.com/0wit/kmi-wete/assets/61089322/2c9f2574-0d2d-45af-ae37-dd987b1801c8)
![points_highlighted](https://github.com/0wit/kmi-wete/assets/61089322/9faf6d39-fcc8-49d4-a627-e2745172d3e3)
![lines_highlighted](https://github.com/0wit/kmi-wete/assets/61089322/f55e39cd-529c-4240-8719-b058e6b8c484)
