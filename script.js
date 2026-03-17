// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link tracking
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateNav() {
    const y = window.scrollY + 100;
    sections.forEach(sec => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
            navAnchors.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
            });
        }
    });
}
window.addEventListener('scroll', updateNav);
updateNav();

// Scroll fade-in observer
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => fadeObs.observe(el));

// Animated counter
function runCounter(el, target, duration) {
    const step = target / (duration / 16);
    let val = 0;
    const t = setInterval(() => {
        val += step;
        if (val >= target) { el.textContent = target; clearInterval(t); }
        else { el.textContent = Math.floor(val); }
    }, 16);
}

const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const target = parseInt(e.target.dataset.count);
            if (!isNaN(target)) { runCounter(e.target, target, 1200); cntObs.unobserve(e.target); }
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el));
