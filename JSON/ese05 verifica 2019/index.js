"use strict";
window.onload=function(){  
    let intestazione = ["","id","name","alcohlic","main ingredient",""];
    let larghezza = [40, 40, 60, 70, 70, 40] ;
    let _listBox = document.getElementById("lstIngredienti");
    let _table = document.getElementById("table");
    let vetIngredienti = ingredients["ingredients"];
    vetIngredienti.sort(function(record1, record2){
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if(str1 < str2){
                return -1;
            }
            else if(str1 > str2){
                return 0;
            }
        }
    );
    // console.log(vetIngredienti);
    let _optTutti = document.getElementById("optTutti");
    let _optAlcoholic = document.getElementById("optAlcoholic");
    let _optNonAlcoholic = document.getElementById("optNonAlcoholic");

    //caricamento listBox
    caricaListaIngredienti();
    //carica cocktails
    caricaCocktails();
    //radio button
    
    _optTutti.addEventListener("click",caricaCocktails);
    _optAlcoholic.addEventListener("click",caricaCocktails);
    _optNonAlcoholic.addEventListener("click",caricaCocktails);

    _listBox.addEventListener("change", caricaCocktails);
    
//************************************************************************

    function caricaCocktails(){
         // accedo al file cocktails.drinks
         _table.innerHTML="";
        let vetCocktails = cocktails.drinks;
        creaIntestazione(intestazione, larghezza);
        for (const item of vetCocktails) {
            if(((_optTutti.checked) || (item.strAlcoholic == "Alcoholic" && _optAlcoholic.checked) || ((_optTutti.checked)  || (item.strAlcoholic == "Non alcoholic" && _optNonAlcoholic.checked))) 
            && (_listBox.value == "" || item.strIngredient1))
            {
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);
                //immagine img
                let _td = document.createElement("td");
                let _img = document.createElement("img");
                _tr.appendChild(_td);
                _td.appendChild(_img);
                _img.src = item.strDrinkThumb; 
                _img.style.width = "40px"

                //id 
                _td=document.createElement("td");
                _tr.appendChild(_td)
                _td.innerHTML = item.idDrink;

                //name
                _td=document.createElement("td");
                _tr.appendChild(_td)
                _td.innerHTML = item.strDrink;

                //alcholic
                _td=document.createElement("td");
                _tr.appendChild(_td)
                _td.innerHTML = item.strAlcoholic;

                //main ingredient
                _td=document.createElement("td");
                _tr.appendChild(_td)
                _td.innerHTML = item.strIngredient1;

                //dettagli
                _td=document.createElement("td");
                _tr.appendChild(_td)
                let _a = document.createElement("a");
                _td.appendChild(_a);
                _a.href="#";
                _a.idDrink=item.idDrink;
                _a.addEventListener("click", visualizzaDettagli);
                _a.innerHTML = "dettagli";
            }
            
        }
    }

    function visualizzaDettagli(){
        let _divDettagli = document.getElementById("dettagli");
        //pulizia DIV
       _divDettagli.innerHTML = "";
       for (const item of cocktails.drinks) {
            if(item.idDrink == this.idDrink){
                let _h3 = document.createElement("h3");
                //name
                _h3.innerHTML = item.strDrink;
                _divDettagli.appendChild(_h3);
                let ingredienti="";
                for (let i = 0; i <= 5; i++) {
                    //accedo a strIngredient1,strIngredient2,.....grazie alla i
                    if(item["strIngredient"+i] != null)
                    {
                        ingredienti += item["strIngredient"+i] +"-";
                    }
                   
                } 
                //ingredienti
                let _p = document.createElement("p");
                _p.innerHTML = ingredienti;
                _divDettagli.appendChild(_p);

                // img
                let _img = document.createElement("img");               
                _img.style.width="140px";
                _img.src = item.strDrinkThumb;
                _divDettagli.appendChild(_img);
                break;
            }
           
       }

    }

    function caricaListaIngredienti(){
        for (const item of vetIngredienti) {
            let _option = document.createElement("option");
            _option.text=item["strIngredient1"];
            _listBox.appendChild(_option);
        }
    }

    function creaIntestazione(intestazione, larghezza) {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        for (let i = 0; i < intestazione.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazione[i];
            _th.style.width =larghezza[i]+"px"; 
            _tr.appendChild(_th);
        }
        
        
    }
}
