/* Base Styles */
:root {
    --primary: #4CAF50;
    --secondary: #2196F3;
    --dark: #1E1E1E;
    --light: #F5F5F5;
    --roblox-red: #FF5722;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
}

body {
    background-color: var(--light);
    color: var(--dark);
    line-height: 1.6;
}

/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--primary);
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo img {
    border-radius: 50%;
    border: 2px solid white;
}

.logo h1 {
    font-family: 'Bubblegum Sans', cursive;
    font-size: 1.5rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.3s;
}

.nav-links a:hover {
    color: var(--roblox-red);
}

.hamburger {
    display: none;
    cursor: pointer;
}

.hamburger span {
    display: block;
    width: 25px;
    height: 3px;
    background: white;
    margin: 5px 0;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    text-align: center;
    padding: 4rem 2rem;
    border-radius: 0 0 20px 20px;
    margin-bottom: 2rem;
}

.hero h2 {
    font-family: 'Bubblegum Sans', cursive;
    font-size: 3rem;
    margin-bottom: 1rem;
}

.btn {
    display: inline-block;
    background: white;
    color: var(--primary);
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 700;
    margin-top: 1rem;
    transition: 0.3s;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Sections */
section {
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

section h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-family: 'Bubblegum Sans', cursive;
    color: var(--primary);
}

/* About */
.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.story, .ownership {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

/* Community */
.sus-moments, .emojis {
    margin-bottom: 2rem;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.image-grid img {
    width: 100%;
    border-radius: 10px;
    transition: 0.3s;
}

.image-grid img:hover {
    transform: scale(1.03);
}

.emoji-grid {
    display: flex;
    gap: 1rem;
    font-size: 2rem;
    margin-top: 1rem;
}

/* Members */
.member-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
    margin-bottom: 0.5rem;
    color: var(--secondary);
}

.online {
    color: var(--primary);
    font-weight: 700;
}

/* Rules */
.rule-list {
    display: grid;
    gap: 1rem;
}

.rule-item {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.rule-item h3 {
    color: var(--roblox-red);
    margin-bottom: 0.5rem;
}

/* Footer */
footer {
    text-align: center;
    padding: 1.5rem;
    background: var(--dark);
    color: white;
}

footer a {
    color: var(--secondary);
    text-decoration: none;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        position: absolute;
        top: 70px;
        left: 0;
        background: var(--primary);
        padding: 1rem;
        gap: 1rem;
    }

    .nav-links.active {
        display: flex;
    }

    .hamburger {
        display: block;
    }

    .about-content {
        grid-template-columns: 1fr;
    }
}