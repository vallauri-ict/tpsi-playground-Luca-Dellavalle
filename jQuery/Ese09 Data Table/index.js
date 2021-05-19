"use strict";

$(document).ready(function(){
    let finalUrl = "https://randomuser.me/api"
    let _table = $("#wrapper table")
    $.ajax({ //parsifica già automaticamente
        "url": finalUrl+"?results=50",
         //data rappresenta il json ricevuto dal server già parsificato
        "success": function (data){
            console.log(data)
            for (const person of data.results) {
                let tr = $("<tr>")
                tr.appendTo(_table.children("tbody"))

                let name = person.name.first +" "+ person.name.last
                $("<td>").appendTo(tr).text(name) //crea td appendi a tr e scrivi il nome
                $("<td>").appendTo(tr).text(person.nat) //nazionalità
                $("<td>").appendTo(tr).text(person.location.country) // country
                $("<td>").appendTo(tr).text(person.location.state) //stato
                $("<td>").appendTo(tr).text(person.cell)
                let td = $("<td>").appendTo(tr)
                $("<img>").appendTo(td).prop("src",person.picture.medium) //appendo img a td e tutto a tr
            }
            //se lancio .DataTable() prima che 
            _table.DataTable({
                "bPaginate":true,   // paginazione dei record da visualizzare
                "bLengthChange":true,// n. di record per pagina
                "bFilter":true, //ricerca della voce impostata
                "bSort":true //ordinamento dei record sul click
            });
        },
        "error": errore
    })
})



















































function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}