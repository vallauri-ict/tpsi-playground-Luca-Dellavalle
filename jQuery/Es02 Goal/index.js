"use strict"

$(document).ready(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	
	let btnEntra=$("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")
	

	_calciatore.hide();	
	_palla.hide();
	_palla.prop("goal", false);

	//_btnEsci.hide(); riadatta la pagina senza la visualizzazione dell'elemento
	btnEsci.css("visibility","hidden");
	btnNascondiPalla.css({"visibility":"hidden"});//inserimento anche di più caratteristiche
	btnTira.css("visibility","hidden");

	btnEntra.on("click", function(){
		//this.style.visibility="hidden"; puntatore javascript
		//(this è un puntatore jQuery) non riconosce metodo css da puntatore javascript
		//this.css("visibility","hidden");
		//come risolvere....
		$(this).css("visibility","hidden"); //puntatore oggetto jQuery
		_calciatore.show(2000,function(){ //non esegue il codice al suo interno fino a quando il timer non è scaduto
			btnEsci.css("visibility","visible");
			checkTira();
		});	
	});

	btnEsci.on("click", function(){
		$(this).css("visibility","hidden"); //puntatore oggetto jQuery
		_calciatore.hide(2000,function(){ //non esegue il codice al suo interno fino a quando il timer non è scaduto
			btnEntra.css("visibility","visible");
			checkTira();
		});	
	});
		
	btnVisualizzaPalla.on("click", function(){
		$(this).css("visibility","hidden"); //puntatore oggetto jQuery
		_palla.fadeIn(2000, function(){
			btnNascondiPalla.css({"visibility":"visible"});
			checkTira();
		});
		
	});

	btnNascondiPalla.on("click", function(){
		$(this).css("visibility","hidden"); //puntatore oggetto jQuery
		_palla.fadeOut(2000, function(){
			btnVisualizzaPalla.css({"visibility":"visible"});
			checkTira();
			if(_palla.prop("goal")){
				let pos = {
					"left":"",
					"top":"",
					"width":"",
					"height":""
				};
				_palla.css(pos);
				$(this).prop("goal", false);
			}
		});
		
		
	});

	function checkTira(){
		if(_palla.is(':visible') && _calciatore.is(':visible')){
			btnTira.css("visibility","visible");
		}
		else{
			btnTira.css("visibility","hidden");
		}
	};

	btnTira.on("click",function(){
		$(this).css("visibility","visible");
		let pos = {
			"left":"1025px",
			"top":"300px",
			"width":"50px",
			"height":"50px"
		};
		_palla.animate(pos, 1500, function(){
			$(this).prop("goal", true);
		});
	});


	$("#btnRosso").on("click", function(){
		_palla.prop("src", "img/pallaRossa.jpg");
	});

	$("#btnBianco").on("click", function(){
		_palla.prop("src", "img/palla.jpg");
	});
});