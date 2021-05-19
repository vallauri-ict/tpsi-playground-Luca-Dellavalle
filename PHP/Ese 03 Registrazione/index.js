"use strict"

$(document).ready(function(){
    $("select[name=lstCitta]")
    $("#btnInvia").on("click",function(){

        let msg = "";
        if($("#txtNome").val()=="")
            msg += "Nome mancante </br>";
        if($("input[name=optIndirizzo]:checked").lenght == 0)
            msg = "indirizo di studio non selezionato </br>";
        if($("select[name=lstCitta]").prop("selectedIndex") == -1)
            msg="città non selezionata";
        if(msg != "")
            $("#msg").html(msg);
        else{
            $("#msg").html("");
            let form = $("#form1")
            form.prop("action","pagina2.php")
            form.prop("method","get")
            form.submit();
        }
    })
})