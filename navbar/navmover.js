function initializeNavMover() {
    const body = document.querySelector("body");
    const sidebar = document.querySelector(".sidebar");
    const sidebarOpen = document.querySelector("#sidebarOpen");
    const sidebarClose = document.querySelector(".collapse_sidebar");
    const sidebarExpand = document.querySelector(".expand_sidebar");
    const navbarmargin = document.querySelector(".navbarmargin");  // Select the div with the class 'navbarmargin'

    if (sidebar && sidebarOpen && sidebarClose && sidebarExpand && navbarmargin) {
        sidebarOpen.addEventListener("click", () => {
            sidebar.classList.toggle("close");
            updateNavbarmargin(); // Update the margin when the sidebar is toggled
        });

        sidebarClose.addEventListener("click", () => {
            sidebar.classList.add("close", "hoverable");
            updateNavbarmargin(); // Update the margin when sidebar is collapsed
        });

        sidebarExpand.addEventListener("click", () => {
            sidebar.classList.remove("close", "hoverable");
            updateNavbarmargin(); // Update the margin when sidebar is expanded
        });

        sidebar.addEventListener("mouseenter", () => {
            if (sidebar.classList.contains("hoverable")) {
                sidebar.classList.remove("close");
                updateNavbarmargin(); // Update the margin on hover when sidebar is visible
            }
        });

        sidebar.addEventListener("mouseleave", () => {
            if (sidebar.classList.contains("hoverable")) {
                sidebar.classList.add("close");
                updateNavbarmargin(); // Update the margin when sidebar is hidden
            }
        });

        const submenuItems = document.querySelectorAll(".submenu_item");
        submenuItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                item.classList.toggle("show_submenu");
                submenuItems.forEach((item2, index2) => {
                    if (index !== index2) {
                        item2.classList.remove("show_submenu");
                    }
                });
            });
        });

        if (window.innerWidth < 768) {
            sidebar.classList.add("close");
            updateNavbarmargin(); // Adjust margin for smaller screens
        } else {
            sidebar.classList.remove("close");
            updateNavbarmargin(); // Adjust margin for larger screens
        }
    }

    // Function to update the margin-left of the navbarmargin based on sidebar state
    function updateNavbarmargin() {
        if (sidebar.classList.contains("close")) {
            // When sidebar is collapsed, set margin-left to 100px
            navbarmargin.style.marginLeft = "100px";
        } else {
            // When sidebar is expanded, set margin-left to 260px
            navbarmargin.style.marginLeft = "260px";
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeNavMover);
