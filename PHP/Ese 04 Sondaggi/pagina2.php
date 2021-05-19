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
            require("php-mysqli.php");
        ?>
         
       <h1>Sondaggio su</h1>

       <?php
            //Step 1: controllo parametri
            if(isset($_REQUEST["lstSondaggi"])){
                $id = $_REQUEST["lstSondaggi"];
            }
            else{
                die("parametro mancante: ID");
            }
            //Step 2: creare connessione
            $con = _openConnection("sondaggi");
            //Step 3: esecuzione query
            $sql = "SELECT * FROM sondaggi WHERE id=$id";
            // SELECT seleziona le colonne
            // * prende tutti i campi
            //WHERE (seleziona le righe) si usa per prendere solo il campo
            $rs = _execute($con,$sql)[0]; //Restituisce un vettore enumerativo

            //Step 4: visaulizzazione dati
            echo("<h1> domanda $rs[titolo]</h1>");
            echo("<hr> <img width='200' src=img/$rs[img]>");
            echo("<h3 style='margin:15px;'> Rispondi alla seguente domanda </h3> </hr>" );
            echo("<p  style='margin:15px;> $rs[domanda] </p>");
            

       ?>
       <form action="risultati.php" method="post">
            <div style="margin:15px;">
                    <input type="radio" name="optRisposta" value = "nSi"> Si
                    <input type="radio" name="optRisposta" value = "nNo"> No
                    <input type="radio" name="optRisposta" value = "nNs"> Non so
                    <?php
                        echo("<input type='hidden' value='id' />");
                    ?>
            </div>
            
            <input type="submit" value="invia">
        </form>
    </body>
</html>
