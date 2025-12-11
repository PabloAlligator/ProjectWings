
// Initialize independent sliders for each .story-card on the page
(function () {
    const cards = document.querySelectorAll('.story-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const slides = Array.from(card.querySelectorAll('.story-card__slide'));
        if (!slides.length) return;

        const nextBtn = card.querySelector('.story-card__next');
        const currentEl = card.querySelector('.story-card__current');
        const totalEl = card.querySelector('.story-card__total');

        // start index from the slide that already has .is-active, or 0
        let index = slides.findIndex(s => s.classList.contains('is-active'));
        if (index === -1) index = 0;

        if (totalEl) totalEl.textContent = slides.length;

        function show(i) {
            slides.forEach(s => s.classList.remove('is-active'));
            const slide = slides[i];
            if (slide) slide.classList.add('is-active');
            if (currentEl) currentEl.textContent = i + 1;
            // hide prev on first page (use visibility so size remains), show otherwise
            if (typeof prevBtn !== 'undefined' && prevBtn) {
                prevBtn.style.visibility = (i === 0 ? 'hidden' : 'visible');
                prevBtn.style.opacity = (i === 0 ? '0' : '1');
                prevBtn.style.pointerEvents = (i === 0 ? 'none' : 'auto');
            }
            // optionally hide next on last page (keep size)
            if (nextBtn) {
                nextBtn.style.visibility = (i === slides.length - 1 ? 'hidden' : 'visible');
                nextBtn.style.opacity = (i === slides.length - 1 ? '0' : '1');
                nextBtn.style.pointerEvents = (i === slides.length - 1 ? 'none' : 'auto');
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                index = (index + 1) % slides.length;
                show(index);
            });
        }

        // create prev button if missing (use same arrow image as Next)
        let prevBtn = card.querySelector('.story-card__prev');
        if (!prevBtn) {
            prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'story-card__prev';
            const img = document.createElement('img');
            img.src = '../img/кнопка стрелка (1).png';
            img.alt = 'prev';
            prevBtn.appendChild(img);
            // insert before nextBtn (or at end of controls)
            const controls = card.querySelector('.story-card__controls');
            if (controls && nextBtn) controls.insertBefore(prevBtn, nextBtn);
            else if (controls) controls.appendChild(prevBtn);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                index = (index - 1 + slides.length) % slides.length;
                show(index);
            });
        }

        // keyboard navigation when the card is focused
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                index = (index + 1) % slides.length;
                show(index);
            }
            if (e.key === 'ArrowLeft') {
                index = (index - 1 + slides.length) % slides.length;
                show(index);
            }
        });

        // show initial
        show(index);
    });
})();

// Back to top button functionality
const myBtn = document.getElementById('myBtn');

// Hide button initially
if (myBtn) {
    myBtn.style.display = 'none';
}

// Show/hide button on scroll
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 20) {
        myBtn.style.display = 'block';
    } else {
        myBtn.style.display = 'none';
    }
});

// Scroll to top function
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Получаем элементы
const burger = document.querySelector('.header__burger');
const sidebar = document.querySelector('.header__sidebar');
const sidebarClose = document.querySelector('.header__sidebar-close');

// Открытие/закрытие меню при клике на бургер
burger.addEventListener('click', () => {
    sidebar.classList.add('active'); // открываем меню
});

// Закрытие меню при клике на крестик
sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active'); // закрываем меню
});

// Дополнительно: закрытие при клике на любую ссылку в меню
const sidebarLinks = document.querySelectorAll('.header__sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});
