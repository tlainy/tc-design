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

    // Inline zoom controls for images (no modal)
    (function initInlineZoom() {
        const zoomables = document.querySelectorAll('img[data-zoomable]');
        zoomables.forEach(img => {
            // Wrap image in a scrollable container
            const wrapper = document.createElement('div');
            wrapper.className = 'zoom-inline';
            const parent = img.parentNode;
            parent.replaceChild(wrapper, img);
            wrapper.appendChild(img);

            // Controls (top-left like Google Maps)
            const ctrls = document.createElement('div');
            ctrls.className = 'zoom-controls-inline';
            const btnIn = document.createElement('button');
            btnIn.className = 'zoom-btn';
            btnIn.setAttribute('aria-label', 'Zoom in');
            btnIn.textContent = '+';
            const btnOut = document.createElement('button');
            btnOut.className = 'zoom-btn';
            btnOut.setAttribute('aria-label', 'Zoom out');
            btnOut.textContent = '−';
            const btnFit = document.createElement('button');
            btnFit.className = 'zoom-btn';
            btnFit.setAttribute('aria-label', 'Fit to frame');
            btnFit.textContent = 'Fit';
            ctrls.appendChild(btnIn); ctrls.appendChild(btnOut); ctrls.appendChild(btnFit);
            wrapper.appendChild(ctrls);

            // Keep controls pinned within the scrollable viewframe
            function syncControlsToScroll() {
                const x = wrapper.scrollLeft;
                const y = wrapper.scrollTop;
                ctrls.style.transform = `translate(${x}px, ${y}px)`;
            }
            // Initialize and bind scroll synchronization
            syncControlsToScroll();
            wrapper.addEventListener('scroll', syncControlsToScroll, { passive: true });

            // Behavior
            let scale = 1;
            img.style.transformOrigin = '0 0';
            img.style.transform = 'scale(1)';
            img.style.maxWidth = 'none';
            img.style.width = '100%';

            function apply() { img.style.transform = `scale(${scale})`; }
            btnIn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); scale = Math.min(4, scale + 0.25); apply(); });
            btnOut.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); scale = Math.max(0.5, scale - 0.25); apply(); });
            btnFit.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); scale = 1; apply(); wrapper.scrollTop = 0; wrapper.scrollLeft = 0; syncControlsToScroll(); });
        });
    })();
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
