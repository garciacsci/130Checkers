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
        duration TIME,
        won BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (player_id) REFERENCES Players(player_id)
    )";
    $conn->exec($sql);
    echo "Table Games created successfully<br>";

    // Insert dummy data into Games table
    $games = [
        "(1, '00:25:00', FALSE)",
        "(1, '00:30:00', FALSE)",
        "(1, '00:15:00', FALSE)",
        "(1, '00:28:00', FALSE)",
        "(1,'00:10:00', FALSE)",
        "(1, '00:20:00', TRUE)",
        "(2,'00:18:00', TRUE)",
        "(2, '00:35:00', TRUE)",
        "(2, '00:22:00', TRUE)",
        "(2, '00:27:00', TRUE)",
        "(2, '00:19:00', TRUE)",
        "(2,'00:16:00', TRUE)",
        "(3, '00:28:00', FALSE)",
        "(3,'00:10:00', FALSE)",
        "(3, '00:20:00', TRUE)",
        "(3,'00:18:00', TRUE)",
        "(3, '00:35:00', TRUE)",
        "(3, '00:22:00', TRUE)",
        "(3, '00:27:00', TRUE)",
        "(3, '00:19:00', TRUE)",
    ];

    // Single INSERT statement
    $sql = "INSERT INTO Games (player_id, duration, won) VALUES " . implode(', ', $games);
    $conn->exec($sql);
    echo "Dummy game records inserted successfully<br>";


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null; // Close database connection

?>
