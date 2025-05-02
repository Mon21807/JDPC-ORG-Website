// Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const button = contactForm.querySelector("button");

    if (!firstName || !lastName || !email || !message) {
      alert("❗ Please fill in all fields.");
      return;
    }

    button.innerHTML = '<span class="spinner"></span> Sending...';
    button.disabled = true; // Disable button while sending

    const formData = new FormData();
    formData.append("First Name", firstName);
    formData.append("Last Name", lastName);
    formData.append("Email", email);
    formData.append("Message", message);

    try {
      const response = await fetch("https://formsubmit.co/ajax/jdpcaritasjs@yahoo.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("✅ Message Sent Successfully!");
        contactForm.reset();
      } else {
        throw new Error("Failed to Send! Please try again.");
      }
    } catch (error) {
      alert("❌ " + error.message);
    }

    button.innerHTML = "Send Message";
    button.disabled = false; // Re-enable button
  });
}

// Hamburger Menu Functionality for Contact Page
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("contact-nav-links");

  if (mobileMenu && navLinks) {
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
    document.querySelectorAll("#contact-nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("open");
      });
    });
  }
});