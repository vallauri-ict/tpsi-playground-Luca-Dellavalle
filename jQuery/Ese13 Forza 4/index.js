"use strict"
const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "rgb(255, 255, 0)";
const ROSSO = "rgb(255, 0, 0)";
const GRIGIO = "#BBB";
let turno = GIALLO;
$(document).ready(function() {
    let wr = $("#wrapper");
    let hd = $("#header");
    //crezione pedine header
    for (let i = 0; i < COLONNE; i++) {
        let pedina = $("<div>");
        pedina.addClass("pedina");
        pedina.appendTo(hd);
        pedina.hover(
                function(){
                    $(this).css("background-color",turno);
                    $(this).css({"background-color":turno});
                },
                function(){
                    $(this).css("background-color",GRIGIO);
                    $(this).css({"background-color":GRIGIO});
                });
    }



    //creazione pedine wrapper
    for (let i = 0; i < RIGHE; i++) {
         for (let j = 0; j < COLONNE; j++) {
            let pedina = $("<div>");
            pedina.addClass("pedina");
            pedina.appendTo(wr);
            pedina.prop("id",`btn-${i}-${j}`)
        }
    }


    //metodo delegated event
   /* 
    hd.on("mouseenter","div",function(){$(this).css("backgroundColor",turno)});
    hd.on("mouseleave","div",function(){$(this).css("backgroundColor",GRIGIO)});
   */

   hd.on("click","div",down);

   function down(){
        
        //restituisce l'indice di this all'interno di HD
        let colonna = hd.children("div").index($(this));
        let riga = RIGHE-1;
       for (let i = 0; i < RIGHE; i++) {
           let p = $(`btn-${i}-${colonna}`);
           if(p.css("backgroundColor") != GRIGIO){
                riga = i-1;
                break;
           }
       }
       if(riga!=-1){
           let pedina = $("<div>");
           pedina.appendTo(wr)
            pedina.addClass("pedina");
            pedina.css({"backgroundColor":turno,
                        "position":"absolute",
                        "top":-60,
                        "left":colonna*60+5});
            hd.off("click");
            pedina.animate({"top":riga*60},200*(riga+1),function(){
                hd.on("click","div",down);
            })


            if(turno == GIALLO){
                turno = ROSSO; 
            }
            else{
                turno = GIALLO;
            }
       }
       

   }


});