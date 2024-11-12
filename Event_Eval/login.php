<?php
session_start();
include("database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Registration ng mga students
    if (isset($_POST['signup'])) {
        $firstName = filter_input(INPUT_POST, "firstName", FILTER_SANITIZE_SPECIAL_CHARS);
        $lastName = filter_input(INPUT_POST, "lastName", FILTER_SANITIZE_SPECIAL_CHARS);
        $department = filter_input(INPUT_POST, "department", FILTER_SANITIZE_SPECIAL_CHARS);
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
        $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

        if (empty($email) || empty($firstName) || empty($lastName) || empty($department) || empty($password)) {
            echo "Please fill in all fields.";
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO register (firstName, lastName, email, department, password) VALUES ('$firstName', '$lastName', '$email', '$department', '$hash')";
            if (mysqli_query($conn, $sql)) {
                echo "You are now registered!";
            } else {
                echo "Registration failed: " . mysqli_error($conn);
            }
        }
    }

    // Login Checker
    if (isset($_POST['login'])) {
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
        $password = filter_input(INPUT_POST, "pwd", FILTER_SANITIZE_STRING);

        if (empty($email) || empty($password)) {
            echo "Please enter email and password.";
        } else {

            // Step 1: Check kung admin account
            $sql_admin = "SELECT * FROM admin WHERE email = '$email'";
            $result_admin = mysqli_query($conn, $sql_admin);
            if ($result_admin && mysqli_num_rows($result_admin) > 0) {
                $admin = mysqli_fetch_assoc($result_admin);

                // Direct password comparison(di na nahash gawa nageerror pag hinash ko di ko alam kung bakit)
                if ($password === $admin['password']) {
                    $_SESSION['admin_id'] = $admin['id'];  // Store admin's ID in session
                    header("Location: eventcreation.php");  // Redirect to admin event creation page
                    exit();
                } else {
                    echo "Invalid admin email or password.";
                }
            } else {
                // Step 2: Check ig user account ba yon
                $sql_user = "SELECT * FROM register WHERE email = '$email'";
                $result_user = mysqli_query($conn, $sql_user);
                if ($result_user && mysqli_num_rows($result_user) > 0) {
                    $user = mysqli_fetch_assoc($result_user);

                    // Verify password ng user
                    if (password_verify($password, $user['password'])) {
                        $_SESSION['user_id'] = $user['id'];  
                        header("Location: event.php"); 
                        exit();
                    } else {
                        echo "Invalid user email or password.";
                    }
                } else {
                    echo "Invalid email or password.";
                }
            }
        }
    }
}

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style/login.css">
    <title>Login & Sign Up</title>
</head>
<body>
    <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                <div style="margin-bottom: 35px;">
                    <h1 style="color: #EC1D27; white-space: nowrap; font-size: 28px;">Create Account</h1>
                    <span>Building Better Events Together!</span>
                </div>
                <label for="firstName" style="margin-right: 400px;">First Name</label>
                <input type="text" placeholder="Enter your first name" name="firstName"/>
                <label for="lastName" style="margin-right: 400px;">Last Name</label>
                <input type="text" placeholder="Enter your last name" name="lastName"/>
                <label for="department" style="margin-right: 390px;">Department</label>
                <input type="text" placeholder="eg. CICS" name="department"/>
                <label for="email" style="margin-right: 430px;">Email</label>
                <input type="email" placeholder="Example@gmail.com" name="email"/>
                <label for="password" style="padding-right: 350px;">Create a password</label>
                <input type="password" placeholder="It must be 8 characters" name="password"/>
                <input type="submit" class="btn" value="Register" name="signup">
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                <div style="margin-bottom: 35px;">
                    <h1 style="color: #EC1D27; white-space: nowrap; font-size: 28px;">Login to EventEval</h1>
                    <span>Better Events Together!</span>
                </div>
                <label for="email" style="margin-right: 430px;">Email</label>
                <input type="email" placeholder="Email" required maxlength="40" name="email"/>
                <label for="password" style="padding-right: 405px;">Password</label>
                <div class="password-container">
                    <input type="password" id="password" name="pwd" placeholder="Password" required maxlength="40"/>
                    <button type="button" class="toggle-password" onclick="togglePassword()">
                        <i id="toggleIcon" class="fas fa-eye"></i>
                    </button>
                </div>
                <a href="#" style="margin-left: 260px; color: #EC1D27; font-weight: 500;">Forgot your password?</a>
                <input type="submit" class="btn" value="Login" name="login">
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Hello, Spartans!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button class="ghost" id="signIn">Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Spartans!</h1>
                    <p>Enter your personal details and start your journey with us</p>
                    <button class="ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    
    <footer>
        <p>
            Visit the BSU Website <i class="fa fa-heart"></i> by
            <a target="_blank" href="https://batstateu.edu.ph/">Clicking this</a>
        </p>
    </footer>
    <script src="scripts/login.js"></script>
</body>
</html>
