// Select elements
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

// Toggle menu on click
mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("open");
});

// Close menu when clicking outside (Improvement)
document.addEventListener("click", (event) => {
    if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
    }
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});