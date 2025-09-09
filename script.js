// Funcionalidad del menú móvil modernizado
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Toggle del menú móvil con animaciones
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animación de las barras del menú hamburguesa
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = mobileMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg) translate(${index === 0 ? '5px, 5px' : index === 1 ? '0, 0' : '5px, -5px'})`
                : 'none';
        });
    });

    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Resetear animación de barras
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        });
    });

    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Resetear animación de barras
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        }
    });

    // Efecto de scroll en el header
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
});

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Funciones para modales de autenticación
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Cerrar modales al hacer clic fuera de ellos
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Cerrar modales con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="flex"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Animaciones de scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content, .stats');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validación básica
    if (!name || !email || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío (aquí conectarías con tu backend)
    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
    this.reset();
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Activar contadores cuando las estadísticas son visibles
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Efecto de typing en el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Activar efecto de typing cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Efecto de hover en las tarjetas de servicios
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Lazy loading para imágenes (si las agregas en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Función para detectar si el usuario está en un dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar animaciones en dispositivos móviles
if (isMobile()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}

// Manejo de redimensionamiento de ventana
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalcular posiciones si es necesario
        if (isMobile()) {
            // Ajustes específicos para móvil
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        } else {
            // Ajustes para desktop
            document.documentElement.style.setProperty('--animation-duration', '0.6s');
        }
    }, 250);
});

// Función para mostrar/ocultar botón de "volver arriba"
function toggleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
}

// Crear botón de "volver arriba" si no existe
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1d4ed8';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#2563eb';
    });
    
    document.body.appendChild(backToTop);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', toggleBackToTop);
});

// Sistema de partículas oceánicas espectaculares
function createOceanParticles() {
    const bubblesContainer = document.getElementById('bubbles');
    const fishContainer = document.getElementById('fish');
    const seaweedContainer = document.getElementById('seaweed');
    
    if (!bubblesContainer || !fishContainer || !seaweedContainer) return;

    // Crear burbujas
    createBubbles(bubblesContainer);
    
    // Crear peces
    createFish(fishContainer);
    
    // Crear algas marinas
    createSeaweed(seaweedContainer);
}

function createBubbles(container) {
    const bubbleCount = 30;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 15 + 5;
        const delay = Math.random() * 10;
        const duration = Math.random() * 8 + 6;
        
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(14, 165, 233, 0.3) 50%, 
                rgba(6, 182, 212, 0.1) 100%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            bottom: -20px;
            animation: bubbleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        `;
        container.appendChild(bubble);
    }
}

function createFish(container) {
    const fishCount = 8;
    const fishTypes = ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🦀', '🐚'];
    
    for (let i = 0; i < fishCount; i++) {
        const fish = document.createElement('div');
        fish.className = 'fish';
        const size = Math.random() * 30 + 20;
        const delay = Math.random() * 15;
        const duration = Math.random() * 20 + 15;
        const depth = Math.random() * 60 + 20;
        
        fish.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            font-size: ${size}px;
            top: ${depth}%;
            left: -50px;
            animation: fishSwim ${duration}s linear infinite;
            animation-delay: ${delay}s;
            filter: drop-shadow(0 0 5px rgba(14, 165, 233, 0.5));
        `;
        fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        container.appendChild(fish);
    }
}

function createSeaweed(container) {
    const seaweedCount = 6;
    
    for (let i = 0; i < seaweedCount; i++) {
        const seaweed = document.createElement('div');
        seaweed.className = 'seaweed';
        const height = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        
        seaweed.style.cssText = `
            position: absolute;
            width: 8px;
            height: ${height}px;
            background: linear-gradient(180deg, 
                rgba(34, 197, 94, 0.8) 0%, 
                rgba(16, 185, 129, 0.6) 50%, 
                rgba(5, 150, 105, 0.4) 100%);
            left: ${left}%;
            bottom: 0;
            border-radius: 4px 4px 0 0;
            animation: seaweedSway 4s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        `;
        container.appendChild(seaweed);
    }
}

// Efectos de partículas dinámicas
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const speed = Math.random() * 2 + 0.5;
        const direction = Math.random() * 360;
        
        setInterval(() => {
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            
            particle.style.left = (currentX + Math.cos(direction) * speed) + '%';
            particle.style.top = (currentY + Math.sin(direction) * speed) + '%';
            
            // Resetear posición si sale de la pantalla
            if (currentX > 100 || currentX < 0 || currentY > 100 || currentY < 0) {
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
            }
        }, 50);
    });
}

// Efecto de cursor personalizado
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(102, 126, 234, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(251, 191, 36, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(102, 126, 234, 0.8)';
        });
    });
}

// Efectos de scroll suave mejorado
function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('servicios');
        });
    }
}

// Animaciones de entrada mejoradas
function initAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación especial para tarjetas de servicios
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        if (card === entry.target) {
                            setTimeout(() => {
                                card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
                            }, 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content, .stats, .hero-badge, .hero-title, .hero-description');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Efectos de hover mejorados
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // Efecto de brillo
            const shine = document.createElement('div');
            shine.className = 'shine-effect';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.6s ease;
            `;
            this.appendChild(shine);
            
            setTimeout(() => {
                shine.style.left = '100%';
            }, 10);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            const shine = this.querySelector('.shine-effect');
            if (shine) {
                shine.remove();
            }
        });
    });
}

