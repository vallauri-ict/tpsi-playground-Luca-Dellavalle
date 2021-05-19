<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    //step 1 parametri?
    if(isset($_REQUEST["cFiliale"]))
    {
        $cFiliale = $_REQUEST["cFiliale"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: cFiliale");
    }
    //step 2 connessione
    $con = _openConnection();
    //step 3 sql ed esecuzione
    //fa una join delle due tabelle con dopo il WHERE condizione di join che sarebbe il campo in comune
    $sql = "SELECT * FROM conti,correntisti WHERE correntisti.cCorrentista = conti.cCorrentista and conti.cFiliale = $cFiliale"; 
    $rs = _execute($con,$sql);
    //step 4 controllo ricezione e invio
    if($rs)
    {
        echo(json_encode($rs)); //serializzo $rs
    }
    else{
        http_response_code(500);
        die("errore esecuzione query");
    }
    //step 5
    $con-> close();

?>