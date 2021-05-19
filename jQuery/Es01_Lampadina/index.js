"use strict";

$(document).ready(function(){
    //l'operatore $ restituisce sempre una collezione jQuery, un vettore
    let _lampadina = $("#lampadina");
    let _btnSpegni = $("#btnSpegni");
    let _btnAccendi = $("#btnAccendi");
    let _descrizione = $("#descrizione");
    let _contenuto = $("#contenuto");

    _btnSpegni.hide(); // nascondo l'oggetto (ma è come se nascondessi tutti gli elementi del vettore)
    _lampadina.hide();

    _btnAccendi.on("click", function(){
        _lampadina.addClass("accesa");
        _lampadina.fadeIn(2000, function() {
            _btnSpegni.show();
            _btnAccendi.hide();
        });
       
    });
     
    _btnSpegni.on("click", function(){
        _lampadina.fadeOut(2000, function() {
            _btnAccendi.show();
            _btnSpegni.hide();
            
        });
        _lampadina.removeClass("accesa");
    });

    let descrizione = {
        "width":"160px",
        "height":"40px",
        "text-align":"center",
        "lineHeight":"40px",
        "background-color":"#aaa",
        "textDecoration":"underline",
        "fontSize":"14pt",
        "cursor":"pointer",
        "borderRadius":"10px",
        "margin-left":"10px"
    };

    _descrizione.css(descrizione);
    _contenuto.hide();

    //contenuto
    _descrizione.on("mouseover",function() {
        _contenuto.slideDown(1000);
    });
    _descrizione.on("mouseout",function() {
        _contenuto.slideUp(1000);
    });
    
});