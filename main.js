// main.js - CORRECTED VERSION

document.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing animations...");
    
    // 1. Register GSAP plugins FIRST
    gsap.registerPlugin(ScrollTrigger);
    
    // 2. Initialize Lenis with proper GSAP integration
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    // 3. Link Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // 4. GSAP animation loop tied to Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    // 5. Disable GSAP's default scroll listener since we're using Lenis
    gsap.ticker.lagSmoothing(0);

    // --- PRELOADER ANIMATION ---
    function startLoader() {
        let counterElement = document.querySelector(".counter");
        if (!counterElement) {
            console.error("Counter element not found!");
            return;
        }

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

    // Create main timeline for preloader
    const tl = gsap.timeline();
    
    // Start counter immediately
    startLoader();

    // Preloader sequence
    tl.to(".counter", {
        opacity: 0,
        duration: 0.25,
        delay: 3.5 // Wait for counter
    })
    .to(".preloader", {
        height: 0,
        duration: 0.8,
        ease: "power4.inOut"
    })
    .from(".line span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.5"); // Overlap with previous animation

    // --- SCROLL ANIMATIONS ---

    // Work Section: Items fade in and slide up
    const projectItems = gsap.utils.toArray(".project-item");
    projectItems.forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
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
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
            markers: false // Set to true to debug scroll positions
        },
        scale: 0.8,
        opacity: 0,
        duration: 1
    });

    // --- MOUSE FOLLOWER FOR PROJECT IMAGES ---
    // FIXED VERSION: Using transform for better performance
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach((project) => {
        const link = project.querySelector('.project-link');
        const imgWrapper = project.querySelector('.project-img-wrapper');
        
        if (!link || !imgWrapper) return;
        
        // Show image on hover
        link.addEventListener('mouseenter', () => {
            gsap.to(imgWrapper, {
                opacity: 1,
                scale: 1,
                duration: 0.3
            });
        });
        
        // Hide image on mouse leave
        link.addEventListener('mouseleave', () => {
            gsap.to(imgWrapper, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3
            });
        });
        
        // Move image with mouse
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(imgWrapper, {
                x: x,
                y: y,
                duration: 0.1
            });
        });
    });

    console.log("All animations initialized!");
});

// Global error handling for debugging
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});