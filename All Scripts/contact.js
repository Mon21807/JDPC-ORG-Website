// ============================================================
//  CONTACT FORM HANDLER WITH AJAX
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
            const message = document.getElementById('contactMessage').value.trim();

            // Validate
            if (!firstName || !lastName || !email || !message) {
                responseMessage.className = 'response-message error';
                responseMessage.textContent = '❗ Please fill in all required fields.';
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                responseMessage.className = 'response-message error';
                responseMessage.textContent = '❗ Please enter a valid email address.';
                return;
            }

            // Show loading state
            responseMessage.className = 'response-message loading';
            responseMessage.innerHTML = '<span class="spinner"></span> Sending your message...';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Sending...';

            // Prepare form data
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('contactEmail', email);
            formData.append('subject', subject || 'No Subject');
            formData.append('contactMessage', message);

            try {
                const response = await fetch('Mail.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    responseMessage.className = 'response-message success';
                    responseMessage.innerHTML = '✅ ' + result.message;
                    contactForm.reset();
                    submitBtn.innerHTML = '✅ Sent!';
                    submitBtn.style.background = '#28a745';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.style.background = '#0a7304d6';
                        submitBtn.disabled = false;
                    }, 3000);

                    // Clear response after 5 seconds
                    setTimeout(() => {
                        responseMessage.className = 'response-message';
                        responseMessage.innerHTML = '';
                    }, 5000);
                } else {
                    responseMessage.className = 'response-message error';
                    responseMessage.innerHTML = '❌ ' + (result.message || 'Failed to send. Please try again.');
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                responseMessage.className = 'response-message error';
                responseMessage.innerHTML = '❌ Network error. Please check your connection and try again.';
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================================
    //  HAMBURGER MENU FUNCTIONALITY
    // ============================================================

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('contact-nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('#contact-nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
});