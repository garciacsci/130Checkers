<?php

header('Content-Type: application/json');

include 'dbConnect.php'; // Connect to database

if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == 'getLeaderboard') {
    try {
        // Handle request to get leaderboard
        $sql = "SELECT Players.username, 
        SUM(Games.score) as total_score, 
        COUNT(Games.game_id) as games_played, 
        SUM(Games.won) as games_won, 
        SEC_TO_TIME(SUM(TIME_TO_SEC(Games.duration))) as total_time_played,
        (SUM(Games.won) / COUNT(Games.game_id)) as win_ratio
    FROM Players 
    JOIN Games ON Players.player_id = Games.player_id 
    GROUP BY Players.player_id 
    ORDER BY win_ratio DESC, games_played DESC, total_time_played DESC, Players.username ASC";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($leaderboard);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == 'getMyGames') {
    // Handle request to get games for the current player
    $playerId = $_GET['playerId'] ?? null;
    if ($playerId) {
        try {
            $sql = "SELECT * FROM Games WHERE player_id = :playerId";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['playerId' => $playerId]);

            $myGames = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($myGames);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Player ID is required"]);
    }
}

$conn = null; // Close database connection
