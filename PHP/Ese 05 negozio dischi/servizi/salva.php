<?php
// atttanzione che prima dell'<?php e dopo del chiuso script php
// non ci deve essere nulla, neanche un carattere di tipo spazio
// eventuali caratteri scritti al di fuori dello script verrebbero inviati al client
// e potrebbero causare malfunzionamenti

header('Content-type: text/html; charset=utf-8');
require("php-mysqli.php");

// il josn inviato come risposta deve essere serializzato (inviato come stringa)
// e le chiavi devono essere inviato con le virgolette doppie
/// echo('{"ris":"ok"}');

// step 1 lettura paramentri
    if(isset($REQUEST["id"])){
        $id = $_REQUEST["id"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: id");
    }
    if(isset($REQUEST["titolo"])){
        $id = $_REQUEST["titolo"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: titolo");
    }
    if(isset($REQUEST["anno"])){
        $id = $_REQUEST["anno"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: anno");
    }
    if(isset($REQUEST["autore"])){
        $id = $_REQUEST["autore"];
    }
    else{
        http_response_code(400);
        die("parametro mancante: autore");
    }
// step 2 connessione
$con = _openConnection();
// step 3: esecuzione query
$sql = "UPDATE FROM `dischi` WHERE id=$id
        UPDATE "; // Per prendere tutti record devo omettere where
$rs = _eseguiQuery($con,$sql);

// step 4: invio dati al client
if($rs){
    echo({"ris":"ok"});
}
else{
    // step 5 chiusura connessone
}
$con->close();	
?>