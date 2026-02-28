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
                // Una vez animado, dejamos de observar para ahorrar recursos
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con el atributo data-animate o las clases de animación
    document.querySelectorAll('[data-animate], .animate-in-init').forEach(el => {
        observer.observe(el);
    });

    // ══════════ LÓGICA DEL MEGA MENÚ ══════════
    const btnMega = document.getElementById('btn-mega-menu');
    const megaNav = document.getElementById('megaNav');
    const megaDimmer = document.getElementById('megaDimmer');

    if (btnMega && megaNav && megaDimmer) {
        const toggleMega = (forceClose = false) => {
            const isOpen = forceClose ? false : megaNav.classList.toggle('open');

            if (forceClose) {
                megaNav.classList.remove('open');
                btnMega.classList.remove('active');
                megaDimmer.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                btnMega.classList.toggle('active', isOpen);
                megaDimmer.classList.toggle('active', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }
        };

        btnMega.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMega();
        });

        megaDimmer.addEventListener('click', () => toggleMega(true));

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!megaNav.contains(e.target) && e.target !== btnMega) {
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
