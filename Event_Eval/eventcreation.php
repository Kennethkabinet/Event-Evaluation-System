<?php

?>
<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Creation</title>
    <script src="navbar/AdminNavloader.js" defer></script>
    <link rel="stylesheet" href="style/eventcreation.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>
<body>
<div id="adminbar"></div>
    <div class="navbarmargin" style="margin-top:88px">
    <main>
        <h1 style="padding: 30px;">Event Creation Evaluation Form</h1>
        <br>
        <br>

        <form action="save_event.php" method="POST" enctype="multipart/form-data">
            <div class="container">
                <div class="head-form">
                    <h2>Form Name</h2>
                    <div class="input-group"> 
                        <input type="text" name="form_name" placeholder="Untitled Form" required>
                        <input type="submit" value="Deploy">
                    </div>
                </div>

                <h2>Event Information:</h2>
                <hr style="width: 860px; margin: 20px auto;">
                <br>
                <div class="form-description">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="departmentinfo">Department:</label>
                            <input type="text" name="departmentinfo" id="departmentinfo" required>
                        </div>
                        <div class="form-group">
                            <label for="dateinfo">Date:</label>
                            <input type="date" name="dateinfo" id="dateinfo" required>
                        </div>
                    </div>

                    <div class="form-group description">
                        <label for="descriptioninfo">Description:</label>
                        <textarea name="descriptioninfo" id="descriptioninfo" rows="4" placeholder="Add your short description" required></textarea>
                    </div>
                </div>

                <h2>Evaluation Questions:</h2>
                <div class="form-question">
                    <!-- New question group ay papasok dine -->
                </div>

                <div class="add-question">
                    <button type="button"><i class="fas fa-plus"></i> Add New Question</button>
                </div>
            </div>
        </form>
    </main>
    </div>
    <script src="navbar/navmover.js"></script>
    <script src="scripts/eventcreation.js"></script>
</body>
</html>