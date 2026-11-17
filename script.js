/*========================================
        VARIABLES PRINCIPALES
=========================================*/

const header = document.querySelector(".header");
const scrollTopBtn = document.querySelector(".scroll-top");
const heroTitle = document.getElementById("changing-text");


/*========================================
        HEADER SCROLL
=========================================*/

window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/*========================================
        BOTÓN VOLVER ARRIBA
=========================================*/

window.addEventListener("scroll", () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/*========================================
        HERO - TEXTO DINÁMICO
=========================================*/

const words = [
    "Juegos Digitales",
    "Un Solo Catálogo",
    "Minecraft Gratis",
    "Launcher Seguro",
    "Contenido Verificado",
    "Juegos Originales"
];

let textIndex = 0;

function changeHeroText() {
    if (!heroTitle) return;
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(15px)";

    setTimeout(() => {
        textIndex++;
        if (textIndex >= words.length) textIndex = 0;
        heroTitle.textContent = words[textIndex];
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
    }, 400);
}

setInterval(changeHeroText, 5000);


/*========================================
        HERO - IMÁGENES
=========================================*/

const heroSlides = document.querySelectorAll(".hero-slide");
let heroSlideIndex = 0;

function changeHeroSlide() {
    if (!heroSlides.length) return;
    heroSlides.forEach(slide => slide.classList.remove("active"));
    heroSlideIndex++;
    if (heroSlideIndex >= heroSlides.length) heroSlideIndex = 0;
    heroSlides[heroSlideIndex].classList.add("active");
}

setInterval(changeHeroSlide, 5000);


/*========================================
        CONTADOR
=========================================*/

const counterSection = document.querySelector(".counter");

if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counters = document.querySelectorAll(".number");
            counters.forEach(counter => {
                const target = Number(counter.getAttribute("data-target"));
                let count = 0;
                const speed = target / 100;

                function updateCounter() {
                    if (count < target) {
                        count += speed;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString() + "+";
                    }
                }
                updateCounter();
            });

            counterObserver.disconnect();
        });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
}


/*========================================
                FAQ
=========================================*/

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const currentItem = question.parentElement;
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.parentElement.classList.remove("active");
            }
        });
        currentItem.classList.toggle("active");
    });
});


/*========================================
        ANIMACIONES AL HACER SCROLL
=========================================*/

const animatedItems = document.querySelectorAll(
    ".game-card, .category-card, .why-card, .offer-card, .counter-card, .review-card, .faq-item, .contact-info, .contact-form"
);

animatedItems.forEach(item => item.classList.add("hidden"));

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
            entry.target.classList.add("show-section");
        }, Number(delay));
        animationObserver.unobserve(entry.target);
    });
}, { threshold: 0.15 });

animatedItems.forEach((item, index) => {
    item.dataset.delay = index * 100;
    animationObserver.observe(item);
});


/*========================================
        MENÚ MÓVIL
=========================================*/

const menuBtn = document.getElementById("menuBtn") || document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

function setMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    const icon = menuBtn.querySelector("i");
    if (icon) {
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-xmark", open);
    }
}

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        setMenu(!mobileMenu.classList.contains("open"));
    });
}

if (closeMenu) {
    closeMenu.addEventListener("click", () => setMenu(false));
}

if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });
}


/*========================================
        LOADER
=========================================*/

const loader = document.getElementById("pageLoader") || document.querySelector(".loader");
const loaderText = document.getElementById("loaderText");
const loaderPhrases = [
    "Cargando Elite Store",
    "Cada día agregamos mejores juegos",
    "Mejores soluciones para ti",
    "Un catálogo claro y seguro",
    "Minecraft gratis con launcher seguro"
];
let loaderPhraseIndex = 0;
let loaderHidden = false;

if (loaderText) {
    const phraseTimer = setInterval(() => {
        if (loaderHidden) {
            clearInterval(phraseTimer);
            return;
        }
        loaderText.style.opacity = "0";
        setTimeout(() => {
            loaderPhraseIndex = (loaderPhraseIndex + 1) % loaderPhrases.length;
            loaderText.textContent = loaderPhrases[loaderPhraseIndex];
            loaderText.style.opacity = "1";
        }, 180);
    }, 900);
}

function hideLoader() {
    if (!loader || loaderHidden) return;
    loaderHidden = true;
    loader.classList.add("loader-done");
}

window.addEventListener("load", () => setTimeout(hideLoader, 400));
setTimeout(hideLoader, 2800);


/*========================================
        TOAST Y FORMULARIO DE CONTACTO
=========================================*/

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                showToast("Mensaje enviado. Te responderemos pronto.");
                contactForm.reset();
            } else {
                showToast("No se pudo enviar. Inténtalo de nuevo.");
            }
        } catch {
            showToast("Error de conexión. Inténtalo de nuevo.");
        }
    });
}


/*========================================
        FINAL
=========================================*/

console.log("Elite Store cargado correctamente.");
