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

// ===== MEMBER COUNTER (DISCORD API, INVITE-BASED) =====

// You can use either a full invite URL or just the invite code
const inviteLink = "https://discord.gg/NXhWtMWQwr";
const inviteCode = inviteLink.split("/").pop();

const updateCounters = async () => {
  try {
    const res = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
    if (!res.ok) throw new Error("Discord API error");
    const data = await res.json();

    const total = data.approximate_member_count || 0;
    const online = data.approximate_presence_count || 0;
    const offline = total - online;

    // Update DOM
    document.querySelector("#member-count").textContent = total;
    document.querySelector('.mnum[data-target="1250"]').textContent = total;
    document.querySelector('.mnum.online').textContent = online;
    document.querySelector('.mnum.offline').textContent = offline;
  } catch (err) {
    console.error("Failed to fetch Discord counts:", err);
  }
};

// Initial + refresh every 30s
updateCounters();
setInterval(updateCounters, 30000);

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

