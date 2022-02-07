const gameContainer = document.querySelector(".game-container");
const keyboardContainer = document.querySelector(".keyboard-container");

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

keys.forEach((key) => {
  const keyboard = document.createElement("button");
  keyboard.textContent = key;
  keyboard.classList.add("keyboard");
  keyboardContainer.append(keyboard);
  keyboard.addEventListener("click", () => console.log(key));
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
