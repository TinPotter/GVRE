// Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dynamic Member Count (Simulated)
const updateMemberCount = () => {
    const onlineMembers = document.getElementById('online-members');
    const offlineMembers = document.getElementById('offline-members');
    const totalMembers = document.getElementById('total-members');

    const newOnline = Math.floor(Math.random() * 100) + 300;
    const newOffline = Math.floor(Math.random() * 200) + 700;

    onlineMembers.textContent = newOnline;
    offlineMembers.textContent = newOffline;
    totalMembers.textContent = newOnline + newOffline + 12; // +12 bots
};

setInterval(updateMemberCount, 5000);
updateMemberCount(); // Initial update
