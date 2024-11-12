<?php
    $db_server = "localhost";
    $db_user = "root";
    $db_name = "";
    $db_password = ""; 
    $dn_name = "EventEval";
    $conn = "";
    try{
        $conn = mysqli_connect($db_server, $db_user, $db_password, $dn_name);

    }
   catch(mysqli_sql_exception){
        echo"COULD NOT CONNECT!";
   }
?>