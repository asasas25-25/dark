/**
 * Основной скрипт бренда NOIR
 * Отвечает за интерактивность: скролл, анимации появления, обработка формы, мобильное меню.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ЭФФЕКТ СКРОЛЛА НАВИГАЦИИ
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. ОБРАБОТКА ФОРМЫ КОНТАКТОВ
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Форма отправлена:', formData);
            
            const submitBtn = contactForm.querySelector('.contact-form__submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '✓ Отправлено';
            submitBtn.style.background = '#2b9d4a';
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // 5. МОБИЛЬНОЕ МЕНЮ
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        menuBtn.classList.add('active');
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    console.log('NOIR Brand Site Loaded Successfully.');
});