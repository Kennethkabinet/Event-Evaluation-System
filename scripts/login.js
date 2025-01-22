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

function showForgotPasswordPopup() {
	document.getElementById("forgotPasswordModal").style.display = "block";
}

function closeForgotPasswordPopup() {
	document.getElementById("forgotPasswordModal").style.display = "none";
}

window.onclick = function (event) {
	const modal = document.getElementById("forgotPasswordModal");
	if (event.target === modal) {
		modal.style.display = "none";
	}
};



document.addEventListener("DOMContentLoaded", () => {


    window.onload = () => {
        const preloader = document.getElementById("preloader");
        const preloaderImage = document.querySelector(".preloader-content-img");


        if (preloader && preloaderImage) {


            preloaderImage.style.transition = "opacity 0.5s ease"; // Smooth transition for blinking
            let blinkInterval = setInterval(() => {
                preloaderImage.style.opacity = preloaderImage.style.opacity === "0" ? "1" : "0";
            }, 500);


            // Add a fade-out effect
            setTimeout(() => {
                clearInterval(blinkInterval); // Stop the blinking
                preloaderImage.style.opacity = "1"; // Ensure the image is fully visible
                preloader.style.transition = "opacity 0.5s ease";
                preloader.style.opacity = "0";




                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 1000);
        }
    };
});


function openTermsModal() {
    const modal = document.getElementById("termsModal");
    modal.style.display = "block";
    modal.classList.remove("fade-out");
}

function closeTermsModal() {
    const modal = document.getElementById("termsModal");
    const modalContent = modal.querySelector(".modal-content");


    modal.classList.add("fade-out");
    modalContent.classList.add("fade-out");


    setTimeout(() => {
        modal.style.display = "none"; 
        modal.classList.remove("fade-out"); 
        modalContent.classList.remove("fade-out");
    }, 300);
}


document.querySelector('input[name="agreeTerms"]').addEventListener("click", function () {
    openTermsModal();
});
