// Select color input
// Select size input
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM LOADED');
});
const form = document.getElementById('sizePicker');
form.addEventListener('submit',function(){
    event.preventDefault();
    makeGrid();
});
// When size is submitted by the user, call makeGrid()



function makeGrid() {

let table = document.getElementById('pixelCanvas');
let tableHeight = document.getElementById('inputHeight').value;
let tableWidth = document.getElementById('inputWidth').value;

    table.innerHTML = "";
        for(let i = 0; i < tableHeight;i++){
        let row = document.createElement('tr');
        let cell = "<td></td>";
        row.innerHTML = cell.repeat(tableWidth);
        table.appendChild(row);
        }
    table.addEventListener('click',recolor);
    table.addEventListener('dblclick',erase);
}
function erase(evt){
    let target = evt.target;
    target.style.backgroundColor = "#ffffff";
}
function recolor(evt){
    let target = evt.target;
    let color = document.getElementById('colorPicker').value;
    if((evt.target.nodeName !== "TR" ) && (evt.target.nodeName !== "TABLE")) {
        target.style.backgroundColor = color;
    }
}