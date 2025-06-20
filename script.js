// Select elements
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

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
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
    });
});

// Slideshow Functionality
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Start slideshow
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    setInterval(autoSlide, 5000); // Change slide every 5 seconds

    // Intersection Observer for Section Animations
    const sections = document.querySelectorAll(".fade-in");
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