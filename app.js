console.log("Nieuwe versie geladen");

let dobbel = document.getElementById("dobbel");
let bord = document.getElementById("bord");
let worpTekst = document.getElementById("worp");
let melding = document.getElementById("melding");
let beurt = document.getElementById("beurt");

let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");

let positie1 = 1;
let positie2 = 1;

let speler = 1;
let nogEenKeer = false;

let vragen = [
{vraag:"Wat meet een tachymeter?",antwoord:"Afstanden en hoeken"},
{vraag:"Wat is de hoofdstad van Duitsland?",antwoord:"Berlijn"},
{vraag:"Hoeveel meter is 1 km?",antwoord:"1000"},
{vraag:"Wat is 6 x 7?",antwoord:"42"}
];

function tekenBord(){

bord.innerHTML = "";

for(let i=1;i<=42;i++){

let vak = document.createElement("div");
vak.className = "vak";
vak.textContent = i;

if(i===positie1) vak.textContent="🔵";
if(i===positie2) vak.textContent="🔴";

bord.appendChild(vak);

}

}

tekenBord();

dobbel.onclick=function(){

let worp = Math.floor(Math.random()*6)+1;

worpTekst.textContent="Je gooide "+worp;

melding.textContent="";

if(speler===1){
positie1+=worp;
ganzen(1);
score1.textContent=positie1;
}else{
positie2+=worp;
ganzen(2);
score2.textContent=positie2;
}

vraag();

tekenBord();

if(!nogEenKeer){
speler=speler===1?2:1;
}

beurt.textContent="Team "+speler+" is aan de beurt";

nogEenKeer=false;

}

function vraag(){

let v = vragen[Math.floor(Math.random()*vragen.length)];

melding.innerHTML=
"❓ "+v.vraag+
"<br><button onclick='antwoord(\""+v.antwoord+"\")'>Antwoord</button>";

}

function antwoord(a){
melding.innerHTML+="<br>✅ "+a;
}

function ganzen(s){

let pos = s===1?positie1:positie2;

if(pos===6){
pos+=12;
melding.textContent="⭐ 12 vooruit";
}

if(pos===19){
pos=10;
melding.textContent="↩️ terug naar 10";
}

if(pos===31){
melding.textContent="⭐ nog een keer";
nogEenKeer=true;
}

if(s===1) positie1=pos;
else positie2=pos;

}
