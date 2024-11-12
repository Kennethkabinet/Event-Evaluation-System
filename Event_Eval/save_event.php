<?php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // pangkuha ng data sa form
    $event_name = mysqli_real_escape_string($conn, $_POST['form_name']);
    $department = mysqli_real_escape_string($conn, $_POST['departmentinfo']);
    $event_date = $_POST['dateinfo'];
    $description = mysqli_real_escape_string($conn, $_POST['descriptioninfo']);

    // image checker
    if (isset($_FILES['eventimage']) && $_FILES['eventimage']['error'] === 0) {
        // Specify the directory
        $upload_dir = 'uploads/';
        $image_name = basename($_FILES['eventimage']['name']);
        $image_path = $upload_dir . $image_name;
        
        // tagalipat ng na-upload na file sa server
        if (move_uploaded_file($_FILES['eventimage']['tmp_name'], $image_path)) {
            // Image uploaded successfully, insert event into the database
            $sql = "INSERT INTO events (event_name, department, event_date, description, image) 
                    VALUES ('$event_name', '$department', '$event_date', '$description', '$image_path')";
        } else {
            // Image upload failed
            $sql = "INSERT INTO events (event_name, department, event_date, description) 
                    VALUES ('$event_name', '$department', '$event_date', '$description')";
        }
    } else {
        // No image uploaded
        $sql = "INSERT INTO events (event_name, department, event_date, description) 
                VALUES ('$event_name', '$department', '$event_date', '$description')";
    }

    // query execution
    if (mysqli_query($conn, $sql)) {
        header("Location: eventcreation.php");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

// Close the database connection
mysqli_close($conn);
?>