// Efectos de typing mejorado
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const lines = originalText.split('\n');
        
        heroTitle.innerHTML = '';
        
        lines.forEach((line, lineIndex) => {
            const lineElement = document.createElement('span');
            lineElement.className = 'title-line';
            lineElement.style.opacity = '0';
            lineElement.style.transform = 'translateY(30px)';
            heroTitle.appendChild(lineElement);
            
            setTimeout(() => {
                typeWriter(lineElement, line, 50, lineIndex * 0.5);
            }, lineIndex * 500);
        });
    }
}

// Función de typing mejorada
function typeWriter(element, text, speed, delay = 0) {
    setTimeout(() => {
        let i = 0;
        element.innerHTML = '';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }, delay * 1000);
}

// Efectos oceánicos avanzados
function initOceanEffects() {
    // Efecto de ondas en el cursor
    document.addEventListener('mousemove', createRipple);
    
    // Efecto de gotas de agua
    setInterval(createWaterDrop, 2000);
    
    // Efecto de brillo coral
    initCoralGlow();
    
    // Efecto de marea
    initTideEffect();
}

function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        pointer-events: none;
        z-index: 1000;
        animation: rippleEffect 0.6s ease-out;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createWaterDrop() {
    const drop = document.createElement('div');
    drop.className = 'water-drop';
    drop.style.cssText = `
        position: fixed;
        width: 4px;
        height: 20px;
        background: linear-gradient(180deg, 
            rgba(14, 165, 233, 0.8) 0%, 
            rgba(6, 182, 212, 0.4) 100%);
        left: ${Math.random() * 100}vw;
        top: -20px;
        pointer-events: none;
        z-index: 100;
        animation: waterDrop 3s linear;
        border-radius: 2px;
    `;
    document.body.appendChild(drop);
    
    setTimeout(() => {
        drop.remove();
    }, 3000);
}

