document.addEventListener("DOMContentLoaded", () => {
    // Scroll animation for fade-in effect
    const fadeElements = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => appearOnScroll.observe(el));

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
    }
});