<?php
include 'database.php'; // Include the database connection

// Fetch all events from the database
$sql = "SELECT * FROM events";
$result = mysqli_query($conn, $sql);

?><!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events</title>
    <script src="navbar/Navloader.js" defer></script>
    <link rel="stylesheet" href="style/event.css"> <!-- Link to external CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</head>

<body>
    <div id="navbar"></div>
    <div class="navbarmargin" style="margin-top:88px">
        <main>
            <h1 style="padding: 30px;">Upcoming Events</h1>
            <div class="container">
                <ul class="card-list">
                    <?php
                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<li class='card-item swiper-slide'>";
                            echo "<a href='#' class='card-link'>";
                            echo "<img src='style/Images/Backgroundimage.jpg' alt='card-image' class='card-image'>";
                            echo "<div class='card-content'>";
                            echo "<label class='badge'>" . $row['event_name'] . "</label>";
                            echo "<p class='card-description'>" . $row['description'] . "</p>";
                            echo "<label class='card-title'>Department: </label><p>" . $row['department'] . "</p>";
                            echo "<label class='card-title'>Date: </label><p>" . $row['event_date'] . "</p>";
                            echo "<button class='card-button'>";
                            echo "<span class='material-symbols-outlined'>arrow_forward</span>";
                            echo "</button>";
                            echo "</div>";
                            echo "</a>";
                            echo "</li>";
                        }
                    } else {
                        echo "<p>No events found.</p>";
                    }
                    mysqli_close($conn);
                    ?>
                </ul>
            </div>
        </main>
    <script src="navbar/navmover.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="scripts/swiper.js"></script>
</body>

</html>
