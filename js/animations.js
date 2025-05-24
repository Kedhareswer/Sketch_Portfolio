// Hand-drawn Data Scientist Portfolio - Advanced Animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger if not already registered
    if (typeof ScrollTrigger !== 'undefined' && gsap) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Enhanced Skill Items Animation
    const animateSkillItems = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => {
                    item.classList.add('animate');
                    gsap.to(item, {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        duration: 0.3,
                        delay: index * 0.1
                    });
                },
                once: true
            });
        });
    };

    // Animated Handwriting Effect for Section Titles
    const animateSectionTitles = () => {
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            // Create SVG path for the underline
            const underline = document.createElement('div');
            underline.classList.add('title-underline');
            title.appendChild(underline);
            
            // Animate the title and underline
            ScrollTrigger.create({
                trigger: title,
                start: 'top 80%',
                onEnter: () => {
                    gsap.fromTo(title, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                    );
                    
                    gsap.fromTo(underline,
                        { width: '0%' },
                        { width: '100%', duration: 1.2, delay: 0.3, ease: "power2.inOut" }
                    );
                },
                once: true
            });
        });
    };

    // Enhanced Navigation Animation
    const animateNavigation = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        gsap.from(navLinks, {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        // Add active class to nav links on scroll
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    toggleClass: {
                        targets: link,
                        className: 'active-link'
                    },
                    onToggle: self => {
                        if (self.isActive) {
                            link.style.transform = 'scale(1.1) rotate(-1deg)';
                        } else {
                            link.style.transform = 'none';
                        }
                    }
                });
            }
        });
    };

    // Parallax Effect for Background Elements
    const createParallaxEffect = () => {
        const sections = document.querySelectorAll('.sketch-section');
        
        sections.forEach(section => {
            // Create decorative elements
            const numElements = 5;
            for (let i = 0; i < numElements; i++) {
                const element = document.createElement('div');
                element.classList.add('parallax-doodle');
                
                // Randomize appearance and position
                const size = Math.random() * 50 + 20;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const rotation = Math.random() * 360;
                
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.left = `${posX}%`;
                element.style.top = `${posY}%`;
                element.style.transform = `rotate(${rotation}deg)`;
                
                // Add to section
                section.appendChild(element);
                
                // Create parallax effect
                gsap.to(element, {
                    y: (i % 2 === 0) ? '50' : '-50',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });
    };

    // Interactive Project Cards
    const enhanceProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add tilt effect
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
            
            // Enhance project links
            const link = card.querySelector('.project-link');
            if (link) {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.1,
                        rotation: -2,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
                
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
            }
        });
    };

    // Animated Contact Form
    const enhanceContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        const button = form.querySelector('button');
        
        inputs.forEach(input => {
            // Create label animation
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.addEventListener('focus', () => {
                    gsap.to(label, {
                        y: -10,
                        scale: 0.9,
                        color: 'var(--accent-color)',
                        duration: 0.3
                    });
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        gsap.to(label, {
                            y: 0,
                            scale: 1,
                            color: 'var(--ink-color)',
                            duration: 0.3
                        });
                    }
                });
                
                // Check if input already has value
                if (input.value) {
                    gsap.set(label, {
                        y: -10,
                        scale: 0.9,
                        color: 'var(--accent-color)'
                    });
                }
            }
        });
        
        // Button animation
        if (button) {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    rotation: -1,
                    duration: 0.3
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3
                });
            });
        }
    };

    // Initialize all enhanced animations
    animateSkillItems();
    animateSectionTitles();
    animateNavigation();
    createParallaxEffect();
    enhanceProjectCards();
    enhanceContactForm();
});