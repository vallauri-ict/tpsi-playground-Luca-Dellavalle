<?php;
    function _connection($dbName){
        define('DBHOST', 'localhost'); /*dominio alla quale collegarsi */
        define('DBUSER', 'root'); /*nome utente   "root" admin automatico senza password*/
        define('DBPASS', ''); /*password utente */

        //questa riga fa in modo che, in caso di errore, venga generata un'eccezione
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try{ 
            $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
            $con->set_charset("utf-8");
            return $con;
        } 
        catch (mysqli_sql_exception $ex){ 
            die ("Errore connessione al database: <br>" . $ex->getMessage());
        }
    }
    function _execute($con, $sql){
        try {
            $rs = $con->query($sql);
        } catch (mysqli_sql_exception $ex) {
            $con->close();
            die("Errore nella query SQL: <br>" . $ex->getMessage());
        }

        //se il comando è una query di tipo select 
        //convertiamo il record set in un vettore di JSON.
        //I comandi non di tipo select restituiscono un buleano che lasciamo così come è 
        
        if(!is_bool($rs)){
            $data =  $rs->fetch_all(MYSQLI_ASSOC);//metodo che converte in un vettore enumerativo JSON grazie a (MYSQLI_ASSOC)
        }
        else{
            $data = $rs;   
        }
        $con->close();
        return $data;
    }
?>

