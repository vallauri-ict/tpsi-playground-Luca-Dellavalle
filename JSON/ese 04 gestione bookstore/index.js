"use strict"
window.onload=function(){
    let json = localStorage.getItem("bookstore_json");
    //alert("json");
    let jsonVet = JSON.parse(json);
    let _table = document.createElement("table");

    //_body è un vettore di elementi con il tag name Body, mettendo le quadre e zero si punta al primo elemento
    let _body = document.getElementsByTagName("body")[0];
    _body.appendChild(_table);

    //crea intestazioni
    creaIntestazioni();
    // leggo e carico dati
    caricaDati();

    //creo DIV dettagli 
    let _divDettagli = document.createElement("div");
    _body.appendChild(_divDettagli);
    _divDettagli.setAttribute("class", "dettagli");

    let indiceLibroCorrente = 0;
    visualizza();

    //creo bottoni gestione
    creaPulsanti();

    function caricaDati(){
        for (let i = 0; i<jsonVet.length ;i++) { //per ogni book
            let item = jsonVet[i];
            let _tr = document.createElement("tr");
            _table.appendChild(_tr); 
    
            let _td
            _td = document.createElement("td");
            _td.innerHTML = item.title;
            _tr.appendChild(_td);
    
            _td = document.createElement("td");
            //authors è un vettore enumerativo e join funziona solo per gli enumerativi
            //join racchiude un vettore in una stringa grazie al separatore indicato
            _td.innerHTML = item.author.join(','); 
            _tr.appendChild(_td);
    
            _td = document.createElement("td");
            _td.innerHTML = item.category;
            _tr.appendChild(_td);
    
            _td = document.createElement("td");
            _td.innerHTML = item.price;
            _tr.appendChild(_td);

            //creazione pulsante 
            _td = document.createElement("td");
            let _button = document.createElement("button");
            _button.innerHTML = "elimina";
            _button.addEventListener("click", eliminaRecord);
            _button.recordDaEliminare = ""+i;
            _td.appendChild(_button);
            _tr.appendChild(_td);
        }
    
    }

    function eliminaRecord(){
        jsonVet.splice(this.recordDaEliminare,1);
        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
        window.location.reload();
    }

    function creaIntestazioni(){
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni=["title","authors","category","price",""];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function visualizza(){
        _divDettagli.innerHTML=""
        let libroCorrente = jsonVet[indiceLibroCorrente];
        for (const key in libroCorrente) {
            //creo l'intestazione
            let _p1 = document.createElement("p");
            _p1.innerHTML = key +": ";
            _p1.style.textAlign = "right";
            _p1.style.fontWeight = "bold";
            _divDettagli.appendChild(_p1);

            //creo il contenuto
            let _p2 = document.createElement("p");
            _p2.innerHTML = libroCorrente[key];
            _divDettagli.appendChild(_p2);
        }
  
    }


    function creaPulsanti(){
        let _divPulsantiNavigazione = document.createElement("div");
        _divPulsantiNavigazione.setAttribute("class","contenitorePulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);
        let nomiPulsanti =["primo","indietro","avanti","ultimo","aggiungi","elimina per categoria"];
        for (const item of nomiPulsanti) {
            let _button = document.createElement("button");
            _button.innerHTML = item;
            _button.style.padding = "5px 10px";
            //assegno com id lo stesso nome del pulsante cos' da poterci accedere da altre procedure
            _button.id = item;
            _button.setAttribute("class","PulsantiNavigazione");
            _button.addEventListener("click", gestionePulsanti);
            _divPulsantiNavigazione.appendChild(_button);
        }
        document.getElementById("indietro").disabled = true;
    }

    function gestionePulsanti(){
        let _indietro = document.getElementById("indietro");
        let _avanti = document.getElementById("avanti");
        switch (this.innerHTML) {
            case "primo":
                indiceLibroCorrente = 0;
                _indietro.disabled = true;
                _avanti.disabled = false;
                break;
            case "avanti":
                indiceLibroCorrente++;
                _indietro.disabled = false;
                if(indiceLibroCorrente == jsonVet.length - 1){
                    _avanti.disabled = true;
                }
                break;
            case "indietro":
                indiceLibroCorrente--;
                if(indiceLibroCorrente == 0){
                    _indietro.disabled = true;
                }
                break;
            case "ultimo":
                indiceLibroCorrente = jsonVet.length - 1;
                _avanti.disabled = true;
                _indietro.disabled = false;
            break;
            case "aggiungi":
               // window.location.href ="pagina2.html";
               window.open("pagina2.html");
            break;
            case "elimina per categoria":
                //ricerca sequenziale sulla categoria e slice sul vettore
                let categoria = prompt("inserisci la categoria da cancellare"); // alert con input
                let qta = 0;
                for (let i = jsonVet.length-1; i >= 0; i--) {
                   if(jsonVet[i].category == categoria){
                       jsonVet.splice(i,1);
                       qta++;
                   }
                    
                }
                if(qta == 0){
                    alert("nessun record trovato");
                }
                else{
                    alert("sono stati cancellati "+ qta +" record");
                    //serializzare, trasformo da oggetto a stringa per il server
                    localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
                    window.location.reload();
                }
                
             break;
        }
        visualizza();
    }
}