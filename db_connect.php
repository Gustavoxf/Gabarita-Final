<?php

$servername = "127.0.0.1";
$username = "root"; 
$password = "";     
$dbname = "gabarita"; 

function getConnection() {
    global $servername, $username, $password, $dbname;
    
 
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $conn->set_charset("utf8mb4");
        return $conn;
    } catch (Exception $e) {

        error_log("Falha na conexão ao banco de dados: " . $e->getMessage());
        return null;
    }
}
?>