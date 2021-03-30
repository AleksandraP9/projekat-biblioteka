import { Polica } from "./polica.js";
import { Knjiga } from "./knjiga.js";

export class Biblioteka {
    
  // Konstruktor 
  constructor(id, nazivBiblioteke) {
    this.id = id;
    this.nazivBiblioteke = nazivBiblioteke;
    this.glavniKontejner = null; //sve crtamo po glavnomKontejneru
    this.police = [];
    this.knjige = [];
    this.brKnjiga = 0;
  }

  // Niz sa izborom boja za knjigu
  boje = [
    {
      id: 1,
      name: "Crvena",
      value: "#EF4444",
    },
    {
      id: 2,
      name: "Plava",
      value: "#60A5FA",
    },
    {
      id: 3,
      name: "Roze",
      value: "#F472B6",
    },
    {
      id: 4,
      name: "Zelena",
      value: "#34D399",
    },
    {
      id: 5,
      name: "Žuta",
      value: "#FCD34D",
    },
    {
      id: 6,
      name: "Siva",
      value: "#9CA3AF",
    },
    {
      id: 7,
      name: "Ljubicasta",
      value: "#8B5CF6",
    },
  ];

  // F-ja crta celu biblioteku ===//
  crtajBiblioteku(host) {
    if (!host) 
      throw new Exception("Roditeljski element ne postoji.");

    let naslovBiblioteke = document.createElement("h2");
    naslovBiblioteke.classList.add("naslovBib");
    naslovBiblioteke.innerHTML = this.nazivBiblioteke;
    host.appendChild(naslovBiblioteke);

    this.glavniKontejner = document.createElement("div");
    this.glavniKontejner.classList.add("glKontejner");
    this.glavniKontejner.classList.add(`biblioteka-id-${this.id}`);
    host.appendChild(this.glavniKontejner);

    this.crtajForme(this.glavniKontejner);
  }

