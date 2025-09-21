// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from(".hero-content h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-content p", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".cta-buttons a", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Floating Elements Animation
gsap.to(".float-1", {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".float-2", {
    y: -15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".float-3", {
    y: -25,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Card Hover Effects
document.querySelectorAll('.card.glass').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== TAB SYSTEM =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
    });
});

// ===== ACCORDION =====
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);

    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    observer.observe(counter);
});

// ===== MOBILE NAV TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// ===== FLOATING LOGO CLICK EFFECT =====
const floatingLogo = document.querySelector('.floating-logo');

floatingLogo.addEventListener('click', () => {
    gsap.to(floatingLogo, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
});
