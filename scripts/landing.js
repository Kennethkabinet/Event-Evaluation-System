// Add active class to navbar items based on scroll and clicks
const sections = document.querySelectorAll("section, main");
const navLinks = document.querySelectorAll(".navbar nav a");


let lastScrollY = window.scrollY; // Store the last scroll position


// Update the active state on scroll
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;


    if (currentScrollY > lastScrollY) {
        // Scrolling down
        updateActiveLinks(false);
    } else {
        // Scrolling up
        updateActiveLinks(true);
    }


    lastScrollY = currentScrollY;
});


// Update the active state on click
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        // Remove active class from all links
        navLinks.forEach((navLink) => navLink.classList.remove("active"));


        // Add active class to the clicked link
        link.classList.add("active");
    });
});


function updateActiveLinks(includeAll) {
    let current = "";


    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80; // Adjust for navbar height
        const sectionBottom = sectionTop + section.offsetHeight;


        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute("id");


            if (includeAll) {
                highlightNavLinks(section);
            }
        }
    });


    if (!includeAll) {
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }
}


function highlightNavLinks(section) {
    navLinks.forEach((link) => {
        const targetSection = link.getAttribute("href").replace("#", "");
        if (targetSection === section.getAttribute("id")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active"); // Ensure others are not active
        }
    });
}


function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