function initCoralGlow() {
    const elements = document.querySelectorAll('.service-card, .btn, .nav-link');
    elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.animation = 'coralGlow 2s ease-in-out infinite';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

function initTideEffect() {
    const tide = document.createElement('div');
    tide.className = 'tide-effect';
    tide.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(14, 165, 233, 0.1) 25%, 
            transparent 50%, 
            rgba(6, 182, 212, 0.1) 75%, 
            transparent 100%);
        pointer-events: none;
        z-index: 1;
        animation: tideFlow 8s ease-in-out infinite;
    `;
    document.body.appendChild(tide);
}

// Efectos de profundidad oceánica
function initOceanDepth() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.background = `
            linear-gradient(135deg, 
                #0f172a 0%, 
                #1e3a8a 20%, 
                #0ea5e9 40%, 
                #06b6d4 60%, 
                #0891b2 80%, 
                #0c4a6e 100%),
            radial-gradient(circle at 50% 50%, 
                rgba(14, 165, 233, 0.3) 0%, 
                transparent 50%)
        `;
        hero.style.animation = 'oceanDepth 10s ease-in-out infinite';
    }
}

// Efectos de luz submarina
function initUnderwaterLighting() {
    const elements = document.querySelectorAll('.hero-content, .service-card, .about-content');
    elements.forEach(el => {
        el.style.animation = 'underwaterLight 6s ease-in-out infinite';
    });
}

// Efectos de transición de sección espectaculares
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activar efectos específicos por sección
                    activateSectionEffects(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(section);
    });
}

function activateSectionEffects(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
        case 'servicios':
            activateCoralReef();
            activateTropicalFish();
            break;
        case 'sobre-nosotros':
            activateFloatingIslands();
            activateJellyfish();
            break;
        case 'contacto':
            activateInteractiveCoral();
            activateSeaTurtles();
            break;
    }
}

function activateCoralReef() {
    const corals = document.querySelectorAll('.coral');
    corals.forEach((coral, index) => {
        setTimeout(() => {
            coral.style.animation = 'coralSway 6s ease-in-out infinite, coralPulse 4s ease-in-out infinite';
        }, index * 200);
    });
}

function activateTropicalFish() {
    const fish = document.querySelectorAll('.tropical-fish');
    fish.forEach((fish, index) => {
        setTimeout(() => {
            fish.style.animation = 'tropicalFishSwim 15s linear infinite, bioluminescence 3s ease-in-out infinite';
        }, index * 500);
    });
}

function activateFloatingIslands() {
    const islands = document.querySelectorAll('.island');
    islands.forEach((island, index) => {
        setTimeout(() => {
            island.style.animation = 'islandFloat 8s ease-in-out infinite, islandGlow 4s ease-in-out infinite';
        }, index * 300);
    });
}

function activateJellyfish() {
    const jellyfish = document.querySelectorAll('.jellyfish');
    jellyfish.forEach((jelly, index) => {
        setTimeout(() => {
            jelly.style.animation = 'jellyfishFloat 6s ease-in-out infinite, jellyfishGlow 3s ease-in-out infinite';
        }, index * 400);
    });
}

function activateInteractiveCoral() {
    const corals = document.querySelectorAll('.coral-interactive');
    corals.forEach((coral, index) => {
        coral.addEventListener('click', function() {
            this.style.animation = 'coralPulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'coralGlow 4s ease-in-out infinite';
            }, 500);
        });
    });
}

function activateSeaTurtles() {
    const turtles = document.querySelectorAll('.turtle');
    turtles.forEach((turtle, index) => {
        setTimeout(() => {
            turtle.style.animation = 'turtleSwim 20s linear infinite, bioluminescence 5s ease-in-out infinite';
        }, index * 1000);
    });
}

// Efectos de tormenta marina
function initStormEffects() {
    const stormTransition = document.querySelector('.storm-transition');
    if (stormTransition) {
        // Efecto de tormenta aleatoria
        setInterval(() => {
            if (Math.random() < 0.3) {
                triggerStorm();
            }
        }, 10000);
    }
}

function triggerStorm() {
    const stormTransition = document.querySelector('.storm-transition');
    if (stormTransition) {
        stormTransition.style.animation = 'stormEffect 2s ease-in-out';
        
        // Efectos de sonido visual
        const lightning = document.querySelectorAll('.bolt');
        lightning.forEach(bolt => {
            bolt.style.animation = 'lightningFlash 0.1s ease-in-out infinite';
        });
        
        setTimeout(() => {
            stormTransition.style.animation = 'none';
            lightning.forEach(bolt => {
                bolt.style.animation = 'lightningFlash 0.5s ease-in-out infinite';
            });
        }, 2000);
    }
}

// Efectos de bioluminiscencia marina
function initBioluminescence() {
    const elements = document.querySelectorAll('.jellyfish, .coral, .tropical-fish');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation += ', bioluminescence 1s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = this.style.animation.replace(', bioluminescence 1s ease-in-out infinite', '');
        });
    });
}

// Efectos de corrientes oceánicas
function initOceanCurrents() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundSize = '400% 400%';
        hero.style.animation = 'oceanCurrent 20s ease-in-out infinite';
    }
}

// Efectos de arrecife interactivo
function initInteractiveReef() {
    const corals = document.querySelectorAll('.coral-interactive');
    
    corals.forEach(coral => {
        coral.addEventListener('click', function() {
            // Crear efecto de ondas
            createCoralRipple(this);
            
            // Efecto de brillo
            this.style.animation = 'coralPulse 0.5s ease-in-out';
            
            // Crear partículas de coral
            createCoralParticles(this);
        });
    });
}

function createCoralRipple(coral) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 107, 107, 0.6);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: rippleEffect 1s ease-out;
        pointer-events: none;
    `;
    coral.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function createCoralParticles(coral) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff6b6b;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: coralParticleFloat 1s ease-out forwards;
            pointer-events: none;
        `;
        coral.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Efectos de isla flotante
function initFloatingIslands() {
    const islands = document.querySelectorAll('.island');
    
    islands.forEach(island => {
        island.addEventListener('mouseenter', function() {
            this.style.animation = 'islandFloat 8s ease-in-out infinite, islandGlow 2s ease-in-out infinite';
        });
        
        island.addEventListener('mouseleave', function() {
            this.style.animation = 'islandFloat 8s ease-in-out infinite';
        });
    });
}

// Efectos de medusa bioluminiscente
function initJellyfishEffects() {
    const jellyfish = document.querySelectorAll('.jellyfish');
    
    jellyfish.forEach(jelly => {
        jelly.addEventListener('click', function() {
            // Efecto de pulso
            this.style.animation = 'jellyfishFloat 6s ease-in-out infinite, jellyfishGlow 1s ease-in-out infinite';
            
            // Crear efecto de tentáculos
            createTentacleEffect(this);
        });
    });
}

function createTentacleEffect(jellyfish) {
    for (let i = 0; i < 3; i++) {
        const tentacle = document.createElement('div');
        tentacle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 30px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
            left: 50%;
            top: 100%;
            transform: translateX(-50%) rotate(${i * 120}deg);
            animation: tentacleWave 2s ease-in-out infinite;
            pointer-events: none;
        `;
        jellyfish.appendChild(tentacle);
        
        setTimeout(() => {
            tentacle.remove();
        }, 2000);
    }
}

