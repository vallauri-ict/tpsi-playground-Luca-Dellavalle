"use strict";
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24*3600*1000 // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

$(document).ready(function(){	
	
	let _wrapper = $("#wrapper")
	let _mappa = $("#wrapper").children("div")
	let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0)
	//  tag input sono NIPOTI d wrapper
	let _dataInizio = $("#wrapper").find("input").eq(0)
	let _dataFine = $("#wrapper").find("input").eq(1)
	let _msg = $("#wrapper").children("label").eq(2)
	let dataStart;
	let dataEnd;
	let ombrelloni;


	_mappa.hide();
	_btnVisualizzaMappa.prop("disabled", true);
	_dataFine.prop("disabled", true);

	_dataInizio.on("change",function(){
		_dataFine.prop("disabled", false);
		_dataFine.prop("min",_dataInizio.val());
		dataStart = new Date(_dataInizio.val()); // salva direttamente l'object
	});

	_dataFine.on("change",function(){
		_btnVisualizzaMappa.prop("disabled", false);
		_btnVisualizzaMappa.addClass("buttoEnabled");
		dataEnd = new Date(_dataFine.val());
		_msg.text(`Giorni scelti ${(dataEnd - dataStart)/MMG}`);
		_btnVisualizzaMappa.removeClass("buttonEnabled");
	})

let url ="http://localhost:3000/ombrelloni";
	_btnVisualizzaMappa.on("click",function(){
		_mappa.show();
		let request = inviaRichiesta("get", url);
		request.fail(errore);
		request.done(function(data){
		console.log(data);
		ombrelloni = data;
		let id =1;
			for(let i =0; i<RIGHE; i++){
				if(i != 9){
					for (let j = 0; j < COLONNE; j++) {
						if(i != 22){
							let ombrellone = $("<div>");
							ombrellone.appendTo(_mappa);
							ombrellone.addClass("ombrellone");
							ombrellone.css({
								"top" : Y_OFFSET+(16*i),
								"left" : X_OFFSET+(16*j) + (i * -2),
							})
							if(isDisponibile(id-1)){
								ombrellone.on("click",ombrelloneClick());
							}
							else{
								ombrellone.addClass("red");
							}
							id++;
						}
					}
				}
				creaPulsantiPrenota();
			}			
		})
	});
})


function creaPulsantiPrenota(){
	let a = $("<a>");
	a.addClass("button buttonEnabled prenota");
	a.appendTo(mappa);
	a.text("prenota");
	a.on("click", function(){
		let pos1 = (dataStart-_dataInizio.prop("min"))/MMG;
		let pos2 = (dataEnd-_dataInizio.prop("min"))/MMG;
		for(const id of vet){
			for (let i = pos; i <= pos; i++) {
				ombrelloni[id-1]["stato"][i] = 1;
			}
		}
	})
}

function isDisponibile(ombrellone){	
	let pos1 = (dataStart-_dataInizio.prop("min"))/MMG;

	let pos2 = (dataEnd-_dataInizio.prop("min"))/MMG;
	for (let i = pos1; i < pos2; i++) {
		if(ombrellone.stato[i] != 0){
			return false;
		}
	}
	return true;
}

function ombrelloneClick(){
	if(!$(this).hasClass("blue"))
	{
		$(this).addClass("blue");
		vet.push($(this).prop("id").split("-")[1]);
	}
	else{
		$(this).removeClass("blue");
		let pos = vet.indexOf($(this).prop("id").split("-")[1]);
		vet.splice(pos,1);
	}
	console.log(vet);
	

}

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
