document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in, .slide-in, .zoom-in");
    const navbar = document.querySelector(".project-navbar");

    // Function to check when elements come into view
    function handleScroll() {
        fadeElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                el.classList.add("visible");
            }
        });

        // Navbar background change on scroll
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(10, 115, 4, 1)";
        } else {
            navbar.style.background = "rgba(10, 115, 4, 0.9)";
        }
    }

    // Apply the function on scroll
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once to check initial state

    // Smooth scrolling for internal page links only
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute("href");

            // Check if the link is an internal page link (starts with #)
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            } 
            // Else, let external links (like index.html) navigate normally
        });
    });
});

// Hamburger Menu Functionality for Contact Page
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("project-nav-links");

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
        document.querySelectorAll("#project-nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("open");
            });
        });
    }
});