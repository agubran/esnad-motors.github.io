/* =====================================================
   ESNAD MOTORS - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // =====================================================
    // Preloader
    // =====================================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 500);
    });

    // =====================================================
    // Header Scroll Effect
    // =====================================================
    const header = document.getElementById('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // =====================================================
    // Mobile Navigation
    // =====================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    navToggle.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking backdrop
    navBackdrop.addEventListener('click', closeMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // =====================================================
    // Active Navigation Link on Scroll
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);

    // =====================================================
    // Smooth Scrolling
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // Animated Counters
    // =====================================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.floor(target * easedProgress);
                
                // Format number with + suffix for large numbers
                if (target >= 1000) {
                    counter.textContent = current.toLocaleString('en-US');
                } else {
                    counter.textContent = current;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 1000) {
                        counter.textContent = target.toLocaleString('en-US');
                    } else {
                        counter.textContent = target;
                    }
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }
    
    // Intersection Observer for counters
    const statsSection = document.querySelector('.hero-stats');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // =====================================================
    // Scroll Reveal Animation (Left/Right/Up)
    // =====================================================
    
    // About section - image from left, content from right
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImage) {
        aboutImage.classList.add('reveal', 'reveal-left');
    }
    if (aboutContent) {
        aboutContent.classList.add('reveal', 'reveal-right');
    }
    
    // Feature cards - alternate left/right
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        card.classList.add(`reveal-delay-${(index % 3) + 1}`);
    });
    
    // Product cards - alternate
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        card.classList.add(`reveal-delay-${(index % 4) + 1}`);
    });
    
    // Client cards - from bottom with stagger
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach((card, index) => {
        card.classList.add('reveal', 'reveal-up');
        card.classList.add(`reveal-delay-${(index % 4) + 1}`);
    });
    
    // Brand cards - alternate
    const brandCards = document.querySelectorAll('.brand-card');
    brandCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        card.classList.add(`reveal-delay-${(index % 4) + 1}`);
    });
    
    // Mini cards and our brands
    const miniCards = document.querySelectorAll('.mini-card');
    miniCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(index === 0 ? 'reveal-left' : 'reveal-right');
    });
    
    const ourBrands = document.querySelectorAll('.our-brand');
    ourBrands.forEach((card, index) => {
        card.classList.add('reveal', 'reveal-up');
        card.classList.add(`reveal-delay-${(index % 3) + 1}`);
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    if (contactInfo) {
        contactInfo.classList.add('reveal', 'reveal-left');
    }
    if (contactFormWrapper) {
        contactFormWrapper.classList.add('reveal', 'reveal-right');
    }
    
    // Section headers - from bottom
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal', 'reveal-up');
    });
    
    // Intersection Observer for all reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // =====================================================
    // Back to Top Button
    // =====================================================
    const backToTop = document.getElementById('back-to-top');
    
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =====================================================
    // Hero Form - WhatsApp
    // =====================================================
    const heroForm = document.getElementById('hero-form');
    
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const car = heroForm.querySelector('[name="car"]').value.trim();
            const part = heroForm.querySelector('[name="part"]').value.trim();
            const phone = heroForm.querySelector('[name="phone"]').value.trim();
            
            if (!car || !part || !phone) return;
            
            const message = `طلب سريع من الموقع:

🚗 نوع السيارة: ${car}
🔧 القطعة المطلوبة: ${part}
📱 رقم الجوال: ${phone}`;
            
            const whatsappUrl = `https://wa.me/966553159705?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // =====================================================
    // Contact Form - WhatsApp
    // =====================================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email') || 'غير محدد';
            const carType = formData.get('car-type') || 'غير محدد';
            const message = formData.get('message');
            
            const whatsappMessage = `*طلب جديد من الموقع*

👤 *الاسم:* ${name}
📱 *الجوال:* ${phone}
📧 *البريد:* ${email}
🚗 *نوع السيارة:* ${carType}
📝 *التفاصيل:* ${message}`;
            
            const whatsappUrl = `https://wa.me/966553159705?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('شكراً لتواصلك معنا! سيتم تحويلك إلى واتساب.');
            contactForm.reset();
        });
    }

    // =====================================================
    // Card Hover Effects
    // =====================================================
    const hoverCards = document.querySelectorAll('.product-card, .feature-card');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // =====================================================
    // Lazy Load Images
    // =====================================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // =====================================================
    // Form Input Focus Effects
    // =====================================================
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // =====================================================
    // Phone Number Formatting
    // =====================================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove non-numeric characters except +
            this.value = this.value.replace(/[^\d+]/g, '');
        });
    });

    // =====================================================
    // Prevent Form Resubmission
    // =====================================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

});

// =====================================================
// Dynamic Year Update
// =====================================================
document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
});
