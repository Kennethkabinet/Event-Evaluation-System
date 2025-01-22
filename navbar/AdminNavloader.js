function loadNavbar() {
    console.log("Loading admin navbar...");
    fetch('navbar/AdminNavbar.html') 
        .then(response => response.text())
        .then(data => {
            document.getElementById('adminbar').innerHTML = data; 
            initializeNavMover(); 
        })
        .catch(error => console.error('Error loading admin navbar:', error));
}

window.onload = loadNavbar;
