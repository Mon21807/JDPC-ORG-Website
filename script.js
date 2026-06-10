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

// ========== RFQ SECTION JAVASCRIPT ==========

// Countdown Timer for 13th June 2026, 5:00 PM
function startCountdown() {
    const deadline = new Date(2026, 5, 13, 17, 0, 0); // June 13, 2026 - 5:00 PM
    // Note: Month is 0-indexed, so 5 = June

    function updateCountdown() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Copy Email Function
function setupCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const email = 'jdpcaritasjs@yahoo.com';
            navigator.clipboard.writeText(email).then(function() {
                // Show toast notification
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.innerHTML = '✅ Copied! ' + email;
                document.body.appendChild(toast);
                
                setTimeout(function() {
                    toast.remove();
                }, 2000);
            });
        });
    }
}

// PDF Download Tracking
function setupPDFTracking() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Track download (optional - you can see in browser console)
            console.log('RFQ PDF downloaded at: ' + new Date().toLocaleString());
            // You can also send this to Google Analytics if you have it
        });
    }
}

// Initialize RFQ functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupCopyEmail();
    setupPDFTracking();
});