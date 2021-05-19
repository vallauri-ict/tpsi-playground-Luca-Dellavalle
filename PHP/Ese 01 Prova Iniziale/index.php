<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> PHP 1 </title>
        <link href="index.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"></script>
        <script src="index.js"></script>
    </head>
    <body>
        <h1>Primo esercizio PHP</h1>
        <?php
            $nome = "pippo";
            echo ("Il mio nome è $nome <br>");
            echo("\n\t\t")
            visualizza ($nome);
            function visualizza($nome) {
                echo ("<p style='font-weight:bold'>Il mio nome &egrave; $nome </p>\n");
            }
        ?>
        <h1>Contenuto variabile globale $_SERVER</h1>
        <?php
            foreach ($_SERVER as $nome => $valore)
                echo ($nome . " : " . $valore . "<br>";
        ?>
         <h1>Info sulla configurazione di xamp </h1>
        <?php
            echo (phpinfo());
        ?>
    </body>
</html>
