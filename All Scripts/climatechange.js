document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".project-navbar");
    const infoBoxes = document.querySelectorAll(".info-box");

    // Fade in header title on page load
    const headerTitle = document.querySelector("header h1");
    headerTitle.classList.add("fade-in-on-load");

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Reveal Elements on Scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    infoBoxes.forEach(box => observer.observe(box));
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