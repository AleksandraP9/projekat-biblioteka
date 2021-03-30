export class Knjiga {
  constructor(idKnjige, imeKnjige, imeAutora, bojaKnjige, idPolice) {
    this.idKnjige = idKnjige;
    this.imeKnjige = imeKnjige;
    this.imeAutora = imeAutora;
    this.bojaKnjige = bojaKnjige;
    this.idPolice = idPolice;
  }
 
  // KREIRANJE KNJIGE I UBACIVANJE U POLICU === //   
  kreirajKnjigu() {
    let krajnjiZanr = document.querySelector(`.polica-id-${this.idPolice}`);

    let knjigaDiv = document.createElement("div");

    let knjigaIme = document.createElement("p");
    knjigaIme.className = "booktitle";
    

    if (this.imeKnjige.length > 15) {
      knjigaIme.setAttribute("title", `Ime knjige: ${this.imeKnjige}, Autor: ${this.imeAutora}, ID Knjige: ${this.idKnjige}`);
      knjigaIme.innerHTML = this.imeKnjige.substr(0, 5) + "...";
      } 
    else {
      knjigaIme.innerHTML = this.imeKnjige;
      knjigaIme.setAttribute("title", `Autor: ${this.imeAutora}, ID Knjige: ${this.idKnjige}`);
      }
        knjigaIme.setAttribute("data-bs-toggle", "tooltip");
        knjigaIme.setAttribute("data-bs-placement", "top");

    knjigaDiv.className = `${this.bojaKnjige} knjiga-id-${this.idKnjige}`;
    knjigaDiv.appendChild(knjigaIme);
    krajnjiZanr.appendChild(knjigaDiv);
    this.omoguciTooltip();
  }

  // Omogucava da tooltipovi rade na stranici
  omoguciTooltip() {
    // console.log("ENABLE");
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
