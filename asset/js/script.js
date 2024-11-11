// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle setup
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Slider functionality
    const sliderInit = () => {
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (!slider || !slides.length || !dots || !prevBtn || !nextBtn) {
            console.error('Slider elements not found');
            return;
        }

        let currentSlide = 0;
        let isAnimating = false;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isAnimating) goToSlide(index);
            });
            dots.appendChild(dot);
        });

        // Initialize first slide
        slides[0].classList.add('active');

        function goToSlide(index) {
            if (currentSlide === index) return;
            
            isAnimating = true;
            
            // Remove active class from current slide and dot
            slides[currentSlide].classList.remove('active');
            dots.children[currentSlide].classList.remove('active');
            
            // Update current slide index
            currentSlide = index;
            
            // Add active class to new slide and dot
            slides[currentSlide].classList.add('active');
            dots.children[currentSlide].classList.add('active');
            
            // Reset counter animation for new slide
            const counter = slides[currentSlide].querySelector('.counter');
            if (counter) {
                startCounter(counter);
            }
            
            // Reset animation lock after transition
            setTimeout(() => {
                isAnimating = false;
            }, 500); // Match this with your CSS transition time
        }

        function nextSlide() {
            if (!isAnimating) {
                const next = (currentSlide + 1) % slides.length;
                goToSlide(next);
            }
        }

        function prevSlide() {
            if (!isAnimating) {
                const prev = (currentSlide - 1 + slides.length) % slides.length;
                goToSlide(prev);
            }
        }

        // Counter animation function
        function startCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            function updateCounter() {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.min(Math.ceil(current), target);
                    requestAnimationFrame(updateCounter);
                }
            }

            counter.textContent = '0';
            updateCounter();
        }

        // Start counter for first slide
        const initialCounter = slides[0].querySelector('.counter');
        if (initialCounter) {
            startCounter(initialCounter);
        }

        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto slide
        let autoSlideInterval = setInterval(nextSlide, 11000);

        // Pause auto-slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 11000);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoSlideInterval);
            } else {
                autoSlideInterval = setInterval(nextSlide, 11000);
            }
        });
    };

    // Initialize slider
    sliderInit();
});