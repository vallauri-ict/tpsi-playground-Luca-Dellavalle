"use strict"

window.onload=function(){
   let _btnConverti = document.getElementById("btnConverti");
   _btnConverti.addEventListener("click", converti);




   function converti(){
    let xml = localStorage.getItem("bookstore_xml");
    //parsificare
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml,"text/xml");
    let root = xmlDoc.documentElement; 
     // vettore enumerativo in cui salveremo i vari libri
    let JSONvet = []; 


    //scansione dell'albero xml
    //root: vettore enumerativo con i book figli di root
    for (let i = 0; i < root.children.length; i++) {
        let book = root.children[i];
        let lang = "", authors = [], year = "", category = "", title = "", price = "";
        if (book.hasAttribute("category")) {
            category = book.getAttribute("category");
        }
        for (let j = 0; j < book.children.length; j++) {
            let campo = book.children[j];
            switch (campo.nodeName) {
                case "title":
                    title = campo.textContent;
                    if (campo.hasAttribute("lang")) {
                        lang = campo.getAttribute("lang");
                    }
                    break;
                case "author":
                    //aggiunge il valore al vettore
                    authors.push(campo.textContent);
                    break;
                case "year":
                    year = campo.textContent;
                    break;
                case "price":
                    price = campo.textContent;
                    break;
                
            }
            
        }
        //visualizzazione di controllo
        console.log("book");
        console.log(category);
        console.log(title);
        console.log(authors);
        console.log(lang);
        console.log(year);
        console.log(price);

        let jsonBook={};
        jsonBook.category = category;
        jsonBook.author = authors;
        jsonBook.lang = lang;
        jsonBook.title = title;
        jsonBook["year"] = year;
        jsonBook["price"]=price;
        //inserimento del book dopo aver inserito gli attributi
        JSONvet.push(jsonBook);
        

    }
    //serializzo il vettore per stampare nell'alert
    alert(JSON.stringify(JSONvet));
    alert("dati convertiti e salvati correttamente");
    //serializzo per salvarlo nel LOCAL STORAGE
    localStorage.setItem("bookstore_json",JSON.stringify(JSONvet));
    
   }
}