// Efectos 3D espectaculares
function init3DEffects() {
    // Efectos de cámara 3D
    init3DCamera();
    
    // Efectos de profundidad 3D
    init3DDepth();
    
    // Efectos de iluminación 3D
    init3DLighting();
    
    // Efectos de partículas 3D
    init3DParticles();
    
    // Efectos de transición 3D
    init3DTransitions();
    
    // Efectos de rotación 3D
    init3DRotation();
}

function init3DCamera() {
    const hero = document.querySelector('.hero');
    if (hero) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            const rotateX = mouseY * 20;
            const rotateY = mouseX * 20;
            
            hero.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
}

function init3DDepth() {
    const elements = document.querySelectorAll('.cube-3d, .sphere-3d, .particle-3d');
    
    elements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'depth3DShift 2s ease-in-out infinite';
            this.style.transform += ' translateZ(50px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = this.style.animation.replace('depth3DShift 2s ease-in-out infinite', '');
            this.style.transform = this.style.transform.replace(' translateZ(50px)', '');
        });
    });
}

function init3DLighting() {
    const lightSources = document.querySelectorAll('.light-source');
    
    lightSources.forEach((light, index) => {
        setInterval(() => {
            light.style.animation = 'lighting3DDynamic 3s ease-in-out infinite';
        }, index * 1000);
    });
}

function init3DParticles() {
    const particles = document.querySelectorAll('.particle-3d');
    
    particles.forEach((particle, index) => {
        particle.addEventListener('mouseenter', function() {
            this.style.animation = 'volumetric3DParticles 4s ease-in-out infinite';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.animation = 'particle3DFloat 12s linear infinite';
        });
    });
}

function init3DTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'section3DTransition 2s ease-in-out';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(section);
    });
}

function init3DRotation() {
    const cubes = document.querySelectorAll('.cube-3d');
    
    cubes.forEach((cube, index) => {
        cube.addEventListener('click', function() {
            this.style.animation = 'oceanElement3DRotate 3s ease-in-out';
            
            // Crear efecto de partículas 3D
            create3DParticleExplosion(this);
        });
    });
}

function create3DParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(14, 165, 233, 0.6) 100%);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
            animation: volumetric3DParticles 2s ease-out forwards;
            transform: translateZ(0);
        `;
        
        // Aplicar dirección aleatoria
        const angle = (i / 10) * 360;
        const distance = 100 + Math.random() * 100;
        const endX = centerX + Math.cos(angle * Math.PI / 180) * distance;
        const endY = centerY + Math.sin(angle * Math.PI / 180) * distance;
        
        particle.style.setProperty('--end-x', `${endX}px`);
        particle.style.setProperty('--end-y', `${endY}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Efectos de parallax 3D multi-capa
