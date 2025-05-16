document.addEventListener('DOMContentLoaded', function() {    // Header scroll effect    const header = document.querySelector('.glass-header');    const hero = document.querySelector('.hero');        window.addEventListener('scroll', function() {        // Get hero section height to determine when to change header style        const heroHeight = hero ? hero.offsetHeight : 300;                if (window.scrollY > heroHeight) {            // Past hero section - add scrolled class with animated gradient            header.classList.add('scrolled');            // Set animated gradient background            header.style.background = '';            header.style.animation = 'gradient 15s ease infinite';            header.style.backgroundSize = '400% 400%';            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';        } else if (window.scrollY > heroHeight / 2) {            // Past half of hero section - semi-opaque            header.classList.remove('scrolled');            header.style.background = 'rgba(255, 255, 255, 0.75)';            header.style.animation = 'none';            header.style.backdropFilter = 'blur(15px)';            header.style.webkitBackdropFilter = 'blur(15px)';            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';        } else if (window.scrollY > 20) {            // Scrolled a little bit but still in hero - subtle glass effect            header.classList.remove('scrolled');            header.style.background = 'rgba(255, 255, 255, 0.5)';            header.style.animation = 'none';            header.style.backdropFilter = 'blur(15px)';            header.style.webkitBackdropFilter = 'blur(15px)';            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';        } else {            // Top of page            header.classList.remove('scrolled');            header.style.background = 'rgba(255, 255, 255, 0.25)';            header.style.animation = 'none';            header.style.backdropFilter = 'blur(15px)';            header.style.webkitBackdropFilter = 'blur(15px)';            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';        }    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeNav = document.querySelector('.close-mobile-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeNav.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking a nav link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Services tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceGrids = document.querySelectorAll('.services-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all service grids
            serviceGrids.forEach(grid => grid.classList.remove('active'));
            
            // Show the corresponding grid
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-services').classList.add('active');
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Previous and next buttons
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // View more services button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    viewMoreBtn.addEventListener('click', function() {
        const activeGrid = document.querySelector('.services-grid.active');
        const hiddenCards = activeGrid.querySelectorAll('.service-card:nth-child(n+13)');
        
        hiddenCards.forEach(card => {
            if (card.style.display === 'none' || !card.style.display) {
                card.style.display = 'flex';
                viewMoreBtn.textContent = 'Show Less';
            } else {
                card.style.display = 'none';
                viewMoreBtn.textContent = 'View All Services';
            }
        });
    });

    // Enhanced scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal-up');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                // Add staggered delay based on element index
                setTimeout(() => {
                    element.classList.add('active');
                }, 100 * (index % 3)); // Reset stagger every 3 elements
            }
        });
    }
    
        // Special effects for about section removed
    
    // Initial check on load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header a, footer a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Adjust offset based on header height for better scrolling
                    const headerHeight = header.offsetHeight;
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight - 20, // Added 20px buffer
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}); 