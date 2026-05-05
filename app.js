let currentTeam = 1;
let positions = [0, 0];

const board = document.getElementById("board");
const turnText = document.getElementById("turn");
const diceText = document.getElementById("diceResult");
const questionText = document.getElementById("question");
const answerText = document.getElementById("answer");

// geluiden
const soundGans = new Audio("public/gans.mp3");
const soundPut = new Audio("public/dubbel.mp3");
const soundWin = new Audio("public/finish.mp3");

// speciale vakken
const specialTiles = {
  6: "gans",
  12: "gans",
  19: "put",
  31: "gevangenis",
  42: "finish"
};

// bord maken
for (let i = 1; i <= 42; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  if (specialTiles[i]) {
    cell.classList.add("special");
    cell.innerText = i + " 🪿";
  } else {
    cell.innerText = i;
  }

  board.appendChild(cell);
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.classList.remove("team1", "team2"));

  positions.forEach((pos, i) => {
    if (pos > 0) {
      cells[pos - 1].classList.add(i === 0 ? "team1" : "team2");
    }
  });
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = "Je gooide: " + roll;

  let index = currentTeam - 1;
  positions[index] += roll;

  if (positions[index] > 42) positions[index] = 42;

  handleSpecial(positions[index], index);

  updateBoard();
  loadQuestion();

  if (positions[index] === 42) {
    soundWin.play();
    alert("Team " + currentTeam + " wint!");
    return;
  }

  currentTeam = currentTeam === 1 ? 2 : 1;
  turnText.innerText = "Team " + currentTeam + " is aan de beurt";
}

function handleSpecial(pos, index) {
  if (specialTiles[pos] === "gans") {
    soundGans.play();
    positions[index] += 6;
  }

  if (specialTiles[pos] === "put") {
    soundPut.play();
    alert("In de put! Beurt overslaan.");
  }

  if (specialTiles[pos] === "gevangenis") {
    alert("Gevangenis! Beurt overslaan.");
  }
}

function loadQuestion() {
  const q = vragen[Math.floor(Math.random() * vragen.length)];
  questionText.innerText = q.vraag;
  answerText.innerText = q.antwoord;
  answerText.style.display = "none";
}

function showAnswer() {
  answerText.style.display = "block";
}
