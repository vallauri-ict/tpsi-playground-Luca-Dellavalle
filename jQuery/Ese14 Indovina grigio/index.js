"use strict"
let wr;
$(document).ready(function() {
    wr = $("#wrapper");
    wr.css("background-color","#FF9");
    wr.offset().left;
    creazioneBox();
    generazioneColori();

    function generazioneColori(){

    }

    function creazioneBox(){
        for (let i = 0; i < 9; i++) {
            let box = $("<div>");
            box.addClass("box");
            wr.append(box);
        }
    }

    function generaNumero(a,b){
        return Math.floor((b-a+1)*Math.random())+a;
    }
});