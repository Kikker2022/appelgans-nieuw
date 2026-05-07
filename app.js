const TOTAL_CELLS = 140;

let currentTeam = 0;

const teams = [
{ color:"blue", icon:"🔵", position:0, skip:false },
{ color:"red", icon:"🔴", position:0, skip:false },
{ color:"green", icon:"🟢", position:0, skip:false },
{ color:"purple", icon:"🟣", position:0, skip:false }
];

const board = document.getElementById("board");
const turnText = document.getElementById("turn");
const diceText = document.getElementById("diceResult");
const questionText = document.getElementById("question");
const answerText = document.getElementById("answer");
const popup = document.getElementById("popup");

const soundGans = new Audio("public/gans.mp3");
const soundPut = new Audio("public/dubbel.mp3");
const soundWin = new Audio("public/finish.mp3");

const specialTiles = {
6:"gans",
12:"gans",
18:"brug",
25:"herberg",
37:"put",
52:"gevangenis",
68:"gans",
79:"brug",
95:"put",
111:"gevangenis",
125:"dood",
140:"finish"
};

function createBoard(){

board.innerHTML="";

for(let i=1;i<=TOTAL_CELLS;i++){

const cell=document.createElement("div");
cell.classList.add("cell");

const type=specialTiles[i];

if(type){
cell.classList.add(type);
}

let icon="";

if(type==="gans") icon="🪿";
if(type==="brug") icon="🌉";
if(type==="put") icon="🕳️";
if(type==="gevangenis") icon="⛓️";
if(type==="herberg") icon="🍺";
if(type==="dood") icon="☠️";
if(type==="finish") icon="🏁";

cell.innerHTML=`
<div>${i}</div>
<span>${icon}</span>
<div class="pawns" id="pawn-${i}"></div>
`;

board.appendChild(cell);

}

updateBoard();

}

function updateBoard(){

document.querySelectorAll(".pawns").forEach(p=>{
p.innerHTML="";
});

teams.forEach(team=>{

if(team.position===0) return;

const holder=document.getElementById(`pawn-${team.position}`);

if(holder){

const pawn=document.createElement("div");
pawn.classList.add("pawn",team.color);

holder.appendChild(pawn);

}

});

turnText.innerHTML=
`${teams[currentTeam].icon} is aan de beurt`;

}

async function rollDice(){

const team=teams[currentTeam];

if(team.skip){

showPopup(`${team.icon} slaat een beurt over`);

team.skip=false;

nextTurn();

return;

}

const roll=Math.floor(Math.random()*6)+1;

diceText.innerText=`Je gooide ${roll}`;

for(let i=0;i<roll;i++){

if(team.position<TOTAL_CELLS){

team.position++;

updateBoard();

await sleep(350);

}

}

handleSpecial(team);

loadQuestion();

if(team.position>=TOTAL_CELLS){

soundWin.play();

showPopup(`${team.icon} heeft gewonnen!`);

return;

}

nextTurn();

}

function handleSpecial(team){

const type=specialTiles[team.position];

if(!type) return;

if(type==="gans"){

soundGans.play();

showPopup("🪿 Gans! Ga 6 vakjes vooruit");

team.position=Math.min(team.position+6,TOTAL_CELLS);

}

if(type==="brug"){

showPopup("🌉 Brug! Spring vooruit naar vak 30");

team.position=30;

}

if(type==="put"){

soundPut.play();

showPopup("🕳️ In de put! Beurt overslaan");

team.skip=true;

}

if(type==="gevangenis"){

showPopup("⛓️ Gevangenis! Beurt overslaan");

team.skip=true;

}

if(type==="herberg"){

showPopup("🍺 Herberg! Rust een beurt uit");

team.skip=true;

}

if(type==="dood"){

showPopup("☠️ Terug naar start!");

team.position=0;

}

updateBoard();

}

function nextTurn(){

currentTeam++;

if(currentTeam>=teams.length){
currentTeam=0;
}

updateBoard();

}

function loadQuestion(){

const q=vragen[Math.floor(Math.random()*vragen.length)];

questionText.innerText=q.vraag;

answerText.innerText=q.antwoord;

answerText.style.display="none";

}

function showAnswer(){

answerText.style.display="block";

}

function showPopup(text){

popup.style.display="block";

popup.innerText=text;

setTimeout(()=>{
popup.style.display="none";
},3000);

}

function sleep(ms){
return new Promise(resolve=>setTimeout(resolve,ms));
}

createBoard();
