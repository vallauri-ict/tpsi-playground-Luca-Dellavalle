"use strict";

function crea(){
	localStorage.setItem("bookstore_xml", bookstore); // viene ricavata l'informazione e inserita in bookstore
	alert("dati salvati correttamente all'interno del localStorage");
}

function visualizza(){
	//lettura stringa da localStorage 
	let xml = localStorage.getItem("bookstore_xml");
	//istanzio un DOM parser
	let parser = new DOMParser();
	//tramite il DOM parser parsifico la stringa XML
	let xmlDoc = parser.parseFromString(xml, "text/xml");
	//righe ausiliarie per vedere se tutto ok
	/*let serializer = new XMLSerializer();
	let aus = serializer.serializeToString(xmlDoc);
	console.log(aus);*/
	
	//accedo alla radice dell'albero 
	let root = xmlDoc.documentElement;
	let nLibri = root.children.length;
	alert("Dati letti correttamente dal LocalStorage N di record letti = "+nLibri);

	let _tBody = document.getElementById("tabLibri");
	for(let i=0; i < nLibri; i++){
		let libro = root.children[i]; //scorre i libri
		let titolo="", categoria = "", lingua="", anno="", autori = "", prezzo="";
		if(libro.hasAttribute("category")){
			categoria = libro.getAttribute("category") ;
		}
		
		for(let j = 0; j<libro.children.length; j++){
			let campo = libro.children[j];
			switch(campo.nodeName){
				case "title":
					titolo = campo.textContent;
					if(campo.hasAttribute("lang")){
						lingua = campo.getAttribute("lang");
					}
					break;
				case "year":
					anno = campo.textContent;
					break;
				case "price":
					prezzo = campo.textContent;
					break;
				case "author":
					if(autori == ""){
						autori += campo.textContent+" ";
					}
					else{
						autori += " - " + campo.textContent
					}
					break;
				
			}




		}
		
		let tr = document.createElement("tr");
		_tBody.appendChild(tr); // appesa la riga al tBody

		let td;

		td = document.createElement("td");
		td.innerHTML = titolo;
		td.style.border = 0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = categoria;
		td.style.border = 0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = lingua;
		td.style.border = 0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = autori;
		td.style.border = 0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = anno;
		td.style.border = 0;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = prezzo;
		td.style.border = 0;
		tr.appendChild(td);
	}
}



