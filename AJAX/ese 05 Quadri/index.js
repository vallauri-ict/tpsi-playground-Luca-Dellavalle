+"option strict"

const URL = "http://localhost:3000"

$(function () {
    let posQuadro=0;
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let quadri;
	let _wrapperAdd = $('.wrapper .head').eq(0);
    
    let request = inviaRichiesta("get",URL+"/artisti");
    //sia done che fail si aspettano una funzione
    request.fail(errore);
    //marche è un vettore enumerativo json
    request.done(function(artisti){
        //caricamento artisti 
        for (const artista of artisti) {
            let _labelArtista = $("<label>")
            _labelArtista.appendTo(_head)


            let radio = $("<input type='radio'>") //type=radio
            radio.addClass("input")
            radio.prop("type","radio")
            radio.prop("artista",artista)
            radio.prop("name","optArtisti") 

            _labelArtista.append(radio)
            //text sovrascrive tutto
            //html fa perdere il riferimento al radio e riscrive tutto l'html 
            //DA EVITARE SU PROP
            _labelArtista.append(artista.name)
        }

        _btnPrev.prop("disabled",true)

        let n = generaNumero(0,artisti.length-1)
        if(n!=0){
            _btnPrev.prop("disabled",false)
        }
        let chk = $("input[type='radio']").eq(n)
        chk.prop("checked", true)
        let idArtista = chk.prop("artista").id
        inviaRichiestaQuadri(idArtista,chk.prop("artista").gender);

        _btnPrev.on("click", function(){
            if(posQuadro == 0)
            {
                $(this).prop("disabled", true)
                _btnNext.prop("disabled", false);
            }
            else{
                posQuadro--;
                visualizzaQuadro(quadri[posQuadro]);
            }
            
        })

        _btnNext.on("click", function(){
            if(posQuadro == quadri.length-1)
            {
                $(this).prop("disabled", true)
                _btnPrev.prop("disabled", false);

            }
            else{
                posQuadro++;
                visualizzaQuadro(quadri[posQuadro]);
            }
        })

    })

    let btnSalva = $("#btnSalva");
    let txtImg = $("#immagine");
    let txtTitle = $("#titolo");
    let btnAnnulla = $("btnAnnulla");

    btnSalva.on("click", function(){
        if (txtTitle.val() == "" || txtImg.prop("files") == "") {
            alert("inserire titolo e immagine");
        }
        else{
            let fileName = txtImg.prop("files")[0];
            let reader = new FileReader();
            reader.readAsDataURL(fileName);
            reader.onloadend = function() {
                console.log('RESULT', reader.result);
                let jsonAus = {
                    "artist" : $("input[type='radio']:checked").prop("artista").id,//rileva l'artista corrente
                    "title" : txtTitle.val(),
                    "img":reader.result,
                    "nLike": 0
                }
                //richiesta post per aggiungere
                let request = inviaRichiesta("post",URL+"/quadri",jsonAus)
                request.fail(errore);
                request.done(function () {
                    console.log(data); 
                    inviaRichiestaQuadri($("input[type='radio']:checked").prop("artista").id)
                })
            }
            
        }



    
    })
    //PUT SOSTITUISCE TUTTO IL RECORD
    //PATCH MODIFICA SOLO IL CAMPO DEL RECORD SENZA TOCCARE GLI ALTRI CAMPI



    function inviaRichiestaQuadri(idArtista,gender) {
        let request = inviaRichiesta("get",URL+"/quadri?artist="+idArtista)
        request.fail(errore)
        request.done(function(quadriArtista){
            //console.log(quadriArtista)
            visualizzaQuadro(quadriArtista[0],gender)
            quadri = quadriArtista
        })
    }

    function visualizzaQuadro(quadro,gender){
        _info.empty();
        _img.empty();
        $("<p>").text("ID = " + quadro.id).appendTo(_info)
        $("<p>").text("Titolo = " + quadro.title).appendTo(_info)
        $("<p>").text("Genere = " + gender).appendTo(_info)
        $("<p>").text("Like = " + quadro.nLike).appendTo(_info).append($("<img>").prop("src","like.jpg").addClass("like"))
        $("<img>").prop("src","img/"+quadro.img).appendTo(_img)
        


       /* $("<p>").text("Like = " + quadro.nLike).appendTo(_info).append($("<img>").prop("src","like.jpg").addClass("like"))
        if(!quadro.img.includes("base64,"))
        {
            $("<img>").prop("src","img/"+quadro.img).appendTo(_img)
        }
        else{
            $("<img>").prop("src","img/"+quadro.img).appendTo(_img)
        }*/

        /**COME SALVARE UN IMMAGINE IN BASE 64 (codifica testuale delle immagini)
         * 
         * perché? perché nelle chiamate ajax si trasmette versione testuale(stringhe)
         * 
         * l' oggetto let reader = new FileReader();
         * reader.readAsDataUrl(file); su un thread separato quando ha finito fa una callback e genera un evento
         *        
         * reader.onloadend = function(){
         *      console.log('RESULT', reader.result)
         * }   
         * 
         */

    }

    _head.on("click","input",function(){
        posQuadro=0;
        _btnPrev.prop("disabled",false)
        let id = $(this).prop("artista").id
        let gender = $(this).prop("artista").gender
        inviaRichiestaQuadri(id,gender);

    })

    function generaNumero(min,max) {
        let n = Math.floor((max-min+1)*Math.random()+min)
        return n;
    }
})