  // Ova f-ja crta sve forme na stranici
  crtajForme(host) {
    // Glavni kontejner za sve forme
    let divZaForme = document.createElement("div");
    divZaForme.className = "divZaForme";
    host.appendChild(divZaForme);

    // FORMA ZA DODAVANJE KNJIGE /
    let divZaDodavanjeKnjige = document.createElement("div");
    divZaDodavanjeKnjige.className = "divZaDodavanjeKnjige card p-2";
    divZaForme.appendChild(divZaDodavanjeKnjige);

    let naslovForme1 = document.createElement("h3"); //naslov Dodaj Knjigu, naslov forme divZaDodavanjeKnjige
    naslovForme1.className = "naslovForme1";
    naslovForme1.innerHTML = "DODAJ KNJIGU";
    divZaDodavanjeKnjige.appendChild(naslovForme1);

    this.kreirajInputPolje("nazivKnjige form-control", "text", "Naziv knjige", divZaDodavanjeKnjige);
    this.kreirajInputPolje("imeAutora form-control", "text", "Ime autora", divZaDodavanjeKnjige);
    this.kreirajSelekt("bojaKnjige form-select", divZaDodavanjeKnjige, this.boje, "boja");
    this.kreirajSelekt("imeZanra form-select", divZaDodavanjeKnjige, this.police, "imeZanr");

    const dugmeZaDodajKnjigu = document.createElement("button");
    dugmeZaDodajKnjigu.innerHTML = "Dodaj knjigu";
    dugmeZaDodajKnjigu.className = "dugmeZaDodajKnjigu btn btn-primary";
    divZaDodavanjeKnjige.appendChild(dugmeZaDodajKnjigu);
    dugmeZaDodajKnjigu.onclick = (ev) => {

      //pokupimo sve vrednosti koje su unete za dodaj knjigu
      let vrednostiKnjigeKojuDodajemo = {
        imeKnjigeVrednost: this.glavniKontejner.querySelector(".nazivKnjige").value,
        imeAutoraVrednost: this.glavniKontejner.querySelector(".imeAutora").value,
        idPoliceVrednost: this.glavniKontejner.querySelector(".imeZanra").value,
        bojaKnjigeVrenost: this.glavniKontejner.querySelector(".bojaKnjige").value,
      };
      console.log(vrednostiKnjigeKojuDodajemo);
      // Vraca maksimalni broj knjiga koje ima polica u koju zelimo da ubacimo novu knjigu
      let maksBrojKnjiga = this.glavniKontejner.querySelector(`.polica-id-${vrednostiKnjigeKojuDodajemo.idPoliceVrednost}`).getAttribute("data-maksBrKnjiga");

      if (maksBrojKnjiga <= this.prebrojKnjigeUpolici(vrednostiKnjigeKojuDodajemo.idPoliceVrednost)
      ) {
        // Proverava da li polica ima popunjen kapacitet
        alert("Ova polica je popunjena izaberite neku drugu!");
        return;
      }
        if (vrednostiKnjigeKojuDodajemo.imeKnjigeVrednost == "") {
          alert("Popunite upit!");
          return;
        } 
      else {
        fetch("https://localhost:5001/Centaar/UpisKnjige/" + vrednostiKnjigeKojuDodajemo.idPoliceVrednost, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ImeKnjige: vrednostiKnjigeKojuDodajemo.imeKnjigeVrednost,
              ImeAutora: vrednostiKnjigeKojuDodajemo.imeAutoraVrednost,
              PolicaID: vrednostiKnjigeKojuDodajemo.idPoliceVrednost,
              BojaKnjige: vrednostiKnjigeKojuDodajemo.bojaKnjigeVrenost,
            }),
          }
        ).then((response) => {
          if (response.ok) {
            response.json().then(idKnjige=>{
              let novaKnjiga = new Knjiga(
                idKnjige,
                vrednostiKnjigeKojuDodajemo.imeKnjigeVrednost,
                vrednostiKnjigeKojuDodajemo.imeAutoraVrednost,
                vrednostiKnjigeKojuDodajemo.bojaKnjigeVrenost,
                vrednostiKnjigeKojuDodajemo.idPoliceVrednost
              );
              novaKnjiga.kreirajKnjigu();
            })
          
            
          } 
          //+
          else if (response.status == 406){
              alert("Morate popuniti sva polja.");
          }
          else {
            alert("Greska prilikom upisa.");
          }
        });
      }
    };

    // FORMA ZA DODAVANJE ZANRA (POLICE) === //
    let divZaDodavanjeZanra = document.createElement("div");
    divZaDodavanjeZanra.className = "divZaDodavanjeZanra card p-2";
    divZaForme.appendChild(divZaDodavanjeZanra);

    let naslovForme2 = document.createElement("h3"); //naslov Dodaj Zanr, naslov forme divZaDodavanjeZanra
    naslovForme2.className = "naslovForme2";
    naslovForme2.innerHTML = "DODAJ ŽANR";
    divZaDodavanjeZanra.appendChild(naslovForme2);

    this.kreirajInputPolje("zanrIme form-control", "text", "Ime žanra", divZaDodavanjeZanra);
    this.kreirajInputPolje("maksBrKnjiga form-control", "number", "Maksimalni broj knjiga", divZaDodavanjeZanra);

    const dugmeZaDodajZanr = document.createElement("button");
    dugmeZaDodajZanr.innerHTML = "Dodaj žanr";
    dugmeZaDodajZanr.className = "dugmeZaDodajZanr btn btn-primary";
    divZaDodavanjeZanra.appendChild(dugmeZaDodajZanr);
    dugmeZaDodajZanr.onclick = (ev) => {
          const imeZanraVrednost = this.glavniKontejner.querySelector(".zanrIme").value; //pokupimo vrenost koju je korinik uneo za ime zanra
          const maksBrKnjigaVrenost = this.glavniKontejner.querySelector(".maksBrKnjiga").value; //pokupimo vrednost koji je korinik uneo za maksimalan broj knjiga u jednom zanru

      if (imeZanraVrednost == "" || maksBrKnjigaVrenost == "") {
        alert("Morate popuniti upit");
      } 
      else {
        fetch("https://localhost:5001/Centaar/UpisPolice/" + this.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ImePolice: imeZanraVrednost,
            MaksBrKnjiga: maksBrKnjigaVrenost
          }),
        }).then((response) => {
          if (response.ok) {
            response.json().then(idPolice=>{
              let divZaPolice = document.createElement("div");
              divZaPolice.className = "divZaPolice ";
              host.appendChild(divZaPolice);
  
              let polica = new Polica(imeZanraVrednost, maksBrKnjigaVrenost, idPolice);
              this.dodajPolicu(polica);
              polica.crtajPolice(divZaPolice);
  
              this.dodajSelekt(polica.imePolice, idPolice); //Zove funkciju koja dodaje ime zanra u selekt
            })
          }
          else if (response.status == 406){
              alert("Morate uneti ime police");
              
          }
          else {
            alert("Greska prilikom upisa.");
            
          }
        });
      }
    };

    // FORMA ZA BRISANJE KNJIGE === //
    let divZaBrisanjeKnjige = document.createElement("div");
    divZaBrisanjeKnjige.className = "divZaBrisanjeKnjige card p-2";
    divZaForme.appendChild(divZaBrisanjeKnjige);

    let naslovForme3 = document.createElement("h3"); //naslov Dodaj Zanr, naslov forme divZaDodavanjeZanra
    naslovForme3.className = "naslovForme3";
    naslovForme3.innerHTML = "OBRIŠI KNJIGU";
    divZaBrisanjeKnjige.appendChild(naslovForme3);

    this.kreirajInputPolje("idKnjige form-control", "number", "Id knjige koja se briše", divZaBrisanjeKnjige);

    const dugmeBrisanjeKnjige = document.createElement("button");
    dugmeBrisanjeKnjige.innerHTML = "Obriši knjigu";
    dugmeBrisanjeKnjige.className = "dugmeBrisanjeKnjige btn btn-danger";
    divZaBrisanjeKnjige.appendChild(dugmeBrisanjeKnjige);
    dugmeBrisanjeKnjige.onclick = (ev) => {

      let idKnjigeKojuBrisemo = this.glavniKontejner.querySelector(".idKnjige").value;

      if (idKnjigeKojuBrisemo == "")
        alert("Unesite ID knjige koju zelite da obrisete.");
      else {
        fetch(
          `https://localhost:5001/Centaar/IzbrisiKnjigu/${idKnjigeKojuBrisemo}`,
          {
            method: "DELETE",
          }
        ).then((resposnse) => {
          console.log(resposnse);
          if (resposnse.ok) {
            let knjigaZaBrisanje = this.glavniKontejner.querySelector(`.knjiga-id-${idKnjigeKojuBrisemo}`)
            knjigaZaBrisanje.remove(); 
          }
        });
      }
    };

    // * FORMA ZA IZMENU KNJIGE === //
    let divZaIzmeniKnjige = document.createElement("div");
    divZaIzmeniKnjige.className = "divZaIzmenuKnjige card p-2";
    divZaForme.appendChild(divZaIzmeniKnjige);

    let naslovForme4 = document.createElement("h3"); //naslov Dodaj Knjigu, naslov forme divZaDodavanjeKnjige
    naslovForme4.className = "naslovForme4";
    naslovForme4.innerHTML = "IZMENI KNJIGU";
    divZaIzmeniKnjige.appendChild(naslovForme4);

    this.kreirajInputPolje("idKnjigeZaIzmenu form-control", "text", "Id knjige", divZaIzmeniKnjige);
    this.kreirajInputPolje("nazivKnjigeZaIzmenu form-control", "text", "Naziv knjige", divZaIzmeniKnjige);
    this.kreirajInputPolje("imeAutoraZaIzmenu form-control", "text", "Ime autora", divZaIzmeniKnjige);
    this.kreirajSelekt("bojaKnjigeZaIzmenu form-select", divZaIzmeniKnjige, this.boje, "boja");
    this.kreirajSelekt("imeZanraZaIzmenu form-select", divZaIzmeniKnjige, this.police, "imeZanr");

    const dugmeZaIzmeniKnjigu = document.createElement("button");
    dugmeZaIzmeniKnjigu.innerHTML = "Izmeni knjigu";
    dugmeZaIzmeniKnjigu.className = "dugmeZaIzmeniKnjigu btn btn-success";
    divZaIzmeniKnjige.appendChild(dugmeZaIzmeniKnjigu);
    dugmeZaIzmeniKnjigu.onclick = (ev) => {
      //pokupimo sve vrednosti koje su unete za dodaj knjigu
      let vrednostiKnjigeKojuMenjamo = {
        idKnjigeVrednost: this.glavniKontejner.querySelector(".idKnjigeZaIzmenu").value,
        imeKnjigeVrednost: this.glavniKontejner.querySelector(".nazivKnjigeZaIzmenu").value,
        imeAutoraVrednost: this.glavniKontejner.querySelector(".imeAutoraZaIzmenu").value,
        idPoliceVrednost: this.glavniKontejner.querySelector(".imeZanraZaIzmenu").value,
        bojaKnjigeVrenost: this.glavniKontejner.querySelector(".bojaKnjigeZaIzmenu").value,
      };

        // Vraca maksimalni broj knjiga koje ima polica u koju zelimo da ubacimo novu knjigu
        let maksBrojKnjiga = this.glavniKontejner.querySelector(`.polica-id-${vrednostiKnjigeKojuMenjamo.idPoliceVrednost}`).getAttribute("data-maksBrKnjiga");

        if (maksBrojKnjiga <= this.prebrojKnjigeUpolici(vrednostiKnjigeKojuMenjamo.idPoliceVrednost) ) {
            // Proverava da li polica ima popunjen kapacitet
            alert("Ova polica je popunjena izaberite neku drugu!");
            return;
        }

      if (vrednostiKnjigeKojuMenjamo.idKnjigeVrednost == "") {
            alert("Popunite polja za izmenu!");
        return;
      } 
      //dodato
     
      //
      else {
        fetch(`https://localhost:5001/Centaar/IzmeniKnjigu/${vrednostiKnjigeKojuMenjamo.idPoliceVrednost}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID: vrednostiKnjigeKojuMenjamo.idKnjigeVrednost,
              ImeKnjige: vrednostiKnjigeKojuMenjamo.imeKnjigeVrednost,
              ImeAutora: vrednostiKnjigeKojuMenjamo.imeAutoraVrednost,
              BojaKnjige: vrednostiKnjigeKojuMenjamo.bojaKnjigeVrenost,
            }),
          }
        ).then((response) => {
          if (response.ok) {
            response.json().then(izmenjenaKnjiga=>{

              // Brisanje stare knjige
              let knjigaZaBrisanje = this.glavniKontejner.querySelector(`.knjiga-id-${vrednostiKnjigeKojuMenjamo.idKnjigeVrednost}`)
              knjigaZaBrisanje.remove(); 

              // Dodavanje izmenjene
              let novaKnjiga = new Knjiga(
                izmenjenaKnjiga.id,
                izmenjenaKnjiga.imeKnjige,
                izmenjenaKnjiga.imeAutora,
                izmenjenaKnjiga.bojaKnjige,
                vrednostiKnjigeKojuMenjamo.idPoliceVrednost
              );
              novaKnjiga.kreirajKnjigu();
            })
          }
           else {
            alert("Greska prilikom upisa.");
          }
        });
      }
    };
  }

  // POMOCNE FUNKCIJE ===//
  dodajPolicu(polica) {
    this.police.push(polica);
  }

  dodajKnjigu(knjiga) {
    this.knjige.push(knjiga);
  }


  // Prebrojavanja knjige unutar izabrane police i vraca koliko ima knjiga
  prebrojKnjigeUpolici(idPolice) {
    
    var element = this.glavniKontejner.querySelector(`.polica-id-${idPolice}`);

    var brojKnjiga = 0;
    var children = element.childNodes.length;
    for (var i = 0; i < children; i++) {
      if (element.childNodes[i].nodeType != 3) {
        brojKnjiga++;
      }
    }
    // console.log(brojKnjiga);
    return brojKnjiga;
  }

  // FUNKCIJE ZA KRAIRNAJE POLJA FORME === //   
  dodajSelekt(imePolice, idPolice) {
    let opcija = this.glavniKontejner.querySelector(".imeZanra");
    let opcijaZaSel = document.createElement("option");
    opcijaZaSel.value = idPolice;
    opcijaZaSel.text = imePolice;
    opcija.add(opcijaZaSel);

    let opcija2 = this.glavniKontejner.querySelector(".imeZanraZaIzmenu");
    let opcijaZaSel2 = document.createElement("option");
    opcijaZaSel2.value = idPolice;
    opcijaZaSel2.text = imePolice;
    opcija2.add(opcijaZaSel2);
  }

  kreirajInputPolje(klasa, tip, placeholder, tipDiv) {
    let inputPolje = document.createElement("input");
    inputPolje.className = klasa;
    inputPolje.type = tip;
    inputPolje.placeholder = placeholder;
    tipDiv.appendChild(inputPolje);
  }

  kreirajSelekt(selektElClass, divTip, tipSelekta, selectType) {
    let selektLista = document.createElement("select");
    selektLista.className = selektElClass;
    divTip.appendChild(selektLista);

    tipSelekta.forEach((element) => {
      let opcija = document.createElement("option");
      opcija.innerHTML = element;
      opcija.value = `${selectType}-${element.id}`;
      opcija.innerHTML = element.name;
      selektLista.appendChild(opcija);
    });
  }
}
