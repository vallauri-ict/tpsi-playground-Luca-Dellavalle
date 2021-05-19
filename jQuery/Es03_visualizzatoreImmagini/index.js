"use strict";

$(document).ready(function(){
    let _btnIndietro = $("#btnIndietro");
    let _btnAvanti = $("#btnAvanti");
    let _img = $("#img");
    let cssBtn = {
        "width":"140px",
        "height":"40px",
        "text-align":"center",
        "borderRadius":"50%",
        "background-color":"orange",
        "font-weight":"bold",
        "vertical-align":"middle",
    }
    _btnIndietro.css(cssBtn);
    _btnAvanti.css(cssBtn);
    //img
    _img.attr("width","400px");
    let i=0;
    let vetImg = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg"];
    _img.attr("src","img/"+vetImg[i]);
    _btnIndietro.attr("disabled","disabled");
    _btnAvanti.on("click", function () {
        if(i == vetImg.length-1){
            _btnAvanti.attr("disabled","disabled");
        }
        else if(i>=0){
            _btnIndietro.removeAttr("disabled");
            i++;
            _img.attr("src","img/"+vetImg[i]);
        }
        
    });
    _btnIndietro.on("click", function () {
        if(i == 0){
            _btnIndietro.attr("disabled","disabled");
        }
        else if(i<=vetImg.length-1){
            _btnAvanti.removeAttr("disabled");
            i--;
            _img.attr("src","img/"+vetImg[i]);
        }
    });
    
})