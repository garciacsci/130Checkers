<?php

header('Content-Type: application/json');

include 'dbConnect.php'; // Connect to database

if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == 'getLeaderboard') {
    try {
        $sql = "SELECT Players.username, SUM(Games.score) as total_score, COUNT(Games.game_id) as games_played 
                FROM Players 
                JOIN Games ON Players.player_id = Games.player_id 
                GROUP BY Players.player_id 
                ORDER BY total_score DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($leaderboard);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

$conn = null; // Close database connection