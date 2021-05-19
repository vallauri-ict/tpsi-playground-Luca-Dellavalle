"use strict";

$(document).ready(function() {

	let _p = $("p"); //vettore enumerativo di puntatori jvascript
	alert(_p.length);
	_p.css("backgroundColor","#FF0"); //in scrittura agisce su tutti
	$(".primo").css("backgroundColor","#F00");
	alert(_p.css("backgroundColor"));// in lettura restituisce il primo

	_p.hide(800);

	_p[2].innerHTML="nuovo valore";

	_p.show(800);

	for(let obj of _p) {
		obj.style.backgroundColor = "green";
	}
});
