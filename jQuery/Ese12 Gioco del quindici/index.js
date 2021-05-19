"use strict"
const DIM = 4;

$(document).ready(function(){
    let wrapper = $("#wrapper")
    creaElementi();
    assegnaValori();

    //funziona solo se gli elementi sono già esistenti
    //wrapper.children("div").on("click",move); 


    wrapper.on("click","div",move);


    function creaElementi(){
        let larghezza;
        let first = true;
        for (let i = 0; i < DIM; i++) {

            for (let j = 0; j < DIM; j++) {
                
            let div = $("<div>").appendTo(wrapper) // senza appendTo non esiste (NAN)
            div.addClass("pedina")
            if(first){
                    larghezza = parseInt(div.css("width"))+
                    parseInt(div.css("margin-left"))*2+
                    parseInt(div.css("border-left-width"))*2+
                    parseInt(div.css("padding-left"))*2;
                    first = false;
            }
            div.css({"top": larghezza*i})
            div.css({"left": larghezza*j})
            div.prop("id","btn-"+i+"-"+j);
            }  
        }
    }

    function assegnaValori(){
        let numeri= new Array(16);
        for (let i = 0; i < numeri.length-1; i++) {
            numeri[i]=(i+1);

        }
        numeri[15] ="";
       let divs=wrapper.children("div");
       divs.each(function(i, ref){ //si scorre i bottoni
            let pos = generaNumero(0,numeri.length-1);
            $(ref).text(numeri[pos]); //come il this
            if(numeri[pos]){
                $(ref).addClass("grigio");
            }
            // andrebbe bene ma potrebbe essere richiamato 2 volte
            //$(ref).on("click",move); 

            numeri.splice(pos,1);
       });
    }

    function generaNumero(a,b){
        return Math.floor((b-a+1)*Math.random())+a;
    }

    function move(){
        let id = this.id; // js
        let id2 = $(this).prop("id");//jQuery
        let aus = id.split('-');
        let i = parseInt(aus[1]);
        let j = parseInt(aus[2]);
        if(j>0 && $(`#btn-${i}-${j-1}`).text()==""){
            scambio($(this),$(`#btn-${i}-${j-1}`));
        }
        else if(i>0 && $(`#btn-${i-1}-${j}`).text()==""){
            scambio($(this),$(`#btn-${i-1}-${j}`));
        }
        else if(i<3 && $(`#btn-${i+1}-${j}`).text()==""){
            scambio($(this),$(`#btn-${i+1}-${j}`));
        }
        else if(j<3 && $(`#btn-${i}-${j+1}`).text()==""){
            scambio($(this),$(`#btn-${i}-${j+1}`));
        }
    }

    function scambio(cella1, cella2){
        cella1.animate({
            "top":cella2.css("top"),
            "left":cella2.css("left"),
            
        },1000); //tempo

        cella2.animate({
            "top":cella2.css("top"),
            "left":cella2.css("left"),
            
        },1000,function() {
            let aus = cella1.prop("id");
            cella1.prop("id",cella2.prop("id"));
            cella2.prop("id",aus);

            if(controllaVincita())
            {
                alert("Bravissimo hai vinto");
            }
        }); //tempo

        
    }

    function controllaVincita(){
        let old = 0;
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
               let n = parseInt($(`btn-${i}-${j}`).text());
               old++;
               if(n!=old && old!=16){
                    return false;
               }
            }
        }
        return true;
    }
})