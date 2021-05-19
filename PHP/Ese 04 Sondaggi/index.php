<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> PHP 4 </title>
        <link href="index.css" rel="stylesheet">
    </head>
    <style>
        body{
            text-align:center
        }
    </style>
    <body>
        <?php
            require("php-mysqli.php");
        ?>

       <h1>Seleziona i sondaggi a cui vuoi partecipare</h1>
       <hr>
       <h3>Sondaggi disponibili</h3>
       <form id="form1" action="pagina2.php" method="get">
           <select name="lstSondaggi">
                <?php
                    //step 1 saltato perché non ci sono parametri
                    //step 2 connessione (c'è sempre)
                    $con = _openConnection("sondaggi");
                    //Step 3 esecuzioni query
                    $sql = "SELECT id,titolo FROM sondaggi";
                    
                    $rs = _execute($con,$sql);
                    //Step 4: visualizzazione dati
                    foreach ($rs as $item) {
                        $nome = $item["titolo"];
                        $id = $id["id"];
                        echo("<option value=$id>$nome</option>");
                        //se voglio usare una variabile composta all'intero di una echo
                        //è possibile ma occorre omettere gli apici attorno al nome del campo
                    }

                ?>
           </select>
           <input type="submit" value = "invia">
       </form>

       <?php
            //step 5: chiusura connessione al server
            $con->Close();
       ?>
       
    </body>
</html>