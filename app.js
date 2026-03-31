import { alleVragen } from "./data/vragen.js";

const dobbelsteenKnop = document.getElementById("dobbelsteen");
const worpTekst = document.getElementById("worp");
const vraagTekst = document.getElementById("vraag");
const antwoordTekst = document.getElementById("antwoord");
const bord = document.getElementById("bord");

let positie = 1;

// bord maken
for (let i = 1; i <= 42; i++) {
let vakje = document.createElement("div");
vakje.classList.add("vakje");
vakje.id = "vak-" + i;
vakje.textContent = i;
bord.appendChild(vakje);
}

function updateBord() {

document.querySelectorAll(".vakje").forEach(v => {
v.classList.remove("speler");
v.textContent = v.id.replace("vak-",""); // reset nummer
});

if (positie > 0) {
let spelerVak = document.getElementById("vak-" + positie);
spelerVak.classList.add("speler");
spelerVak.textContent = "🪿 " + positie;
}

}

dobbelsteenKnop.addEventListener("click", () => {

let worp = Math.floor(Math.random() * 6) + 1;

positie += worp;

if (positie > 42) {
positie = 42;
}

worpTekst.textContent = "Je gooide: " + worp + " | Positie: " + positie;

updateBord();

let randomVraag = alleVragen[Math.floor(Math.random() * alleVragen.length)];

vraagTekst.textContent = "Vraag: " + randomVraag.vraag;
antwoordTekst.textContent = "Antwoord: " + randomVraag.antwoord;

});

updateBord();
