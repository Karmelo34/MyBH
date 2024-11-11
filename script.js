document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
});
document.addEventListener('DOMContentLoaded', () => {
    const cardSlider = document.querySelector('.card-slider');
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.querySelector('.card-dots');
    
    let currentCard = 0;
    let startX = 0;
    let isDragging = false;
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('card-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCard(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.card-dot');
    
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentCard].classList.add('active');
    }
    
    function goToCard(index) {
        currentCard = index;
        cardSlider.style.transform = `translateX(-${currentCard * 100}%)`;
        updateDots();
    }
    
    // Touch events for mobile swipe
    cardSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    cardSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentCard < cards.length - 1) {
                goToCard(currentCard + 1);
            } else if (diff < 0 && currentCard > 0) {
                goToCard(currentCard - 1);
            }
            isDragging = false;
        }
    });
    
    cardSlider.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Auto-slide every 4 seconds
    setInterval(() => {
        currentCard = (currentCard + 1) % cards.length;
        goToCard(currentCard);
    }, 4000);
});
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('active');
        
        navToggle.setAttribute('aria-expanded', !isOpen);
        nav.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        const isNavClick = nav.contains(e.target);
        const isToggleClick = navToggle.contains(e.target);
        const isNavOpen = nav.classList.contains('active');

        if (!isNavClick && !isToggleClick && isNavOpen) {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });

    // Close nav when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
});
