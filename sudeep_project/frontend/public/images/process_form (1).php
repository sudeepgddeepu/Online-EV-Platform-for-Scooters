<?php
$servername = "localhost";  // or IP address/domain name of your MySQL server
$username = "vijay";
$password = "21is114";
$dbname = "dream_events";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $place = $_POST["place"];

    // Insert data into the database
    $sql = "INSERT INTO contact_form (name, phone, email, place) VALUES ('$name', '$phone', '$email', '$place')";
    if ($conn->query($sql) === TRUE) {
        echo "Form submitted successfully!";
        // You can also send an email to the admin here
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
