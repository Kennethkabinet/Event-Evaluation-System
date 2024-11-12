function loadNavbar() {
    console.log("Loading navbar...");
    fetch('navbar/UserNav.html') 
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            initializeNavMover(); 
        })
        .catch(error => console.error('Error loading navbar:', error));
}

window.onload = loadNavbar;
