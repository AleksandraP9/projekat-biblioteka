// import { Biblioteka } from "./biblioteka.js";
// import { Polica } from "./polica.js";

// export class Forma{

//     constructor(){
//         this.brKnjiga = null;
//         this.miniKontejner = null;
//         this.police = [];
//     }

    // dodajPolicu(polica){
    //     this.police.push(polica);

    // }

    //da crta obe forme i za knjigu i za zanr
    // crtajForme(host){

    //     let divZaForme = document.createElement("div");
    //     divZaForme.className = "divZaForme";
    //     host.appendChild(divZaForme);

    //     this.miniKontejner = document.createElement("div");
    //     this.miniKontejner.className = "miniKont";
    //     divZaForme.appendChild(this.miniKontejner);

    //     let divZaDodavanjeKnjige = document.createElement("div");
    //     divZaDodavanjeKnjige.className = "divZaDodavanjeKnjige";
    //     this.miniKontejner.appendChild(divZaDodavanjeKnjige);
    //     //divZaForme.appendChild(divZaDodavanjeKnjige);
        
    //     let naslovForme1 = document.createElement("h3");//naslov Dodaj Knjigu, naslov forme divZaDodavanjeKnjige
    //     naslovForme1.className = "naslovForme1";
    //     naslovForme1.innerHTML = "DODAJ KNJIGU";
    //     divZaDodavanjeKnjige.appendChild(naslovForme1);

    //     this.kreirajInputPolje("nazivKnjige", "text", "Naziv knjige", divZaDodavanjeKnjige);
    //     this.kreirajInputPolje("imeAutora", "text", "Ime autora", divZaDodavanjeKnjige);
    //     this.kreirajSelekt("bojaKnjige", divZaDodavanjeKnjige, this.boje, "boja");
    //     this.kreirajSelekt("imeZanra", divZaDodavanjeKnjige, this.police, "imeZanr"); 

    //     const dugmeZaDodajKnjigu = document.createElement("button");
    //     dugmeZaDodajKnjigu.innerHTML = "Dodaj knjigu";
    //     dugmeZaDodajKnjigu.className = "dugmeZaDodajKnjigu";
    //     divZaDodavanjeKnjige.appendChild(dugmeZaDodajKnjigu);
    //     dugmeZaDodajKnjigu.onclick = (ev) => {

    //         //pokupimo sve vrednosti koje su unete za dodaj knjigu
    //         let vrednostiKnjigeKojuDodajemo = {
    //             imeKnjigeVrednost: this.miniKontejner.querySelector(".nazivKnjige").value,
    //             imeAutoraVrednost: this.miniKontejner.querySelector(".imeAutora").value,
    //             imePoliceVrednost: this.miniKontejner.querySelector(".imeZanra").value,
    //             bojaKnjigeVrenost: this.miniKontejner.querySelector(".bojaKnjige").value,
    //         };
            
    //         if(vrednostiKnjigeKojuDodajemo.imeKnjigeVrednost == "") {
    //             alert("Popunite upit!");
    //             return;
    //         }

    //         //let destinacijaKnjige = this.miniKontejner.querySelector(`.${vrednostiKnjigeKojuDodajemo.imePoliceVrednost}`);
    //         //console.log(vrednostiKnjigeKojuDodajemo.imePoliceVrednost);

            
    //     }

    //     let divZaDodavanjeZanra = document.createElement("div");
    //     divZaDodavanjeZanra.className = "divZaDodavanjeZanra";
    //     this.miniKontejner.appendChild(divZaDodavanjeZanra);
    //     //divZaForme.appendChild(divZaDodavanjeZanra);

    //     let naslovForme2 = document.createElement("h3");//naslov Dodaj Zanr, naslov forme divZaDodavanjeZanra
    //     naslovForme2.className = "naslovForme2";
    //     naslovForme2.innerHTML = "DODAJ ZANR";
    //     divZaDodavanjeZanra.appendChild(naslovForme2);

    //     this.kreirajInputPolje("zanrIme", "text", "Ime zanra", divZaDodavanjeZanra);
    //     this.kreirajInputPolje("maksBrKnjiga", "number", "Maksimalni broj knjiga", divZaDodavanjeZanra);

    //     const dugmeZaDodajZanr = document.createElement("button");
    //     dugmeZaDodajZanr.innerHTML = "Dodaj zanr";
    //     dugmeZaDodajZanr.className = "dugmeZaDodajZanr";
    //     divZaDodavanjeZanra.appendChild(dugmeZaDodajZanr);
    //     dugmeZaDodajZanr.onclick = (ev) => {
    //             const imeZanraVrednost = this.miniKontejner.querySelector(".zanrIme").value;//pokupimo vrenost koju je korinik uneo za ime zanra
    //             const maksBrKnjigaVrenost = this.miniKontejner.querySelector(".maksBrKnjiga").value;//pokupimo vrednost koji je korinik uneo za maksimalan broj knjiga u jednom zanru

                

    //             if(imeZanraVrednost == "" || maksBrKnjigaVrenost == "")
    //                 alert("Morate popuniti upit");

    //             else{

    //                 fetch("https://localhost:5001/Centaar/UpisPolice/" + Biblioteka.id, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     },
    //                     body: JSON.stringify({
    //                         imePolice: imeZanraVrednost,
    //                         MaxBrKnjiga: maksBrKnjigaVrenost
    //                     })
    //                 }).then(p => {
    //                     if(p.ok) {
    //                         this.police.azurirajPolicu(imePolice, MaxBrKnjiga);}
    //                     else{
    //                         alert("Greska prilikom upisa.");
                        
    //                     }
    //                 });
                        
        
    //                 let divZaPolice = document.createElement("div");
    //                 divZaPolice.className = "divZaPolice";
    //                 host.appendChild(divZaPolice);

    //                 let polica = new Polica(imeZanraVrednost, maksBrKnjigaVrenost);
    //                 this.dodajPolicu(polica);
    //                 polica.crtajPolice(divZaPolice);
                
    //                 this.dodajSelekt(polica.imePolice);//Zove funkciju koja dodaje ime zanra u selekt
    //             }


    //         }

    // }

    //funkcija koja dodaje opcije u selekt za odabir zanra
