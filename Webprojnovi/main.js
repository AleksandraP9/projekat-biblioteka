import { Biblioteka } from "./biblioteka.js";
import { Knjiga } from "./knjiga.js";
import { Polica } from "./polica.js";

// PREUZIMANJE SVIH BIBLIOTEKA I POLICA
fetch("https://localhost:5001/Centaar/PreuzmiBiblioteke").then((p) => {
  p.json().then((data) => {
    data.forEach((biblioteka) => {
      const biblioteka1 = new Biblioteka(
        biblioteka.id,
        biblioteka.nazivBiblioteke
      );
      biblioteka1.crtajBiblioteku(document.body);
   
      nacrtajPolice(biblioteka.id, biblioteka1);
    });
  });
});

// CRTA POLICE I UBACUJE KNJIGE
function nacrtajPolice(bibliotekaID, bibliotekaN) {
  fetch(`https://localhost:5001/Centaar/PreuzmiPolice/${bibliotekaID}`).then(
    (p) => {
      p.json().then((data) => {
        data.forEach((policaSingle) => {
          let biblioteka = document.querySelector(
            `.biblioteka-id-${bibliotekaID}`
          );

          let divZaPolice = document.createElement("div");
          divZaPolice.className = "divZaPolice";
          biblioteka.appendChild(divZaPolice);

          let polica = new Polica(
            policaSingle.imePolice,
            policaSingle.maksBrKnjiga,
            policaSingle.id
          );
          bibliotekaN.dodajPolicu(polica);
          polica.crtajPolice(divZaPolice);

          bibliotekaN.dodajSelekt(polica.imePolice, policaSingle.id); //Zove funkciju koja dodaje ime zanra u selekt

          policaSingle.knjige.forEach((knjiga) => {
            let novaKnjiga = new Knjiga(
              knjiga.id,
              knjiga.imeKnjige,
              knjiga.imeAutora,
              knjiga.bojaKnjige,
              policaSingle.id
            );
            novaKnjiga.kreirajKnjigu();

            // console.log(knjiga.id + " " + knjiga.imeKnjige);
          });
        });
      });
    }
  );
}

//const biblioteka1 = new Biblioteka("Biblioteka 1");
//biblioteka1.crtajBiblioteku(document.body);

//const biblioteka2 = new Biblioteka("Bib2");
//biblioteka2.crtajBiblioteku(document.body);
