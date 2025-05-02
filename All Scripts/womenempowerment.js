document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".project-navbar");
    const sections = document.querySelectorAll(".fade-in");

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Reveal Sections on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});
// Hamburger menu functionality
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("project-nav-links");

if (mobileMenu && navLinks) {       
    // Toggle menu on click
    mobileMenu.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("open");
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll("#project-nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            mobileMenu.classList.remove("open");
        });
    });
};