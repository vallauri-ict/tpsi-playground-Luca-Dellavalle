"use strict"

let _form1;
$(document).ready(function(){
    _form1 = $("#form1");

});

function visualizza(codice){
    let msg="";
    let _chk;
    let _opts;
    switch (codice) {
        case 1:
            msg = _form1.find("input[type=text]:first-of-type").val();   // accede in lettura
            break;
    
        case 2:
            //seconda label
            //msg = _form1.children("label:nth-of-type(2)");
            //msg = _fomr1.children("label").ed(1);  (selettore numerico)
            msg = _form1.children("label").filter(":nth-of-type(2)").children("select").val(); //(selettore css) e tag select
            break;
        case 3:
            _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]");
            for (let i = 0; i < _chk.length; i++) {
                //output on se non trova il value
                msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val()+"\n";  
            }

            break;
        case 4:
            _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
            _chk.each(function(i,ref){
                 //output on se non trova il value
                 msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val()+"\n"; 
            });
            break;
        case 5:
        _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
        _chk.each(function(i,ref){
                //output on se non trova il value
                msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val()+"\n"; 
        });

        case 6:
            _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]:checked");
            if(_opts.is(":checked")){
                msg == _opts.filter(":checked").val();        
            }
            else{
                msg="Nessun radio button selezionato"
            }
            break;
        case 7:
            _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]".not(":checked"));
            _opts.each(function(i, ref){
                msg += $(ref).val() +"\n";
            })
            break;
        case 8:
            //let _select = _form1.children("select:last -of-type");
            let _select = _form1.find("select").last();
            _select.children("option:selected").each(function (i, ref) {
                msg += $(ref).val() +" - ";
            });
            msg += "\n";
            let _selected = _select.val();
            for(let item of _select.val()){
                msg += item + " - "
            }
            break;
           
        default:
            break;
    }
    alert(msg);
}

function imposta(codice){
    switch (codice) {
        case 1:
            _form1.find("input[type=text]").first().val("nuovo valore");
            break;
        case 2:
            //_form1.find("select").first().prop("selectedIndex",1);
            _form1.find("select").first().children("option").eq(2).prop("selected",true);
           
            break;   
        case 3:
            //eq(n) elemento della collezione
            let chks = _form1.children("fieldset").eq(0).find("input[type=checkbox]");
            chks.first().prop("checked", true);
            chks.eq(1).prop("checked", true);
            //utlizzato anche in scrittura con il value delle voci da selezionare
            chks.val(["opzione 1","opzione 3"])
            break;
        case 4: 
            _form1.children("fieldset").eq(1).find("input[type=radio]").eq(1).prop("checked", true);
            break;
        case 5:
            let select = _form1.children("select").last();
            select.children("option").eq(1).prop("selected", true);
            select.children("option").eq(2).prop("selected", true);
            select.val(["2","3"]);
            break;
        default:
            break;
    }
}