document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".project-navbar");
  const sections = document.querySelectorAll(".fade-in");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("project-nav-links");
  const activityItems = document.querySelectorAll(".activity-item");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Section reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

  // Activity items reveal on scroll
  const activityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const details = entry.target.querySelector(".activity-details");
        details.classList.add("slide-in-right");
        activityObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  activityItems.forEach(item => activityObserver.observe(item));

  // Hamburger menu toggle
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });

    // Close menu on outside click
    document.addEventListener("click", (event) => {
      if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
      }
    });

    // Close menu on nav link click
    document.querySelectorAll("#project-nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
      });
    });
  }
});