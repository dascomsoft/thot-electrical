// Initialisation AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        if (!menuOpen) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.style.transform = 'translateX(0)';
            }, 10);
        } else {
            mobileMenu.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
        menuOpen = !menuOpen;
    });
}

// Compteurs animés
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounting = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounting(counter), 1);
    } else {
        counter.innerText = target;
    }
};

// Observer pour les compteurs
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            startCounting(counter);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// Simulateur solaire
const calculateSavings = () => {
    const consumption = document.getElementById('consumption')?.value;
    if (consumption) {
        const panels = Math.ceil(consumption / 350);
        const savings = (consumption * 12 * 100).toFixed(2);
        document.getElementById('panels-result').innerText = panels;
        document.getElementById('savings-result').innerText = savings;
    }
};

// Carrousel avant/après
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

const showSlide = (index) => {
    slides.forEach(slide => slide.classList.add('hidden'));
    slides[index]?.classList.remove('hidden');
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
};

// Formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de succès
        const button = contactForm.querySelector('button');
        const originalText = button.innerText;
        button.innerText = 'Message envoyé ! ✓';
        button.classList.add('bg-green-500');
        
        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('bg-green-500');
            contactForm.reset();
        }, 3000);
        
        // Ici vous pouvez ajouter l'envoi réel du formulaire
        console.log('Formulaire soumis');
    });
}

// Animation au scroll pour les titres
window.addEventListener('scroll', () => {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    });
});

// Initialisation des tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const text = e.target.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'absolute bg-yellow-500 text-blue-900 px-2 py-1 rounded text-sm -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap';
        tooltipEl.innerText = text;
        e.target.appendChild(tooltipEl);
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltipEl = tooltip.querySelector('div');
        if (tooltipEl) tooltipEl.remove();
    });
});