// 1. Initialize Lenis (Smooth Scrolling)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// --- PRELOADER ANIMATION ---
const tl = gsap.timeline();

// Counter Logic
function startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue === 100) {
            return;
        }
        currentValue += Math.floor(Math.random() * 10) + 1;
        if (currentValue > 100) currentValue = 100;
        
        counterElement.textContent = currentValue;
        
        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    }
    updateCounter();
}

startLoader();

// Reveal Site after loader finishes
tl.to(".counter", 0.25, {
    delay: 3.5, // Wait for the numbers to likely finish
    opacity: 0,
});

tl.to(".preloader", 0.8, {
    height: 0,
    ease: "power4.inOut",
});

// Hero Text Reveal (Staggered)
tl.to(".line span", {
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    delay: -0.5
});

// --- SCROLL ANIMATIONS ---

// Work Section: Items fade in and slide up
gsap.utils.toArray(".project-item").forEach((item) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Browser Window: Scale up effect
gsap.from(".browser-window", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        end: "top 20%",
        scrub: 1
    },
    scale: 0.8,
    opacity: 0.5,
    duration: 1
});

// --- MOUSE FOLLOWER FOR PROJECT IMAGES ---
// This makes the project image follow the mouse inside the link
const projects = document.querySelectorAll('.project-item');

projects.forEach((project) => {
    const img = project.querySelector('.project-img-wrapper');
    
    project.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Move the image wrapper to mouse position
        // We use fixed positioning in CSS, so we just update Left/Top
        img.style.left = x + 'px';
        img.style.top = y + 'px';
    });
});