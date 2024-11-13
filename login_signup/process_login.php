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
    $email = $_POST['email'];
    $pass = $_POST['password'];

    // Prepare a statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Execute the statement
    $stmt->execute();
    $stmt->store_result(); // Store the result to check if the user exists

    // Check if the user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch(); // Fetch the hashed password

        // Verify the password
        if (password_verify($pass, $hashed_password)) {
            // Password is correct, redirect to index.html
            header("Location: /pranav-webpage/index.html");
            exit(); // Always call exit after header redirection
        } else {
            // Password is incorrect
            echo "Login failed! Incorrect password.";
        }
    } else {
        // User does not exist
        echo "Login failed! No user found with that email.";
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
