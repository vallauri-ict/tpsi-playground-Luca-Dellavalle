"use strict"

 $(document).ready(function(){
      //animazione header
     let _header = $("#header");
     let alt = parseInt(_header.css("height"));
     let lungh = parseInt(_header.css("width"));
     let font = parseInt(_header.css("font-size"));
     let line = parseInt(_header.css("line-height"));
     _header.animate({width:(lungh*15), height:(alt*15), fontSize:(font*15), lineHeight:(line*15)},1500,visualizzazioneDomande);


     let _mainSection;
     function visualizzazioneDomande(){
          //visualizzazione domande
          _mainSection = $("#mainSection");
          let _fieldset = $("<fieldset>");
          let _legend = $("<legend>");
         // _legend.html(elencoDomande[0].argomento);
          for (const item in elencoDomande) {
               let _fieldset = $("<fieldset>");
               let _legend = $("<legend>");
               _legend.html(elencoDomande[item].argomento);
               for (let i = 0; i < 10; i++) {
                    let _lbl = $("<label>");
                    _lbl.text(elencoDomande[item].domande[i].domanda);
                    let _rdb1 = $("<input>");
                    _rdb1.attr("name","rdb"+i+"-"+item);
                    _rdb1.attr("type","radio");
                    let str1 = $("<span>");
                    str1.html("T");
                    _rdb1.val("T");
                    let _rdb2 = $("<input>");
                    _rdb2.attr("name","rdb"+i+"-"+item);
                    _rdb2.attr("type","radio");
                    let str2 = $("<span>");
                    str2.html("F");
                    _rdb2.val("F");
                    let br = $("<br>");
                    _lbl.appendTo(_fieldset);
                    _rdb1.appendTo(_fieldset);
                    str1.appendTo(_fieldset);
                    _rdb2.appendTo(_fieldset);
                    str2.appendTo(_fieldset);
                    br.appendTo(_fieldset);
               }
               _legend.appendTo(_fieldset);
               _fieldset.appendTo(_mainSection);
          }

          //timer
          let spanMin = $("<span>");
          spanMin.html("00");
          let spanSec = $("<span>");
          let divisore = $("<span>");
          divisore.html(":");
          let Time = $("#timer");
          spanMin.appendTo(Time);
          divisore.appendTo(Time);
          spanSec.appendTo(Time);
          spanSec.html("00");
          let timeSec = 0;
          let timeMin = 0;

         let tempoTr = setInterval(() => {
              if(timeMin==2){
                   clearInterval(tempoTr);
                   controlloEsame();
              }
              else{
                    if(timeSec < 60){
                         spanSec.html(pad(timeSec));
                         timeSec++;
                    }
                    else {
                         spanSec.html("00");
                         timeSec = 0;
                         timeMin++;
                         spanMin.html(pad(timeMin));
                    }
              }     
         }, 1000);

         

          //button invia
          let btnInvia = $("<button>");
          btnInvia.html("INVIA");
          btnInvia.appendTo($("#wrapper"));
          btnInvia.on("click",function (){
               clearInterval(tempoTr);
               //btnInvia.attr("disabled","disabled");
               btnInvia.css({"color":"#999", "backgroundColor":"#ccc"});
               //controlloEsame
               controlloEsame();
          });
     }

     function controlloEsame(){
          let punti = 0;
          let j = 0;
          for (const item in elencoDomande) {
               for(let i = 0;i<10;i++){
                   if(_mainSection.children().eq(item).children("input").eq(i*2).is(':checked') == true){
                         if(elencoDomande[item].domande[i].risposta == _mainSection.children().eq(item).children("input").eq(i*2).val()){
                              punti++;
                         }
                         else{ 
                              punti-=0.25;
                              _mainSection.children().eq(item).children("span").eq((i*2)+1).addClass("error");
                         }
                    }
                    else if(_mainSection.children().eq(item).children("input").eq((i*2)+1).is(':checked') == true){
                         j++;
                         if(elencoDomande[item].domande[i].risposta == _mainSection.children().eq(item).children("input").eq((i*2)+1).val()){
                              punti++;
                         }
                         else{
                              punti-=0.25;
                              _mainSection.children().eq(item).children("span").eq(i*2).addClass("error");
                         }
                         j++;
                    }
               }    
          }
          //risultato 
          alert("IL RISULTATO DEL TUO ESAME E' il SEGUENTE : \n\n          "+punti+" su 30   "+j+" button   ");
     }
 });


 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
