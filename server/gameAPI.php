<?php

include 'dbConnect.php'; // Connect to database

// /endgame
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['action'] == 'endGame') {
    $game_id = filter_input(INPUT_POST, 'game_id', FILTER_SANITIZE_NUMBER_INT);
    $player_id = filter_input(INPUT_POST, 'player_id', FILTER_SANITIZE_NUMBER_INT);
    $score = filter_input(INPUT_POST, 'score', FILTER_SANITIZE_NUMBER_INT);
    $duration = filter_input(INPUT_POST, 'duration', FILTER_UNSAFE_RAW);
    $turns = filter_input(INPUT_POST, 'turns', FILTER_SANITIZE_NUMBER_INT);

    try {
        $sql = "UPDATE Games SET player_id = :player_id, score = :score, duration = :duration, turns = :turns WHERE game_id = :game_id";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute(['score' => $score, 'duration' => $duration, 'turns' => $turns, 'game_id' => $game_id]);

        if ($success) {
            echo json_encode(["message" => "Game results recorded successfully for game ID: $game_id"]);
        } else {
            echo json_encode(["error" => "Failed to record game results"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

$conn = null; // Close database connection

?>