"option strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    const _lstCitta  =$("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro  = $("#btnFiltro")
    const _tbody = $("table tbody");
	const _divDettagli =$("#divDettagli")
    
	_divDettagli.hide()    
    caricaComboCitta();
    caricaComboGeneri();

  /****************************************************/
    function caricaComboCitta() {
        let _li = $("<li>")
        _li.text("Tutti")
        _li.append(_lstCitta)
        let request = inviaRichiesta("get", URL+"/citta")
        request.fail(errore);
        request.done(function(citta){
            for (const item of citta) {
                let _li = $("<li>")
                _li.text(item.citta)
                _li.appendTo(_lstCitta)
                _li.prop("citta",item)
            }
        })
    }

    function caricaComboGeneri() {
        let _li = $("<li>")
        _li.text("Tutti")
        _li.append(_lstGeneri)
        let request = inviaRichiesta("get", URL+"/generi")
        request.fail(errore);
        request.done(function(generi){
            for (const item of generi) {
                let _li = $("<li>")
                _li.text(item.generi)
                _li.appendTo(_lstGeneri)
                _li.prop("genere",item)
            }
        })
    }


})