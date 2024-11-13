<?php
$servername = "localhost";
$username = "root"; // Change if necessary
$password = "scout"; // Change if necessary
$dbname = "pranav_web";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $email, $pass);

    // Execute the statement
    if ($stmt->execute()) {
        // If the signup was successful, redirect to index.html
        header("Location: /pranav-webpage/index.html");
        exit(); // Always call exit after header redirection
    } else {
        echo "Error: " . $stmt->error; // Display the error message
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>

