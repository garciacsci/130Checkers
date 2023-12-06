<?php

// Database connection variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "checkers_game";
$socket = "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock";

try {
    // Connect to MySQL server
    $dsn = "mysql:host=$servername;unix_socket=$socket";
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the database exists, create it if not
    $conn->exec("CREATE DATABASE IF NOT EXISTS `$dbname`");
    $conn->exec("USE `$dbname`");

    // echo "Connected successfully and database created/selected";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    return null; // Return null to indicate failure
}

// Return connection object
return $conn;

?>
