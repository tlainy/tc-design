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
    
    // Removed legacy CTA alert placeholder
    
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

    // Simple horizontal carousel with buttons and equalized height to tallest image
    const carousel = document.getElementById('discovery-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('[data-dir="prev"]');
        const nextBtn = carousel.querySelector('[data-dir="next"]');
        let currentIndex = 0;
        const slideCount = slides.length;

        function equalizeHeights() { /* fixed to 680px in CSS, no-op kept for safety */ }

        function getSlideWidth() {
            return carousel.getBoundingClientRect().width;
        }

        function goTo(index) {
            currentIndex = (index + slideCount) % slideCount; // wrap endlessly
            track.scrollTo({ left: currentIndex * getSlideWidth(), behavior: 'smooth' });
        }

        function scrollBySlide(dir) {
            goTo(currentIndex + dir);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => scrollBySlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollBySlide(1));

        // Equalize on load and whenever images load/resize
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                if (!img.complete) {
                    img.addEventListener('load', equalizeHeights);
                }
            }
        });
        // Keep index in sync with manual scroll (e.g., swipe)
        let scrollTimeout;
        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const w = getSlideWidth();
                currentIndex = Math.round(track.scrollLeft / w);
            }, 100);
        });

        window.addEventListener('resize', () => {
            equalizeHeights();
            // snap to current slide after resize
            track.scrollTo({ left: currentIndex * getSlideWidth(), behavior: 'instant' });
        });
        equalizeHeights();
    }
});
