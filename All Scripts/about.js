// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("about-nav-links");

    // Ensure elements exist before adding event listeners
    if (mobileMenu && navLinks) {       
        // Toggle menu on click
        mobileMenu.addEventListener("click", () => {
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
        document.querySelectorAll("#about-nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("open");
            });
        });
    }
});