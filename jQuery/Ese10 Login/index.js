
var utenti = [ {"user":"pippo",  "pwd":"pwdPippo"},
               {"user":"pluto",  "pwd":"pwdPluto"},
			   {"user":"minnie", "pwd":"pwdMinnie"} ];

let errorU = 0, errorP = 0
$(document).ready(function() {
    
    //punto 1 controllo campo user
    $("#txtUser").change(function(){
        //console.log( utenti[1].user);
        
        if( !ricercaUser($("#txtUser").val(), 0) || $("#txtUser").val() == ""){
            //msg negativo
            errorU = 1
            $("#txtUser").css("border", "1px solid red")
            $("#msgUser").html("utente non valido")
            $("#msgUser").css("color","red")   
            $("#msgUser").fadeIn();
        }
        else{
            errorU = 0
            //msg positivo
            $("#txtUser").css("border", "")
            $("#msgUser").html("Ok")     
            $("#msgUser").css("color","green")   
            $("#msgUser").fadeIn();
        }
   })

   $("#txtPwd").change(function(){
        if( !ricercaUserPwd($("#txtPwd").val(), 1) || $("#txtPwd").val() == ""){
            //msg negativo
            $("##txtPwd").css("border", "1px solid red")
            $("#msgPwd").html("password non valido")
            $("#msgPwd").css("color","red")   
            $("#msgPwd").fadeIn();
        }
        else{
            //msg positivo
            $("#txtUser").css("border", "")
            $("#msgUser").html("Ok")     
            $("#msgUser").css("color","green")   
            $("#msgUser").fadeIn();
        }
   })

    $("input").not(":button").mouseover(function(){
        $("input").not(":button").css("border", "1px solid blue")
        $("input").not(":button").css("background-color", "#CCF")
    })


    $("input").not(":button").mouseout(function(){
        //console.log("out")
        if(errorU){
            $("#txtUser").css("border", "1px solid red")
        }
        else{
            $("input").not(":button").css("border", "")
        }
        let email = "(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$)"
        if(!$("#txtPwd").val().test(email)){
            $("#txtPwd").css("border", "1px solid red")
        }
        else{
            $("input").not(":button").css("border", "")
        }
        $("input").not(":button").css("background-color", "white")
    })
});



function ricercaUser(str, campo){
    //$.inArray(($("#txtUser").val(), utenti[i].user)) != -1){

    if(campo){
        for (const i in utenti) {
            //console.log(utenti[i].pwd);
            if(str == utenti[i].pwd){
                return true
            }
        }
        return false
    }
    else{
        for (const i in utenti) {
            //console.log(utenti[i].user);
            if(str == utenti[i].user){
                return true
            }
        }
        return false
    }

}

