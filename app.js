import { alleVragen } from "./data/vragen.js";

const dobbelsteenKnop = document.getElementById("dobbelsteen");
const worpTekst = document.getElementById("worp");
const vraagTekst = document.getElementById("vraag");
const antwoordTekst = document.getElementById("antwoord");
const bord = document.getElementById("bord");
const beurtTekst = document.getElementById("beurt");
const score1Tekst = document.getElementById("score1");
const score2Tekst = document.getElementById("score2");

let positie1 = 1;
let positie2 = 1;
let beurt = 1;

let huidigeVraag = null;

const ganzenVakjes = [6, 31];

// bord maken
for (let i = 1; i <= 42; i++) {
const vakje = document.createElement("div");
vakje.classList.add("vakje");
vakje.id = "vak-" + i;

if (ganzenVakjes.includes(i)) {
vakje.textContent = "🪿 " + i;
} else {
vakje.textContent = i;
}

bord.appendChild(vakje);
}

function updateBord() {

for (let i = 1; i <= 42; i++) {

const vak = document.getElementById("vak-" + i);

if (ganzenVakjes.includes(i)) {
vak.textContent = "🪿 " + i;
} else {
vak.textContent = i;
}

vak.classList.remove("speler1");
vak.classList.remove("speler2");
}

// speler 1
const speler1 = document.getElementById("vak-" + positie1);
speler1.textContent = "🔵 " + positie1;
speler1.classList.add("speler1");

// speler 2
const speler2 = document.getElementById("vak-" + positie2);
speler2.textContent += " 🔴";
speler2.classList.add("speler2");

score1Tekst.textContent = "Team 1: " + positie1;
score2Tekst.textContent = "Team 2: " + positie2;

beurtTekst.textContent = "Team " + beurt + " is aan de beurt";

}

updateBord();

dobbelsteenKnop.addEventListener("click", () => {

let worp = Math.floor(Math.random() * 6) + 1;

if (beurt === 1) {
positie1 += worp;
if (positie1 > 42) positie1 = 42;
} else {
positie2 += worp;
if (positie2 > 42) positie2 = 42;
}

// ganzenvakjes
let huidigePositie = beurt === 1 ? positie1 : positie2;

if (huidigePositie === 6 || huidigePositie === 31) {
worpTekst.textContent = "🪿 Ganzenvak! Nog een keer!";
updateBord();
return;
}

if (huidigePositie === 12) {
if (beurt === 1) positie1 += 3;
else positie2 += 3;
}

if (huidigePositie === 19) {
if (beurt === 1) positie1 = 10;
else positie2 = 10;
}

if (positie1 === 42 || positie2 === 42) {
worpTekst.textContent = "🎉 Team " + beurt + " wint!";
updateBord();
return;
}

worpTekst.textContent = "Team " + beurt + " gooide: " + worp;

updateBord();

huidigeVraag = alleVragen[Math.floor(Math.random() * alleVragen.length)];

vraagTekst.textContent = "Vraag: " + huidigeVraag.vraag;
antwoordTekst.textContent = "";

beurt = beurt === 1 ? 2 : 1;

});

vraagTekst.addEventListener("click", () => {

if (huidigeVraag) {
antwoordTekst.textContent = "Antwoord: " + huidigeVraag.antwoord;
}

});
