<?php

include 'dbConnect.php'; // Connect to database

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['action'] == 'register') {
    $username = filter_input(INPUT_POST, 'username', FILTER_UNSAFE_RAW);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = filter_input(INPUT_POST, 'password', FILTER_UNSAFE_RAW);

    // TODO: Hash password before storing it
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO Players (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $conn->prepare($sql);
        $success = $stmt->execute(['username' => $username, 'email' => $email, 'password' => $hashedPassword]);

        if ($success) {
            echo json_encode(["message" => "Registration successful"]);
        } else {
            echo json_encode(["error" => "Registration failed"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['action'] == 'login') {
    $username = filter_input(INPUT_POST, 'username', FILTER_UNSAFE_RAW);
    $password = filter_input(INPUT_POST, 'password', FILTER_UNSAFE_RAW);

    try {
        $sql = "SELECT password FROM Players WHERE username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['username' => $username]);

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (password_verify($password, $row['password'])) {
                echo json_encode(["message" => "Login successful"]);
            } else {
                echo json_encode(["error" => "Invalid credentials"]);
            }
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}

$conn = null; // Close database connection
