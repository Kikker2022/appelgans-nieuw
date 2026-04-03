// ganzenvakjes
let meldingTekst = document.getElementById("melding");

meldingTekst.textContent = "";

if (positie === 6) {
meldingTekst.textContent = "⭐ Speler " + huidigeSpeler + " : 12 vakjes vooruit";
positie += 12;
}

if (positie === 12) {
meldingTekst.textContent = "⭐ Speler " + huidigeSpeler + " : 3 vakjes vooruit";
positie += 3;
}

if (positie === 19) {
meldingTekst.textContent = "↩️ Speler " + huidigeSpeler + " : terug naar 10";
positie = 10;
}

if (positie === 31) {
meldingTekst.textContent = "⭐ Speler " + huidigeSpeler + " : nog een keer gooien";
beurtWisselen = false;
}
