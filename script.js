EASY_GRID = 10;
MEDIUM_GRID = 15;
HARD_GRID = 20;
MINE_RATIO = 0.2;
GRID_SIZE = 40;

let gameBoardContainer = document.querySelector(".game-board-container");
let gameContainerHeader = document.querySelector(".game-container-header");


let createGrid = function(width, mineRatio) {
  let totalSquares = width**2;
  let totalMines = totalSquares * mineRatio
  
  //Add number of flags left to header
  let flagNumber = document.createElement("p");
  flagNumber.textContent = ": " + String(totalMines);
  flagNumber.style.margin = "0";
  flagNumber.classList.add("flag-number")
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
  };
  
  gameBoardContainer.appendChild(gameBoard);
};


let assignMines = function(width, mineRatio){
  let totalSquares = width**2;
  let totalMines = totalSquares * mineRatio;

  //Create an array to store all the values of cells
  let mineLocations = [];
  for (i=0; i < totalSquares; i++) {
    mineLocations.push(0);
  };

  //Add mines to the array
  let minesRemaining = totalMines;
  while (minesRemaining > 0) {
    let mineLocation = Math.floor(Math.random() * totalSquares);
    if (mineLocations[mineLocation] != "x") {
      mineLocations[mineLocation] = "x";
      minesRemaining -= 1;
    };
  };
  
  //Assign numbers to new array, allLocations, based on number of mines around them
  let allLocations = mineLocations.map((location, i) => {
    if (location === 0) {
      if (mineLocations[i-(width+1)] === "x" && i % width != 0) {
        location += 1;
      };
      if (mineLocations[i-(width)] === "x") {
        location += 1;
      };
      if (mineLocations[i-(width-1)] === "x" && i % width != width - 1) {
        location +=1;
      };
      if (mineLocations[i-1] === "x" && i % width != 0) {
        location += 1;
      };
      if (mineLocations[i+1] === "x" && i % width != width - 1) {
        location += 1;
      };
      if (mineLocations[i+(width-1)] === "x" && i % width != 0) {
        location += 1;
      };
      if (mineLocations[i+width] === "x") {
        location += 1
      };
      if (mineLocations [i+(width+1)] === "x" && i % width != width - 1) {
        location += 1;
      };
    }
    return location;
  })
  return allLocations;
};

let handleClicks = function() {
  let cells = document.querySelectorAll(".cell");

  //Stop contextmenu openning on right click on game board and handle right clicks on each cell
  cells.forEach(cell=>cell.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    flagNumber = document.querySelector(".flag-number");
    if (cell.classList.contains("unclicked")) {
      let flag = document.createElement("img"); 
      flag.classList.add("cell-flag");
      flag.setAttribute("src", "./Images/flag");
      cell.appendChild(flag);

      flagNumber.textContent = ": " + String(Number(flagNumber.textContent.slice(2)) - 1);

      cell.classList.remove("unclicked");
      cell.classList.add("flagged");

    } else if (cell.classList.contains("flagged")) {
      cellFlag = cell.querySelector(".cell-flag");
      cell.removeChild(cellFlag);

      flagNumber.textContent = ": " + String(Number(flagNumber.textContent.slice(2)) + 1);

      cell.classList.remove("flagged");
      cell.classList.add("unclicked");

    }
  }));

  //handles left click events
  cells.forEach(cell => cell.addEventListener("click", (e) => {
    console.log(e.button);
    if (e.button == 0) {

    }
  }))
}

//start with an easy grid (gameBoardArray will store the array containing the game board)
createGrid(EASY_GRID, MINE_RATIO);
let gameBoardArray = assignMines(EASY_GRID, MINE_RATIO);
handleClicks();

//function that clears everything to be used in event listeners
clearBoard = function() {
  let flagNumber = document.querySelector(".flag-number");
  gameContainerHeader.removeChild(flagNumber);
  let gameBoard = document.querySelector(".game-board");
  gameBoardContainer.removeChild(gameBoard);
};

//Add functionality to buttons
easyButton = document.querySelector(".easy-button");
mediumButton = document.querySelector(".medium-button");
hardButton = document.querySelector(".hard-button");


easyButton.addEventListener("click", () => {
  clearBoard();
  createGrid(EASY_GRID, MINE_RATIO);
  gameBoardArray = assignMines(EASY_GRID, MINE_RATIO);
  handleClicks();
});

mediumButton.addEventListener("click", () => {
  clearBoard();
  createGrid(MEDIUM_GRID, MINE_RATIO);
  gameBoardArray = assignMines(MEDIUM_GRID, MINE_RATIO);
  handleClicks();

});

hardButton.addEventListener("click", () => {
  clearBoard();
  createGrid(HARD_GRID, MINE_RATIO);
  gameBoardArray = assignMines(HARD_GRID, MINE_RATIO);
  handleClicks();
});





