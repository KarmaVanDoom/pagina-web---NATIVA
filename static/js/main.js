/**
 * main.js — Lógica Global (Bionativa Premium)
 * Este archivo centraliza la interactividad para mantener el HTML limpio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ══════════ ANIMACIONES DE ENTRADA (Intersection Observer) ══════════
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /**
     * Inicializa la observación de elementos animados.
     * Se puede llamar de nuevo si se carga contenido dinámico (AJAX).
     */
    const initAnimations = () => {
        const elements = document.querySelectorAll('[data-animate]:not(.animate-in), .animate-in-init:not(.animate-in)');
        elements.forEach(el => observer.observe(el));
    };

    initAnimations();

    // ══════════ LÓGICA DEL MEGA MENÚ ══════════
    const btnMega = document.getElementById('btn-mega-menu');
    const megaNav = document.getElementById('megaNav');
    const megaDimmer = document.getElementById('megaDimmer');

    if (btnMega && megaNav && megaDimmer) {
        /**
         * Controla la apertura y cierre del mega menú.
         * @param {boolean} forceClose - Si es true, cierra el menú sin importar el estado actual.
         */
        const toggleMega = (forceClose = false) => {
            const isOpen = forceClose ? false : !megaNav.classList.contains('open');

            // Aplicar estados a las clases
            megaNav.classList.toggle('open', isOpen);
            btnMega.classList.toggle('active', isOpen);
            megaDimmer.classList.toggle('active', isOpen);

            // Control de scroll y accesibilidad
            document.body.style.overflow = isOpen ? 'hidden' : '';
            btnMega.setAttribute('aria-expanded', isOpen);
        };

        btnMega.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMega();
        });

        megaDimmer.addEventListener('click', () => toggleMega(true));

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (megaNav.classList.contains('open') && !megaNav.contains(e.target) && e.target !== btnMega) {
                toggleMega(true);
            }
        });

        // Cerrar con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && megaNav.classList.contains('open')) {
                toggleMega(true);
            }
        });
    }
});
