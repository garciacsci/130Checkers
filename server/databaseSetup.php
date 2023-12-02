<?php

// Database connection variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "checkers_game";
$socket = "/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock";

$dsn = "mysql:host=$servername;unix_socket=$socket";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Select database
    $conn->exec("USE $dbname");

    // Create Players Table
    $sql = "CREATE TABLE IF NOT EXISTS Players (
                player_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                password VARCHAR(255)
            )";
    $conn->exec($sql);
    echo "Table Players created successfully<br>";

    // Hash password for dummy data
    $dummyPassword = password_hash('password123', PASSWORD_DEFAULT);

    // Insert dummy data into Players table
    $sql = "INSERT INTO Players (username, email, password) VALUES 
            ('player1', 'player1@example.com', '$dummyPassword'),
            ('player2', 'player2@example.com', '$dummyPassword'),
            ('player3', 'player3@example.com', '$dummyPassword')";
    $conn->exec($sql);
    echo "Dummy player records inserted successfully<br>";

    // Create Games Table
    $sql = "CREATE TABLE IF NOT EXISTS Games (
                game_id INT AUTO_INCREMENT PRIMARY KEY,
                player_id INT,
                score INT,
                duration TIME,
                turns INT,
                FOREIGN KEY (player_id) REFERENCES Players(player_id)
            )";
    $conn->exec($sql);
    echo "Table Games created successfully<br>";

    // Insert dummy data into Games table
    $games = [
        ['player_id' => 1, 'score' => 10, 'duration' => '00:30:00', 'turns' => 20],
        ['player_id' => 2, 'score' => 15, 'duration' => '00:45:00', 'turns' => 30],
        ['player_id' => 3, 'score' => 14, 'duration' => '00:52:00', 'turns' => 32]
    ];

    foreach ($games as $game) {
        $sql = "INSERT INTO Games (player_id, score, duration, turns) VALUES (:player_id, :score, :duration, :turns)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            'player_id' => $game['player_id'],
            'score' => $game['score'],
            'duration' => $game['duration'],
            'turns' => $game['turns']
        ]);
    }
    echo "Dummy game records inserted successfully<br>";

    // Additional game records
    try {
        $sql = "INSERT INTO Games (player_id, score, duration, turns) VALUES 
                (1, 15, '00:25:00', 30),
                (1, 20, '00:30:00', 25),
                (1, 10, '00:15:00', 20),
                (1, 18, '00:28:00', 22),
                (1, 5, '00:10:00', 18),
                (1, 12, '00:20:00', 30),
                (2, 8, '00:18:00', 15),
                (2, 20, '00:35:00', 32),
                (2, 14, '00:22:00', 24),
                (2, 16, '00:27:00', 28),
                (2, 11, '00:19:00', 21),
                (2, 9, '00:16:00', 17)";
    
        $conn->exec($sql);
        echo "Additional game records inserted successfully<br>";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    $conn = null;
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>