function init3DParallax() {
    const layers = document.querySelectorAll('.wave-3d, .particle-3d, .light-source');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        layers.forEach((layer, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const zPos = scrolled * 0.1;
            
            layer.style.transform += ` translateY(${yPos}px) translateZ(${zPos}px)`;
        });
    });
}

// Efectos de iluminación 3D realista
function init3DRealisticLighting() {
    const elements = document.querySelectorAll('.cube-face, .sphere-surface');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'realistic3DLighting 2s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = this.style.animation.replace('realistic3DLighting 2s ease-in-out infinite', '');
        });
    });
}

// Efectos de cámara 3D dinámica
function init3DDynamicCamera() {
    const hero = document.querySelector('.hero');
    if (hero) {
        let isMouseOver = false;
        
        hero.addEventListener('mouseenter', () => {
            isMouseOver = true;
            hero.style.animation = 'camera3DMove 8s ease-in-out infinite';
        });
        
        hero.addEventListener('mouseleave', () => {
            isMouseOver = false;
            hero.style.animation = 'none';
        });
    }
}

// Inicialización de todas las funcionalidades oceánicas 3D espectaculares
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas oceánicas
    createOceanParticles();
    
    // Inicializar efectos oceánicos
    initOceanEffects();
    initOceanDepth();
    initUnderwaterLighting();
    
    // Inicializar efectos 3D espectaculares
    init3DEffects();
    init3DParallax();
    init3DRealisticLighting();
    init3DDynamicCamera();
    
    // Inicializar efectos espectaculares
    initSectionTransitions();
    initStormEffects();
    initBioluminescence();
    initOceanCurrents();
    initInteractiveReef();
    initFloatingIslands();
    initJellyfishEffects();
    
    // Inicializar efectos avanzados
    initCustomCursor();
    initSmoothScroll();
    initAdvancedAnimations();
    initHoverEffects();
    initTypingEffect();
    
    // Mostrar loading spinner oceánico 3D
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'flex';
        loadingSpinner.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0ea5e9 100%)';
        loadingSpinner.style.transform = 'perspective(1000px) rotateX(15deg)';
        
        setTimeout(() => {
            loadingSpinner.style.opacity = '0';
            loadingSpinner.style.transform = 'perspective(1000px) rotateX(0deg)';
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }, 2000);
    }
});

// Efectos de parallax mejorado
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Efecto parallax en las tarjetas flotantes
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Agregar animaciones CSS adicionales
const additionalStyles = `
@keyframes coralParticleFloat {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) translateY(-50px) scale(1);
        opacity: 0;
    }
}

@keyframes tentacleWave {
    0%, 100% {
        transform: translateX(-50%) rotate(0deg);
    }
    50% {
        transform: translateX(-50%) rotate(10deg);
    }
}
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Agregar animaciones CSS 3D adicionales
const additional3DStyles = `
@keyframes volumetric3DParticles {
    0% {
        transform: translateZ(0) scale(0) rotateX(0deg) rotateY(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
        transform: translateZ(50px) scale(1) rotateX(45deg) rotateY(45deg);
    }
    50% {
        transform: translateZ(200px) scale(1.5) rotateX(90deg) rotateY(180deg);
    }
    90% {
        opacity: 1;
        transform: translateZ(400px) scale(1) rotateX(135deg) rotateY(270deg);
    }
    100% {
        transform: translateZ(500px) scale(0) rotateX(180deg) rotateY(360deg);
        opacity: 0;
    }
}

@keyframes tentacleWave {
    0%, 100% {
        transform: translateX(-50%) rotate(0deg);
    }
    50% {
        transform: translateX(-50%) rotate(10deg);
    }
}

/* Efectos 3D adicionales */
.cube-3d:hover {
    animation: oceanElement3DRotate 2s ease-in-out infinite;
}

.sphere-3d:hover {
    animation: sphere3DRotate 3s linear infinite, sphere3DPulse 1s ease-in-out infinite;
}

.particle-3d:hover {
    animation: volumetric3DParticles 3s ease-in-out infinite;
}
`;

// Inyectar estilos 3D adicionales
const styleSheet3D = document.createElement('style');
styleSheet3D.textContent = additional3DStyles;
document.head.appendChild(styleSheet3D);

console.log('🌊 OceanWave - Experiencia oceánica 3D ESPECTACULAR cargada correctamente!');
