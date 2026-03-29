function gooiDobbelsteen() {
  const dobbel = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dobbel").innerText = dobbel;
}
let worp = Math.floor(Math.random()*6)+1;

document.getElementById("dobbel").innerText = "Je gooide: " + worp;

let vraag = alleVragen[Math.floor(Math.random()*alleVragen.length)];

document.getElementById("vraag").innerText = vraag.vraag;

}

window.gooiDobbelsteen = gooiDobbelsteen;
