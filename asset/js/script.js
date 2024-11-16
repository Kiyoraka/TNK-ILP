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

    // Countdown Timer Setup
    const setupCountdown = () => {
        // Set target date (December 12, 2024)
        const sulukStartDate = new Date('2024-12-12T00:00:00');
        const sulukEndDate = new Date('2025-01-01T00:00:00');
        
        // Get counter elements
        const counterBox = document.querySelector('.counter-box');
        
        // Create new elements for detailed countdown
        const countdownContainer = document.createElement('div');
        countdownContainer.innerHTML = `
            <h2 class="countdown-title">Suluk bulan Disember suluk 20 hari di Pondok Bidayatul Hidayah.</h2>
            <div class="countdown-days"><span id="days-remaining">0</span> hari lagi</div>
            <div class="countdown-time"><span id="hours-remaining">0</span> jam <span id="minutes-remaining">0</span> minit <span id="seconds-remaining">0</span> saat</div>
            <div class="countdown-date">Tarikh: 12 Dec 2024 - 1 Jan 2025</div>
            <div class="countdown-hijri">Tarikh Hijrah: 10 Jamadilakhir 1446H - 1 Rejab 1446H</div>
            <button class="counter-btn">Sebarkan</button>
        `;

        // Replace existing counter content
        if (counterBox) {
            counterBox.innerHTML = '';
            counterBox.appendChild(countdownContainer);
        }

        // Update countdown function
        const updateCountdown = () => {
            const now = new Date();
            const difference = sulukStartDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                // Update the countdown display
                document.getElementById('days-remaining').textContent = days;
                document.getElementById('hours-remaining').textContent = hours;
                document.getElementById('minutes-remaining').textContent = minutes;
                document.getElementById('seconds-remaining').textContent = seconds;
            } else if (now >= sulukStartDate && now <= sulukEndDate) {
                countdownContainer.innerHTML = `
                    <h2 class="countdown-title">Suluk sedang berlangsung!</h2>
                    <div class="countdown-date">12 Dec 2024 - 1 Jan 2025</div>
                    <div class="countdown-hijri">10 Jamadilakhir 1446H - 1 Rejab 1446H</div>
                    <button class="counter-btn">Sebarkan</button>
                `;
            } else {
                countdownContainer.innerHTML = `
                    <h2 class="countdown-title">Suluk telah selesai</h2>
                    <div class="countdown-date">Sila tunggu pengumuman tarikh suluk yang akan datang</div>
                    <button class="counter-btn">Sebarkan</button>
                `;
            }
        };

        // Update countdown every second
        setInterval(updateCountdown, 1000);
        // Initial call to avoid delay
        updateCountdown();
    };

    // Initialize countdown
    setupCountdown();

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