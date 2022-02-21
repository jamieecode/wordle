const gameContainer = document.querySelector(".game-container");
const keyboardContainer = document.querySelector(".keyboard-container");
const closeButton = document.querySelector(".close-button");
const instructionButton = document.querySelector(".instruction-button");
const instructionContainer = document.querySelector(".instruction-container");
const messageContainer = document.querySelector(".message-container");

let currentRow = 0;
let currentColumn = 0;
let gameOver = false;
let wordle;

// Get random word
const getRandomWord = () => {
  axios
    .get("http://localhost:5000/word", (req, res) => {
      res.json();
    })
    .then((data) => {
      wordle = data.data.toUpperCase();
    });
};

getRandomWord();

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

const colorSquare = () => {
  const guessWordle = [];
  const keyboard = document.querySelectorAll(".keyboard");
  const squares = document.getElementById(`row-${currentRow}`).childNodes;

  squares.forEach((square) => {
    guessWordle.push(square);
  });

  guessWordle.forEach((guess, index) => {
    if (guess.textContent === wordle[index]) {
      guess.classList.add("green");
      keyboard.forEach((key) => {
        if (key.textContent === guess.textContent) {
          key.classList.add("green");
        }
      });
    } else if (wordle.includes(guess.textContent)) {
      guess.classList.add("yellow");
      keyboard.forEach((key) => {
        if (key.textContent === guess.textContent) {
          key.classList.add("yellow");
        }
      });
    } else {
      guess.classList.add("grey");
      keyboard.forEach((key) => {
        if (key.textContent === guess.textContent) {
          key.classList.add("grey");
        }
      });
    }
  });
};

const checkWordle = () => {
  const guess = board[currentRow].join("");

  if (currentColumn > 4) {
    colorSquare();
    if (wordle === guess) {
      showMessage("Splendid!");
      return;
    } else {
      if (currentRow >= 5) {
        showMessage("Game Over");
        return;
      } else if (currentRow < 5) {
        currentRow++;
        currentColumn = 0;
      }
    }
  }
};

const clickKey = (key) => {
  if (!gameOver) {
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
    }
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

// messages
const showMessage = (message) => {
  messageContainer.textContent = message;

  messageContainer.classList.add("show");
  setTimeout(() => {
    messageContainer.classList.remove("show");
  }, 1000);
};
