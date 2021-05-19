<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> PHP 4 </title>
        <link href="index.css" rel="stylesheet">
    </head>

    <body>
        <?php
            require("phpmysqli.php");
            if(isset($_REQUEST["optRisposta"])){
                $ris =$_REQUEST["optRisposta"]; 
            }
            else{
                die("parametro mancante : optRisposta");
            }
            if(isset($_REQUEST["id"])){
                $ris =$_REQUEST["id"]; 
            }
            else{
                die("parametro mancante : id");
            }

            $con = _openConnection("sondaggi");

            $sql = "UPDATE sondaggi SET $ris = $ris+1 WHERE id=$id";
            $rs = _execute($con,$sql);
            if($rs){
                echo("<h2 style='margin:15px'> Grazie di aver votato</h2>");
            }
            else{
                die("errore nell'esecuzione della query");
            }

            $sql2 = "SELECT * FROM sondaggi WHERE id=$id";
            _execute($con, $sql);
            $nSi = $rs["nSi"];
            $nNo = $rs["nNo"];
            $nNs = $rs["nNs"];
            $totale = +$nSi+$nNo+$nNs;
            echo("<h3>Risposte: </h3>");
            echo("<p> Si: $nSi </br> No: $nNo </br> Non so: $nNs </br></p>");

        ?>
       
    </body>
</html>