//     dodajSelekt(imePolice) 
//                 {
//                     let opcija = this.miniKontejner.querySelector(".imeZanra");
//                     let opcijaZaSel = document.createElement("option");
//                     opcijaZaSel.text = imePolice;
//                     opcija.add(opcijaZaSel);
//                 }

//      boje = [
//      {
//          id: 1,
//          name: "Crvena",
//          value: "#EF4444",
//     },
//      {
//          id: 2,
//          name: "Plava",
//          value: "#60A5FA",
//      },
//      {
//          id: 3,
//          name: "Roze",
//          value: "#F472B6",
//      },
//      {
//          id: 4,
//          name: "Zelena",
//          value: "#34D399",
//      },
//      {
//          id: 5,
//          name: "Zuta",
//          value: "#FCD34D",
//      },
//      {
//          id: 6,
//          name: "Siva",
//          value: "#9CA3AF",
//      },
//      {
//          id: 7,
//          name: "Ljubicasta",
//          value: "#8B5CF6",
//      },
//      ];

  

//     kreirajInputPolje(klasa, tip, placeholder, tipDiv){
//         let inputPolje = document.createElement("input");
//         inputPolje.className = klasa;
//         inputPolje.type = tip;
//         inputPolje.placeholder = placeholder;
//         tipDiv.appendChild(inputPolje);
//     }

//     kreirajSelekt(selektElClass, divTip, tipSelekta, selectType){
//         let selektLista = document.createElement("select");
//         selektLista.className = selektElClass;
//         divTip.appendChild(selektLista);

//         tipSelekta.forEach(element => {
//             let opcija = document.createElement("option");
//             opcija.innerHTML = element;
//             opcija.value = `${selectType}`;
//             opcija.innerHTML = element.name;
//             selektLista.appendChild(opcija);
//         });
    
//     }

// }