<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> PHP 1 </title>
        <link href="index.css" rel="stylesheet">
    </head>
    <body>
       <h1>Pagina 2</h1>

       <?php
       
        require("php-mysqli.php");
       //step1 : lettura e controllo parametri;
       //
        if(isset($_REQUEST["txtNome"])){
            $nome = $_REQUEST["txtNome"];
        }
        else{
            die("nome mancante");
        }

        if(isset($_REQUEST["optIndirizzo"])){
            $indirizzo = $_REQUEST["optIndirizzo"];
        }
        else{
            die("indirizzo mancante");
        }

        if(isset($_REQUEST["chkHobbies"])){
            $hobbies = $_REQUEST["chkHobbies"];
            $hobbies = implode(',', $hobbies);
        }
        else{
            $hobbies = "";
        }

        if(isset($_REQUEST["lstCitta"])){
            $citta = $_REQUEST["lstCitta"];
            $citta = implode(',', $citta);
        }
        else{
            die("città mancante");
        }

        if(isset($_REQUEST["txtSegni"])){
            $segni = $_REQUEST["txtSegni"];
            $segni = implode(',', $segni);
        }
        else{
           $segni = "";
        }

        if(isset($_REQUEST["lstScoperta"])){
            $scoperta = $_REQUEST["lstScoperta"];
            $scoperta = implode(',', $scoperta);
        }
        else{
           $scoperta = "";
        }
        
        //Step 2: connessione database
        $con = _connection("4b_studenti");
        //per accedere a proprietà di un oggetto si usa la freccina e non il punto
        //proteggo le variabili dall'sql injection
        $nome = $con -> real_escape_string($nome);
        $indirizzo = $con -> real_escape_string($indirizzo);
        $hobbies = $con -> real_escape_string($hobbies);
        $citta = $con -> real_escape_string($citta);
        $segni = $con -> real_escape_string($segni);
        $scoperta = $con -> real_escape_string($scoperta);
        
        //Step 3: Esecuzione della query
        //l'unico errore è che non sia scritta bene
        $sql = "INSERT INTO studenti(nome, settore, hobbies, residenza, segni,media)
                VALUES ('$nome','$indirizzo','$hobbies',$citta,'$segni','$scoperta')";
        $result = _execute($con, $sql);
        
        //Step 4: visualizzazione dati
        if($result){
            echo("<p>$nome;</p>");
            echo("<p>$indirizzo;</p>");
            echo("<p>$hobbies;</p>");
            echo("<p>$citta;</p>");
            echo("<p>$segni;</p>");
            echo("<p>$scoperta;</p>");
        }
       ?>
    </body>
</html>
