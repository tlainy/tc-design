// Main JavaScript file for TC Design

document.addEventListener('DOMContentLoaded', function() {
    console.log('TC Design website loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For non-hash links (e.g., *.html), allow the browser to navigate normally
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = '#fff';
        }
    });
    
    // CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Thank you for your interest! This is a placeholder - contact functionality would go here.');
        });
    }
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile navigation toggle
    const toggleButton = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeButton = document.querySelector('.menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    function openMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (toggleButton) toggleButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
    }

    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', () => {
            const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMenu() : openMenu();
        });
    }
    if (closeButton) {
        closeButton.addEventListener('click', closeMenu);
    }
    if (mobileLinks && mobileLinks.length) {
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close mobile menu when resizing to desktop breakpoint
    function handleResize() {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    }
    window.addEventListener('resize', handleResize);
    // Run once on load in case page loads with menu open and wide viewport
    handleResize();
});
