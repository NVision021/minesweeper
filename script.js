EASY_GRID = 10;
MEDIUM_GRID = 15;
HARD_GRID = 20;
MINE_RATIO = 0.2;
GRID_SIZE = 40;

let gameBoardContainer = document.querySelector(".game-board-container");
let gameContainerHeader = document.querySelector(".game-container-header");


let createGrid = function(width, mineRatio) {
  let totalSquares = width**2;
  console.log(totalSquares);
  //Add number of flags left to header
  let flagNumber = document.createElement("p");
  flagNumber.textContent = ": " + String(totalSquares * mineRatio);
  flagNumber.style.margin = "0";
  gameContainerHeader.appendChild(flagNumber);

  //Create the game board and grid, then add the grid to the game board, THEN add the game board to the parent game board container
  let gameBoard = document.createElement("div");
  gameBoard.style.height = width * GRID_SIZE + "px";
  gameBoard.style.width = width * GRID_SIZE + "px";
  gameBoard.classList.add("game-board");
  
  for (i=0; i < totalSquares; i++) {
    let cell = document.createElement("div");
    cell.style.height = GRID_SIZE + "px";
    cell.style.width = GRID_SIZE + "px";
    cell.classList.add("unclicked", "cell");
    cell.setAttribute("id", i);
    gameBoard.appendChild(cell);
  }
  
  gameBoardContainer.appendChild(gameBoard);

  //Add the correct number of mines
  

}

createGrid(EASY_GRID, MINE_RATIO);
