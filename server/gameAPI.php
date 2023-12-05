<?php

include 'dbConnect.php'; // Connect to database

// /endgame
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['action'] == 'endGame') {
    $player_id = filter_input(INPUT_POST, 'player_id', FILTER_SANITIZE_NUMBER_INT);
    $score = filter_input(INPUT_POST, 'score', FILTER_SANITIZE_NUMBER_INT);
    $duration = filter_input(INPUT_POST, 'duration', FILTER_UNSAFE_RAW);
    $turns = filter_input(INPUT_POST, 'turns', FILTER_SANITIZE_NUMBER_INT);
    $won = filter_input(INPUT_POST, 'won', FILTER_SANITIZE_NUMBER_INT); // Assuming 'won' is sent as an integer (1 for true, 0 for false)

    try {
        $sql = "INSERT INTO Games (player_id, score, duration, turns, won) VALUES (:player_id, :score, :duration, :turns, :won)";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute([
            'player_id' => $player_id,
            'score' => $score,
            'duration' => $duration,
            'turns' => $turns,
            'won' => $won
        ]);

        if ($success) {
            $game_id = $conn->lastInsertId();
            echo json_encode(["message" => "Game results recorded successfully", "game_id" => $game_id]);
        } else {
            echo json_encode(["error" => "Failed to record game results"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

$conn = null; // Close database connection

?>