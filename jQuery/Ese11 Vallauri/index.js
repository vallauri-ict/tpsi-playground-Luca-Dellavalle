"sue strict"

$(document).ready(function() {
let wrapper = $("#wrapper")    
    for (let i = 0; i < 36; i++) {
        /*let box = $("<div>")
        box.addClass("box")//aggiunta classe nome box ad ogni box
        $("#wrapper").append(box)*/
        $("<div>").addClass("box").appendTo(wrapper) //singola riga
    }
    //tempo 32msec 
    setInterval(aggiorna,32);
    function aggiorna(){
        let n = generaNumero(0, 36);
        let box = wrapper.children().eq(n) //accedo ai figli di wrapper 
        //let box = wrapper.children(".box").eq(n) //selector con classe box
        //lavorano sullo stesso thread e allora vengono effettuate in sequenza
        box.animate({"opacity":0.3},400) // virgolette sulle stringhe non sul resto
        box.animate({"opacity":0.6},400)
        box.animate({"opacity":0.1},400)
        //,400 è di default
    }

    function generaNumero(a,b){
        return Math.floor((b-a+1)*Math.random())+a;
    }
})