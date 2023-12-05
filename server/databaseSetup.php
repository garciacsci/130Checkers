<?php

include 'dbConnect.php'; // Use dbConnect.php for database connection

try {
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
            ('Ganondorf', 'player1@example.com', '$dummyPassword'),
            ('Bowser', 'player2@example.com', '$dummyPassword'),
            ('Mickey', 'player3@example.com', '$dummyPassword')";
    $conn->exec($sql);
    echo "Dummy player records inserted successfully<br>";

    // Create Games Table with new columns
    $sql = "CREATE TABLE IF NOT EXISTS Games (
        game_id INT AUTO_INCREMENT PRIMARY KEY,
        player_id INT,
        score INT,
        duration TIME,
        turns INT,
        won BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (player_id) REFERENCES Players(player_id)
    )";
    $conn->exec($sql);
    echo "Table Games created successfully<br>";

    // Insert dummy data into Games table
    $games = [
        "(1, 15, '00:25:00', 30, FALSE)",
        "(1, 20, '00:30:00', 25, FALSE)",
        "(1, 10, '00:15:00', 20, FALSE)",
        "(1, 18, '00:28:00', 22, FALSE)",
        "(1, 5, '00:10:00', 18, FALSE)",
        "(1, 12, '00:20:00', 30, TRUE)",
        "(2, 8, '00:18:00', 15, TRUE)",
        "(2, 20, '00:35:00', 32, TRUE)",
        "(2, 14, '00:22:00', 24, TRUE)",
        "(2, 16, '00:27:00', 28, TRUE)",
        "(2, 11, '00:19:00', 21, TRUE)",
        "(2, 9, '00:16:00', 17, TRUE)",
        "(3, 18, '00:28:00', 22, FALSE)",
        "(3, 5, '00:10:00', 18, FALSE)",
        "(3, 12, '00:20:00', 30, TRUE)",
        "(3, 8, '00:18:00', 15, TRUE)",
        "(3, 20, '00:35:00', 32, TRUE)",
        "(3, 14, '00:22:00', 24, TRUE)",
        "(3, 16, '00:27:00', 28, TRUE)",
        "(3, 11, '00:19:00', 21, TRUE)",
    ];

    // Single INSERT statement
    $sql = "INSERT INTO Games (player_id, score, duration, turns, won) VALUES " . implode(', ', $games);
    $conn->exec($sql);
    echo "Dummy game records inserted successfully<br>";


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null; // Close database connection

?>
