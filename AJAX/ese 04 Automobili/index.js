"use strict"

const URL = "http://localhost:3000"

let intestazione = [
    {
        "tag":"th",
        "text":"nome",
        "width":"15%"
    }
    ,
    {
        "tag":"th",
        "text":"alimentazione",
        "width":"15%"
    }
    ,
    {
        "tag":"th",
        "text":"colore",
        "width":"15%"
    }
    ,
    {
        "tag":"th",
        "text":"anno",
        "width":"10%"
    }
    ,
    {
        "tag":"th",
        "text":"img",
        "width":"20%"
    }
    ,
    {
        "tag":"th",
        "text":"dettagli",
        "width":"13%"
    }
    ,
    {
        "tag":"th",
        "text":"elimina",
        "width":"12%"
    }
];


$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
	let _dettagli=$(".row").eq(2).children("div").eq(1)
    _dettagli.hide();
    let codMarca;
    let request = inviaRichiesta("get",URL+"/marche");


    //sia done che fail si aspettano una funzione
    request.fail(errore);
    //marche è un vettore enumerativo json
    request.done(function(marche){
        for (const marca of marche) {
            let _option = $("<option>");
            _option.val(marca.id);
            _option.text(marca.nome);
            _option.appendTo(_lstMarche); 
        }
        _lstMarche.prop("selectedIndex",-1);
    });
    
    

    _lstMarche.on("change", function(){
        _lstModelli.html(""); 
        codMarca = _lstMarche.val();
        let request = inviaRichiesta("get",URL+"/modelli/?codMarca="+codMarca);
        //sia done che fail si aspettano una funzione
        request.fail(errore);
        //modelli è un vettore enumerativo json
        request.done(function(modelli){
            for (const modello of modelli) {
                let _option = $("<option>");
                _option.val(modello.id);
                _option.text(modello.nome + " - " + modello.alimentazione);
                _option.appendTo(_lstModelli);
                //salvo dentro ogni opzione tutte le info sul modello corrente
                _option.prop("modello",modello);
            }
            
        });
    });
    let codModello;
    _lstModelli.on("change",function(){
        _table.empty();
        codModello = _lstModelli.val();
        let opzione_selezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex")).text();
        //alert(opzione_selezionata);
        //_lstModelli.prop("nome", opzione_selezionata.split(' - ')[0]);
        //_lstModelli.prop("alimentazione", opzione_selezionata.split(' - ')[1]);

        //salvo nel listbox i dati del modello selezionato
        _lstModelli.prop("modello",opzione_selezionata.prop("modello")); 
        let request = inviaRichiesta("get",URL+"/automobili/?codModello="+codModello);
        request.fail(errore);
        request.done(function(automobili){
            let thead = $("<thead>");
            thead.appendTo(_table);
            let tr = $("<tr>");
            tr.appendTo(_table);
            let _dettagli;
            //intestazione
            
            for (let i = 0; i < intestazione.length; i++) {
                let th = $(`<${intestazione[i].tag}>`);
                th.html(intestazione[i].text);
                th.css("width",intestazione[i].width);
                th.appendTo(tr);
            }
            let tbody = $("<tbody>");
            _table.appendTo(tbody);
            tr.appendTo(_table);
            let pos=0;
            //posso salvarmi in un bottone i dati correnti dell'oggetto
            for (const auto of automobili) {
                let tr = $("<tr>")
                tr.appendTo(_table);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(auto.nome)

                 td = $("<td>");
                td.appendTo(tr);
                td.text(auto.alimentazione)

                td = $("<td>");
                td.appendTo(tr);
                td.text(auto.colore)

                 td = $("<td>");
                td.appendTo(tr);
                td.text(auto.anno)

                td = $("<td>");
                let img = $("<img>")
                img.appendTo(td);
                img.prop("src",`img/${auto.img}`)
                img.css("height", "65px")
                td.appendTo(tr);

                td = $("<td>");
                td.appendTo(tr);
                let btn = $("<button>");
                btn.addClass("btn btn-xs btn-success");
                btn.appendTo(td);
                btn.text("DETTAGLI");
                btn.prop("automobile",auto); //inserimento di ogni macchina come oggetto 
                btn.on("click",dettagliClick());

                td = $("<td>");
                td.appendTo(tr);
                btn = $("<button>");
                btn.addClass("btn btn-xs btn-secodary");
                btn.prop("id",auto.id);
                btn.appendTo(td);
                btn.on("click",eliminaClick());
                btn.text("ELIMINA");
                
                console.log(auto);
                
            }
        });
    });
});

function eliminaClick(){
    let url = URL+"/automobili/" + ($(this).prop("id")); //visualizzo l'id proprio dell'oggetto
    let request = inviaRichiesta("delete", url);
    request.fail(errore);
    request.done(function(){
        alert("record eliminato correttamente");
        //richiama forzatamente il change come se fosse successa davvero l'evento
        _lstModelli.trigger("change");
    })
}

function dettagliClick(){
   // _dettagli.show();
    

}