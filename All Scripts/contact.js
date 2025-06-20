// Contact Form Submission
const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const button = contactForm.querySelector("button");

    if (!firstName || !lastName || !email || !message) {
      responseMessage.innerHTML = '<span style="color: red;">❗ Please fill in all fields.</span>';
      return;
    }

    button.innerHTML = '<span class="spinner"></span> Sending...';
    button.disabled = true;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("contactEmail", email);
    formData.append("contactMessage", message);

    try {
      const response = await fetch("Mail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        responseMessage.innerHTML = '<span style="color: green;">✅ ' + result.message + '</span>';
        contactForm.reset();
      } else {
        throw new Error(result.message || "Failed to send. Please try again.");
      }
    } catch (error) {
      responseMessage.innerHTML = '<span style="color: red;">❌ ' + error.message + '</span>';
    }

    button.innerHTML = "Send Message";
    button.disabled = false;
    setTimeout(() => (responseMessage.innerHTML = ""), 5000); // Clear message after 5 seconds
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