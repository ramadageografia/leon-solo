// Script para o site LEON - Solo

console.log('🎸 LEON - Solo website carregado! Rock de Raiz Universal!');

// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animar as barras do hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Fechar menu mobile se aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Scroll suave
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'none';
    }
});

// Animação de revelação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.about-content, .music-grid, .shows-list, .contact-content, .music-card, .show-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animar elementos do hero com delay
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-button');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300 * (index + 1));
    });
});

// Simulação de player de música
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
        const musicTitle = this.parentElement.querySelector('h3').textContent;
        alert(`🎵 Tocando preview de: ${musicTitle}\n\nEm breve disponível nas plataformas digitais!`);
        
        // Efeito visual no botão
        this.textContent = '⏸️ Playing...';
        this.style.backgroundColor = '#00ff00';
        this.style.color = '#000';
        
        setTimeout(() => {
            this.textContent = '▶️ Preview';
            this.style.backgroundColor = '';
            this.style.color = '';
        }, 2000);
    });
});

// Simulação de compra de ingressos
document.querySelectorAll('.ticket-button').forEach(button => {
    button.addEventListener('click', function() {
        const showInfo = this.parentElement.querySelector('.show-info h3').textContent;
        const showDate = this.parentElement.querySelector('.show-date .day').textContent;
        const showMonth = this.parentElement.querySelector('.show-date .month').textContent;
        
        alert(`🎟️ Ingressos para: ${showInfo}\nData: ${showDate} ${showMonth}\n\nEm breve disponíveis para compra online!`);
        
        // Efeito visual
        const originalText = this.textContent;
        this.textContent = 'EM BREVE!';
        this.style.backgroundColor = '#ffd700';
        this.style.color = '#000';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
            this.style.color = '';
        }, 1500);
    });
});

// Contador para próximos shows
function updateShowDates() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    const nextMonth2 = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    
    // Atualizar datas nos cards de shows
    const showDates = document.querySelectorAll('.show-date .day');
    const showMonths = document.querySelectorAll('.show-date .month');
    
    if (showDates.length >= 2) {
        // Primeiro show
        showDates[0].textContent = nextMonth.getDate();
        showMonths[0].textContent = nextMonth.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
        
        // Segundo show
        showDates[1].textContent = nextMonth2.getDate();
        showMonths[1].textContent = nextMonth2.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase();
    }
}

// Inicializar quando a página carregar
window.addEventListener('load', () => {
    updateShowDates();
    
    // Mensagem de boas-vindas no console
    console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║   🎸 LEON - SOLO WEITE ATIVO! 🎸     ║
    ║   Rock de Raiz Universal             ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    `);
    
    // Verificar se há imagens placeholder
    const placeholders = document.querySelectorAll('.image-placeholder, .cover-placeholder');
    if (placeholders.length > 0) {
        console.log('💡 Dica: Substitua os placeholders por imagens reais na pasta /images/');
    }
});

// Efeito de digitação no título (opcional)
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const speed = 100; // velocidade em ms
    
    function type() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Iniciar efeito após 1 segundo
    setTimeout(type, 1000);
}

// Descomente a linha abaixo para ativar o efeito de digitação:
// typeWriterEffect();
