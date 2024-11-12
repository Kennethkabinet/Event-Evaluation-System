const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function togglePassword() {
	const passwordField = document.getElementById("password");
	const toggleIcon = document.getElementById("toggleIcon");
	
	if (passwordField.type === "password") {
		passwordField.type = "text";
		toggleIcon.classList.remove("fa-eye");
		toggleIcon.classList.add("fa-eye-slash");
	} else {
		passwordField.type = "password";
		toggleIcon.classList.remove("fa-eye-slash");
		toggleIcon.classList.add("fa-eye");
	}
}