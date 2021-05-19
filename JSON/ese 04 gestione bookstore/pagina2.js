"use strict";
let _txtCategoria;
let _txtTitolo ;
let _txtAutore;
let _txtLingua;
let _txtAnno;
let _txtPrezzo;
let jsonVet ;
window.onload=function(){
    _txtCategoria = document.getElementById("txtCategoria") ;
    _txtTitolo = document.getElementById("txtTitolo") ;
    _txtAutore = document.getElementById("txtAutore") ;
    _txtLingua = document.getElementById("txtLingua") ;
    _txtAnno = document.getElementById("txtAnno") ;
    _txtPrezzo = document.getElementById("txtPrezzo") ;
    let json = localStorage.getItem("bookstore_json");
    //alert("json");
    jsonVet = JSON.parse(json);

}

function salva(){
    let jsonLibroAggiunto = {};
    jsonLibroAggiunto.category = _txtCategoria.value;
    jsonLibroAggiunto.author = [_txtAutore.value]; // inserisce i dati come un vettore
    jsonLibroAggiunto.lang = _txtLingua.value;
    jsonLibroAggiunto.title = _txtTitolo.value;
    jsonLibroAggiunto.year = _txtAnno.value;
    jsonLibroAggiunto.price = _txtPrezzo.value;
    jsonVet.push(jsonLibroAggiunto);
    //serializzare
    localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
    ricarica();
}

function ritorna(){
    ricarica();
}

function ricarica(){
    window.open("index.html");
}