const gameContainer = document.querySelector(".game-container");
const keyboardContainer = document.querySelector(".keyboard-container");
const closeButton = document.querySelector(".close-button");
const instructionButton = document.querySelector(".instruction-button");
const instructionContainer = document.querySelector(".instruction-container");

let currentRow = 0;
let currentColumn = 0;
const wordle = "ERASE";

// Keyboard
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACKSPACE",
];

const deleteLetter = () => {
  if (currentColumn > 0) {
    currentColumn--;
    const square = document.getElementById(`${currentRow}x${currentColumn}`);
    square.textContent = "";
    board[currentRow][currentColumn] = "";
    square.setAttribute("data-key", "");
  }
};

const addLetter = (letter) => {
  const square = document.getElementById(`${currentRow}x${currentColumn}`);
  square.textContent = letter;
  board[currentRow][currentColumn] = letter;
  square.setAttribute("data-key", letter);
  currentColumn++;
};

const checkWordle = () => {
  const guess = board[currentRow].join("");

  if (currentColumn > 4) {
    if (wordle === guess) {
      alert("Right Answer");
      return;
    } else {
      if (currentRow >= 5) {
        alert("Game Over");
        return;
      } else if (currentRow < 5) {
        currentRow++;
        currentColumn = 0;
      }
    }
  }
};

const clickKey = (key) => {
  if (key === "BACKSPACE") {
    deleteLetter();
    return;
  }
  if (key === "ENTER") {
    checkWordle();
    return;
  }

  if (currentColumn < 5 && currentRow < 6) {
    addLetter(key);
    return;
  }
};

keys.forEach((key) => {
  const keyboard = document.createElement("button");
  keyboard.textContent = key;
  keyboard.classList.add("keyboard");
  keyboardContainer.append(keyboard);
  keyboard.addEventListener("click", () => clickKey(key));
});

// game board
const board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

board.forEach((row, rowIndex) => {
  const eachRow = document.createElement("div");
  eachRow.classList.add("row");
  eachRow.setAttribute("id", `row-${rowIndex}`);
  row.forEach((column, columnIndex) => {
    const square = document.createElement("div");
    square.setAttribute("id", `${rowIndex}x${columnIndex}`);
    square.classList.add("square");
    eachRow.append(square);
  });
  gameContainer.append(eachRow);
});

// instructions
closeButton.addEventListener("click", () => {
  instructionContainer.classList.remove("open");
});

instructionButton.addEventListener("click", () => {
  instructionContainer.classList.add("open");
});
