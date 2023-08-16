const body = document.querySelector("body");
const board = document.querySelector("#board");
const cells = document.getElementsByClassName("cell");
const infoBox = document.querySelector(".info-box");
const mainMenu = document.querySelector(".main-menu");
const playButton = document.querySelector(".play-button");

// console.log(board)
// console.log(cells)


/*********** GLOBALS START ***********/

let GAME_MODE;
let GAME_OVER;

let turn;
let infoText;

// checks contains the cells to check for match
// there are total 8 possible ways to win, checks contains each
const checks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// checks_for_cell are the checks required by that cell
// index indicates the cell number
const checks_for_cell = [
  [0, 3, 6],
  [0, 4],
  [0, 5, 7],
  [1, 3],
  [1, 4, 6, 7],
  [1, 5],
  [2, 3, 7],
  [2, 4],
  [2, 5, 6],
];

/*********** GLOBALS END ***********/


for (let cell of cells) {
  cell.classList.add("hidden");
}

function startGame() {
  console.log("starting....");
  if (GAME_MODE === "1") {
    infoBox.innerText = "Game Mode Not Available";
    return;
  } else {
    startPvPMode();
  }
  mainMenu.classList.add("hidden");
  for (let cell of cells) {
    cell.classList.remove("hidden");
  }
  infoBox.innerText = "Player 1's Turn";
}
// startGame()

function cellValue(i) {
  return cells[i].innerText;
}

function checkLine(i) {
  let a = checks[i];
  if (cellValue(a[0]) == "") {
    return false;
  }

  if (
    cellValue(a[0]) == cellValue(a[1]) &&
    cellValue(a[0]) == cellValue(a[2])
  ) {
    console.log(a);
    return true;
  }

  return false;
}

function checkWin(id) {
  let checks_required = checks_for_cell[id];
  // console.log("checks_requird", checks_required)

  for (let i of checks_required) {
    // console.log(i)
    if (checkLine(i)) return true;
  }
  return false;
}

// console.log(mainMenu.children[1].children)

// add event listener to options in the main menu for choosing the game mode
for (let option of mainMenu.children[1].children) {
  option.addEventListener("click", () => {
    GAME_MODE = option.getAttribute("value");
    // console.log(GAME_MODE)
  });
}

// event listener to button to start the game
playButton.addEventListener("click", () => {
  startGame();
});

turn = "O";
infoText = "<h2>TIC TAC TOE</h2>";
infoBox.innerHTML = infoText;

function startPvPMode() {
  for (let cell of cells) {
    cell.addEventListener("click", () => {
      // console.log(cell)
      if (GAME_OVER) return;
      if (turn == "O") {
        turn = "X";
        infoText = "Player 2";
      } else {
        turn = "O";
        infoText = "Player 1";
      }
      if (cell.innerHTML) {
        // cell.innerHTML = ""
        // cell.style = "background-color: #fff;"
      } else {
        cell.innerHTML = `<h2>${turn}</h2>`;
        cell.style = "background-color: #eee";
        infoBox.innerText = infoText + "'s Turn";
      }

      if (checkWin(cell.id[cell.id.length - 1])) {
        GAME_OVER = true;
        infoBox.innerText = infoText + " WON";
        console.log(cell.innerText, "won");
      }
    });
  }
}
