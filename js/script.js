// PaiR Website — Script

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Contact form — submit to Formspree via fetch for inline feedback
    const forms = document.querySelectorAll('#contactForm');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            const data = new FormData(form);

            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        btn.textContent = '✓  Message Sent';
                        btn.style.background = '#28a745';
                        btn.style.borderColor = '#28a745';
                        btn.style.opacity = '1';
                        form.reset();
                    } else {
                        btn.textContent = 'Error — please try again';
                        btn.style.background = '#dc3545';
                        btn.style.borderColor = '#dc3545';
                        btn.style.opacity = '1';
                    }
                    setTimeout(() => {
                        btn.textContent = original;
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(() => {
                    btn.textContent = 'Error — please try again';
                    btn.style.background = '#dc3545';
                    btn.style.borderColor = '#dc3545';
                    btn.style.opacity = '1';
                    setTimeout(() => {
                        btn.textContent = original;
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    });
});
