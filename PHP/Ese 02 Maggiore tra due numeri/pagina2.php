<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> Esercisio numero 2 di PHP </title>
        <link href="index.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"></script>
        <script src="index.js"></script>
    </head>
    <body>
        <h1>Grazie della tua richiesta</h1>
        <?php
            $n1 = 0;
            $n2 = 0;
            $n3 = 0;
            if(isset($_REQUEST["n1"]) && is_numeric($_REQUEST["n1"]))
                $n1 = $_REQUEST["n1"];
            else
                die("primo numero non valido");
            if(isset($_REQUEST["n2"]) && is_numeric($_REQUEST["n2"]))
                $n2 = $_REQUEST["n2"];
            else
                die("secondo numero non valido");
            if(isset($_REQUEST["n3"]) && is_numeric($_REQUEST["n3"]))
                $n3 = $_REQUEST["n3"];
            else
                die("terzo numero non valido");
           
            //controllo maggiore
            if($n1 > $n2 && $n1 > $n3){
                echo("Il più alto è il primo e vale $n1");
            }
            else if ($n2 > $n3){
                echo("Il più alto è il secondo e vale $n2");
            }
            else{
                echo("Il più alto è il terzo e vale $n3");
            }
           echo("</br>tipo di tichiesta : <b> $_SERVER[REQUEST_METHOD]</b></br>");
           $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
           echo("url richiedente: $actual_link");
        ?> 
        
    </body>
</html>