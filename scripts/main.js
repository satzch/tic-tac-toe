const body = document.querySelector("body");
const board = document.querySelector("#board");
const cells = document.getElementsByClassName("cell");

// console.log(board.style)

console.log(cells)

for (let cell of cells) {
    cell.addEventListener('click', (e) => {
        console.log(cell)
        cell.innerHTML = "<h2>O</h2>"
    })
}