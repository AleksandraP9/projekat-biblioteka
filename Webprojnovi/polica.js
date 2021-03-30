import { Knjiga } from "./knjiga.js";

export class Polica {
  // KONSTRUKTOR === // 
  constructor(imePolice, maksBrKnjiga, idPolice) {
    //imeZanra=imePolice
    this.imePolice = imePolice;
    this.maksBrKnjiga = maksBrKnjiga;
    this.kontejner = null; //po njemu crtamo
    this.idPolice = idPolice;
  }

  // CRTANJE POLICE === //
  crtajPolice(host) {
    this.kontejner = document.createElement("div");
    this.kontejner.className = "kont";
    host.appendChild(this.kontejner);

    let maksBrKnjiga = document.createElement("span");
    maksBrKnjiga.innerHTML = this.maksBrKnjiga;
    maksBrKnjiga.className = "badge bg-dark";

    let imePolice = document.createElement("h4");
    imePolice.className = "mt-3 mb-2";
    imePolice.innerHTML = this.imePolice + ", Maksimalni broj knjiga: ";
    this.kontejner.appendChild(imePolice);
    imePolice.appendChild(maksBrKnjiga);

    let polica = document.createElement("div");
    polica.className = `card text-dark bg-light police  polica-id-${this.idPolice}`;
    polica.setAttribute("data-maksBrKnjiga", this.maksBrKnjiga);
    this.kontejner.appendChild(polica);
  }
}
