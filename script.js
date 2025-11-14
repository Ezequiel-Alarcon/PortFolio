/*
==================================
MI SCRIPT PARA EL PORTFOLIO
==================================
*/

document.addEventListener('DOMContentLoaded', function () {

    /*
    ==================================
    1. LÓGICA DEL MENÚ HAMBURGUESA
    ==================================
    */
    const hamburger = document.querySelector('.navbar__hamburger');
    const navMenu = document.querySelector('.navbar__menu');

    // Cuando hago clic en la hamburguesa...
    hamburger.addEventListener('click', function () {
        // Muestro u oculto el menú
        navMenu.classList.toggle('navbar__menu--open');
        // Animo el ícono a una 'X'
        hamburger.classList.toggle('navbar__hamburger--open');
    });

    /*
    ==================================
    2. CERRAR MENÚ MÓVIL AL HACER CLIC EN UN LINK
    ==================================
    */
    const navLinks = document.querySelectorAll('.navbar__link');

    // A cada link del menú le agrego un evento
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Si el menú móvil está abierto, lo cierro
            if (navMenu.classList.contains('navbar__menu--open')) {
                navMenu.classList.remove('navbar__menu--open');
                hamburger.classList.remove('navbar__hamburger--open');
            }
        });
    });

    /*
    ==================================
    3. RESALTAR LINK ACTIVO EN EL NAV AL HACER SCROLL
    ==================================
    */
    const sections = document.querySelectorAll('section[id]');

    // Función que se ejecuta cada vez que se hace scroll
    function onScroll() {
        const scrollPosition = window.scrollY + 100; // Le doy un pequeño offset

        sections.forEach(currentSection => {
            if (
                scrollPosition >= currentSection.offsetTop &&
                scrollPosition < currentSection.offsetTop + currentSection.offsetHeight
            ) {
                // Quito la clase 'active' de todos los links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Agrego la clase 'active' solo al link que corresponde a la sección actual
                document.querySelector(`.navbar__menu a[href*=${currentSection.id}]`).classList.add('active');
            }
        });
    }

    // Le digo al navegador que ejecute la función onScroll cada vez que detecte el evento 'scroll'
    window.addEventListener('scroll', onScroll);

    /*
    ==================================
    4. ENVIAR FORMULARIO SIN RECARGAR LA PÁGINA
    ==================================
    */
    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            try {
                // Envío el formulario a Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitButton.textContent = '¡Mensaje Enviado! ✓';
                    submitButton.style.backgroundColor = '#2cb67d';

                    // Limpio el formulario
                    contactForm.reset();

                    // Después de 3 segundos, vuelvo el botón a la normalidad
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.style.backgroundColor = '';
                        submitButton.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Error al enviar');
                }
            } catch (error) {
                submitButton.textContent = 'Error al enviar';
                submitButton.style.backgroundColor = '#e63946';

                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
    
    /*
    ==================================
    5. EFECTO "STICKY" PARA EL TÍTULO DEL HERO
    ==================================
    */
    const titleSpans = document.querySelectorAll('.hero__title span');

    titleSpans.forEach(span => {
        span.addEventListener('mouseover', (e) => {
            e.target.classList.add('hero__title--highlight');

            setTimeout(() => {
                e.target.classList.remove('hero__title--highlight');
            }, 500);
        });
    });
});