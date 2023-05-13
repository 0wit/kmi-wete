export function checkColumns(x, y, columns) {
    console.log(x + " and " + y);
    columns.forEach(column => {
        console.log("x: " + column.x + " y: " + column.y + " width: " + column.width + " height " + column.height);
        if (x >= column.x && x <= column.x + column.width && y >= column.y && y <= column.y + column.height) {
            console.log("bingo");
        }        
    });
}