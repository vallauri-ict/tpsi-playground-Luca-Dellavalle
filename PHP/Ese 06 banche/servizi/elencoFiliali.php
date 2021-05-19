<?php
    header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    //step 1 parametri?
    if(isset($_REQUEST["cBanca"]))
    {
        $cod_Banca = $_REQUEST["cBanca"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: cBanca");
    }
    //step 2 connessione
    $con = _openConnection();
    //step 3 sql
    $sql = "SELECT cFiliale,Nome FROM filiali WHERE cBanca=$cod_Banca";
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