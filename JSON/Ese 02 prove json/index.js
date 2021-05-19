"use strict"

window.onload=function() {
    let studente = { "nome" : "mario",
        "cognome" : "rossi",
        "eta" : 16,
         "studente" : true,
        "images" : ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
        "hobbies" : [], // vettore al momento vuoto 
        "pos": { "x": 40, "y": 300 }, // oggetto annidato
        "stampa" : function () { alert("Hello " + this.nome); },
        "fullName" : function () { return this.nome + " " + this.cognome; }
    };

    console.log(studente["eta"]);
    studente.eta++;
    console.log(studente.fullName()); //fa partire il metodo
    console.log(studente["fullName"]()); //identico a quello prima
    console.log(studente.fullName); // stampa il contenuto della chiave

    //aggiunta di una nuova chiave
    studente["residenza"] = "Fossano"; // aggiunta dinamica facendo l'accesso
    studente.classe = "4B INFO"; // aggiunta dinamica facendo l'accesso
    console.log(studente.residenza);
    if("classe" in studente){ //ricerca la chiave nell'elemento
        console.log(studente["classe"]);
    }
    else{
        console.log("CHIAVE INESISTENTE");
    }

    //dichiarazione di un nuovo object
    let studente2={};
    studente2.nome = "pluto";
    studente2.residenza = "Alba";

    //sansione delle proprietà di un oggetto ciclo FORIN
    console.log("STUDENTE 2");
   for (let key in studente2) {
       // inutile perchè se si controlla l'esistenza di proprietà già esistenti saranno sempre esistenti
       if (studente2.hasOwnProperty(key)) { 
           console.log(key + " = " + studente2[key]);// senza le virgolette perchè se no andrebbe a cercare 
       }
   }
   console.log("STUDENTE");
   for (let key in studente) {
        // inutile perchè se si controlla l'esistenza di proprietà già esistenti saranno sempre esistenti
        //if (!studente[key].toString().includes("function")) { 
        if(typeof(studente[key]) != "function"){         
            console.log(key + " = " + studente[key]);// senza le virgolette perchè se no andrebbe a cercare 
        }
    }

    //serializzazione di un oggetto
    console.log(studente); //serializza in automatico
    alert(studente); // non serializza 
    alert(JSON.stringify(studente)); // alert con serializzazione

    //vettore enumerativo delle chiavi
    let key = Object.keys(studente);//restituisce un vettore enumerativo
    for (let iterator of key) { //per scandire i valori di vettori enumerativi
        console.log(iterator);
    }
}