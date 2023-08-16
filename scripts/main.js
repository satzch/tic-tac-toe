const body = document.querySelector("body");
const board = document.querySelector("#board");
const cells = document.getElementsByClassName("cell");
const infoBox = document.querySelector(".info-box");
const mainMenu = document.querySelector('.main-menu');
const playButton = document.querySelector("play-button");

// console.log(board)

// console.log(cells)

let GAME_MODE;

// checks contains the cells to check for match
// there are total 8 possible ways to win, checks contains each
const checks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], 
                [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// checks_for_cell are the checks required by that cell
// index indicates the cell number
const checks_for_cell = [[0, 3, 6], [0, 4], [0, 5, 7], [1, 3], [1, 4, 6, 7],
                [1, 5], [2, 3, 7], [2, 4], [2, 5, 6]];

for (let cell of cells) {
    cell.classList.add("hidden")
}

function startGame() {
    mainMenu.classList.add("hidden")
    for (let cell of cells) {
        cell.classList.remove("hidden")
    }
}
// startGame()

function cellValue(i) {
    return cells[i].innerText
}

function checkLine(i) {
    let a = checks[i]

    if (cellValue(a[0]) == cellValue(a[1]) && cellValue(a[0]) == cellValue(a[2])) {
        console.log(a)
        return true
    }
    
    return false
}

function checkWin(id) {
    let checks_required = checks_for_cell[id]
    // console.log("checks_requird", checks_required)

    for (let i of checks_required ) {
        // console.log(i)
        if (checkLine(i)) return true
    }
    return false
}

playButton.addEventListener("click", () => {
    startGame()
})

turn = "O"
for (let cell of cells) {
    cell.addEventListener('click', (e) => {
        // console.log(cell)
        if (turn == "O") {
            turn = "X"
        } else {
            turn = "O"
        }
        if(cell.innerHTML) {
            cell.innerHTML = ""
        } else {
            cell.innerHTML = `<h2>${turn}</h2>`
            cell.style = "background-color: #eee"
        }
        
        if (checkWin(cell.id[cell.id.length-1])) {
            console.log(cell.innerText, "won")
        }
    })
}