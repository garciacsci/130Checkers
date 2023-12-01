<?php

// Database connection variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "checkers_game";
$socket = "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock";

$dsn = "mysql:host=$servername;unix_socket=$socket;dbname=$dbname";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// Return connection object
return $conn;

?>