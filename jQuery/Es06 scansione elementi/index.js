"use strict";

let _wrapper = $("#wrapper");

$(document).ready(function(){
    _wrapper = $("#wrapper");

    $("#btn1").on("click", function(){
        //alert($("#wrapper li").children); //css
        alert($("#wrapper").children().length); //jquery
    });

    $("#btn2").on("click", function(){
        let list = $("#wrapper").children(); //restituisce i figli del riferimento
        let msg = "";

        //soluzione 1
        for (let i = 0; i < list.length; i++) {
            // msg += list[i].innerHTML;
            // msg += $(list[i]).html();
            // msg += list.eq[i].html();
        }

        for (let item of list) {
           //msg += $(item).html();    
        }

        list.each(function(i, ref){ 
            //indice e puntatore all'elemento
            //il metodo each richiama la funzione 
            //e modifica inietta i e ref

            //msg += $(ref).html();
            //msg += list.eq(i).html;

            //posso anche non utilizzarlo
            msg += $(this).html();
        });

        alert(msg);
    });

    $("#btn3").on("click", function(){
        //recupero gli li che sono ":nth-of-type(even)"
        $("#wrapper li:nth-of-type(even)").css({"backgroundColor":"#FF0"});
        //recupero i figli che hanno quella caratteristica
        $("#wrapper").children(":nth-of-type(even)").css({"backgroundColor":"#FF0"});
        //filter filtra la collezione dei figli
        $("wrapper").children().filter(":nth-of-type(even)").css({"backgroundColor":"#FF0"});
    });

    $("#btn4").on("click", function(){
        let _dispari = _wrapper.children(":nth-of-type(odd)");
        _dispari.each(function (i, ref) {
            let colore =50*(i);
            $(ref).css({"backgroundColor":`rgb(0, ${colore} ,0)`});
        });
    });
});

function evidenzia(selector){
    _wrapper.children().css("backgroundColor", "");//ripulisce
    _wrapper.children(selector).css({"backgroundColor":"#FF0"});
    //_wrapper.children(selector).css("backgroundColor", "#FF0");
}