import vragen from "./data/vragen.js";

const bord = document.getElementById("bord");
const vraagEl = document.getElementById("vraag");
const antwoordEl = document.getElementById("antwoord");
const gooiBtn = document.getElementById("gooi");
const beurtEl = document.getElementById("beurt");
const dobbelsteen = document.getElementById("dobbelsteen");

const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");

let positie1 = 0;
let positie2 = 0;
let score1 = 0;
let score2 = 0;

let skip1 = 0;
let skip2 = 0;

let team = 1;

const finish = 140;

const putten = [13, 38, 64, 89, 115];
const bruggen = [6, 52, 97];
const gevangenissen = [31, 78, 124];

const ganzen = [];
for (let i = 9; i < finish; i += 9) {
ganzen.push(i);
}

function maakBord() {

bord.innerHTML = "";

let nummer = 1;

const rijen = 14;
const kolommen = 10;

for (let rij = 0; rij < rijen; rij++) {

let rijArray = [];

for (let kolom = 0; kolom < kolommen; kolom++) {
rijArray.push(nummer);
nummer++;
}

if (rij % 2 === 1) {
rijArray.reverse();
}

rijArray.forEach(nr => {

const vak = document.createElement("div");
vak.classList.add("vak");
vak.id = "vak" + nr;

if (nr === finish) {
vak.textContent = "🏁";
}
else if (putten.includes(nr)) {
vak.innerHTML = "🪣";
}
else if (bruggen.includes(nr)) {
vak.innerHTML = "🌉";
}
else if (gevangenissen.includes(nr)) {
vak.innerHTML = "🔒";
}
else if (ganzen.includes(nr)) {
vak.innerHTML = "🪿";
}
else {
vak.textContent = nr;
}

bord.appendChild(vak);

});

}

}

function updateBord() {

document.querySelectorAll(".vak").forEach(v => {

const nr = Number(v.id.replace("vak", ""));

if (nr === finish) {
v.textContent = "🏁";
}
else if (putten.includes(nr)) {
v.innerHTML = "🪣";
}
else if (bruggen.includes(nr)) {
v.innerHTML = "🌉";
}
else if (gevangenissen.includes(nr)) {
v.innerHTML = "🔒";
}
else if (ganzen.includes(nr)) {
v.innerHTML = "🪿";
}
else {
v.innerHTML = nr;
}

});

if (positie1 > 0) {
const vak = document.getElementById("vak" + positie1);
if (vak) {
const bol = document.createElement("div");
bol.classList.add("speler", "team1");
vak.appendChild(bol);
}
}

if (positie2 > 0) {
const vak = document.getElementById("vak" + positie2);
if (vak) {
const bol = document.createElement("div");
bol.classList.add("speler", "team2");
vak.appendChild(bol);
}
}

}

function nieuweVraag() {
const random = vragen[Math.floor(Math.random() * vragen.length)];
vraagEl.textContent = random.vraag;
antwoordEl.textContent = random.antwoord;
}

function bounceBack(pos) {
if (pos > finish) {
return finish - (pos - finish);
}
return pos;
}

function checkFinish() {
if (positie1 === finish) {
alert("🎉 Team 1 wint!");
gooiBtn.disabled = true;
}

if (positie2 === finish) {
alert("🎉 Team 2 wint!");
gooiBtn.disabled = true;
}
}

function updateBeurt() {

beurtEl.textContent = "Team " + team + " is aan de beurt";

beurtEl.classList.remove("team1Beurt","team2Beurt");

if(team === 1){
beurtEl.classList.add("team1Beurt");
}else{
beurtEl.classList.add("team2Beurt");
}

}

gooiBtn.addEventListener("click", () => {

if (team === 1 && skip1 > 0) {
skip1--;
team = 2;
updateBeurt();
return;
}

if (team === 2 && skip2 > 0) {
skip2--;
team = 1;
updateBeurt();
return;
}

const worp = Math.floor(Math.random() * 6) + 1;

dobbelsteen.textContent = ["⚀","⚁","⚂","⚃","⚄","⚅"][worp-1];

if (team === 1) {

positie1 += worp;
positie1 = bounceBack(positie1);

if (putten.includes(positie1)) {
skip1 = 1;
}

if (gevangenissen.includes(positie1)) {
skip1 = 2;
}

if (ganzen.includes(positie1)) {
positie1 += worp;
positie1 = bounceBack(positie1);
}

score1++;
score1El.textContent = score1;

team = 2;

} else {

positie2 += worp;
positie2 = bounceBack(positie2);

if (putten.includes(positie2)) {
skip2 = 1;
}

if (gevangenissen.includes(positie2)) {
skip2 = 2;
}

if (ganzen.includes(positie2)) {
positie2 += worp;
positie2 = bounceBack(positie2);
}

score2++;
score2El.textContent = score2;

team = 1;
}

updateBord();
nieuweVraag();
checkFinish();
updateBeurt();

});

maakBord();
updateBeurt();
