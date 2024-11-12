<?php
include 'database.php';

$eventId = $_GET['event_id'];
$sql = "SELECT question FROM evaluation_questions WHERE event_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $eventId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_assoc($result)) {
    echo "<p>" . htmlspecialchars($row['question']) . "</p>";
}
?>
