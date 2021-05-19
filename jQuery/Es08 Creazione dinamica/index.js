"use strict"

let ul = []

$(document).ready(function(){
    let wrapper = $("#wrapper")
    ul.push(wrapper.children("ul").eq(0))
    ul.push(wrapper.children("ul").eq(1))
})

function aggiungi(index){
    index--
    //creo un elemento li
    //let li = $("<li>menu 1 voce 4</li>")
    let li = $("<li>")
    let n = ul[index].children("li").length + 1 //aggiunta nuovo elemento
    li.html("menu "+(index+1)+" voce <b>"+n+"</b>")  //.html traduce <b></b> 
    //ul[index].append(li)  identici
    li.appendTo(ul[index]); 
}

function sposta(index){
    index--
    let li = ul[index].children("li").last() // ultima voce menù 1 / 2
    if(index==0){
        li.appendTo(ul[1])
    }
    else{
        li.appendTo(ul[0])
    }
}

function aggiungiPrima(index){
    index--
    let li = $("<li>")
    li.text("voce iniziale")
    //ul[index].children("li").first().before(li)
    li.insertBefore(ul[index].children("li").first())
}

function aggiungiDopo(index){
    index--
    let li = $("<li>")
    li.text("voce dopo il primo elemento")
    //ul[index].children("li").first().after(li)
    li.insertAfter(ul[index].children("li").first())
}

function replica(index){
    index--
    let li = $("<li>")
    li.text("-------------------------------------")
    li.insertBefore(ul[index].children("li"))
}

function creazioneConCostruttore(){
    //
}