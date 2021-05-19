"use strict";
let nazio = [];
let vetJson;
let vetIntestazione = ["name","username","state","nat","img"];
let _lstNazioni;
let _divDettagli;
let eliminati = [];
window.onload=function(){
    vetJson = json.results;
    _lstNazioni = document.getElementById("lstNazioni");
    _lstNazioni.addEventListener("change", caricaDati);
    _divDettagli = document.getElementById("dettagli");
    _divDettagli.style.lineHeight=0;

    for (const item of vetJson) {
        if(inserimento(item.nat)){
            let _option = document.createElement("option");
            _option.innerHTML=item.nat;
            nazio.push(item.nat);
            _lstNazioni.appendChild(_option);
        }  
    }

    //intestazione
    creaIntestazione();
    //carica dati
    caricaDati();
    






    function visualizzatoreDettagli(){
        _divDettagli.innerHTML="";
        let i; 
        for (i = 0; i < vetJson.length; i++) {
            if(vetJson[i].login.username == this.idItem){
                break;
            }    
        }
        let _imgLarge = document.createElement("img");
        _divDettagli.appendChild(_imgLarge);
        _imgLarge.src = vetJson[i].picture.large;
        caricaDati();  
        
        //name
        let _p = document.createElement("p");
        _p.innerHTML=vetJson[i].name.first +" "+ vetJson[i].name.last;
        _divDettagli.appendChild(_p);

        //email
        _p = document.createElement("p");
        _p.innerHTML=vetJson[i].email;
        _divDettagli.appendChild(_p);

        //phone
        _p = document.createElement("p");
        _p.innerHTML=vetJson[i].phone;
        _divDettagli.appendChild(_p);

        //cell
        _p = document.createElement("p");
        _p.innerHTML=vetJson[i].cell;
        _divDettagli.appendChild(_p);

        //elimina
        let _button = document.createElement("button");
        _button.innerHTML="elimina";
        _button.addEventListener("click", eliminaRecord);
        _button.idItem = this.idItem;
        _divDettagli.appendChild(_button);
    }

    function eliminaRecord(){
        _divDettagli.innerHTML="";
        eliminati.push(this.idItem);
        caricaDati();
    }

    function caricaDati(){
        let _tbody = document.getElementById("tbody");
        _tbody.innerHTML="";
        let i=0;
        for (const item of vetJson) {
            if(_lstNazioni.value == item.nat || _lstNazioni.value == "tutti" && !eliminati.includes(item.login.username)){
                let _tr = document.createElement("tr");
                let _td = document.createElement("td");
                
                //name + spazio + second name
                _td.innerHTML= item.name.first +" "+item.name.last;
                _tr.appendChild(_td);
    
                //username
                _td = document.createElement("td");
                _td.innerHTML = item.login.username;
                _tr.appendChild(_td);
    
                //state
                _td = document.createElement("td");
                _td.innerHTML = item.location.state;
                _tr.appendChild(_td);
                
                // nat
                _td = document.createElement("td");
                _td.innerHTML = item.nat;
                _tr.appendChild(_td);
    
                //img(link)
                _td = document.createElement("td");
                let _img = document.createElement("img");
                _td.appendChild(_img);
                _tr.appendChild(_td);
                _img.style.width ="50px";
                _img.src = item.picture.thumbnail;
                _img.idItem = item.login.username;
                _img.addEventListener("click", visualizzatoreDettagli);
                _tbody.appendChild(_tr);
            }
        }
    }
    
    
    
    function inserimento(nat){
        if( nazio.indexOf(nat) == -1 ) {
            return true;
        }
        else{
            return false;
        }
    }
    
    function creaIntestazione(){
        let _tr = document.createElement("tr");
        let _thead = document.getElementById("thead");
        for (let i = 0; i < vetIntestazione.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = vetIntestazione[i];
            _tr.appendChild(_th);
        }
        _thead.appendChild(_tr);
    }
        
    
}





