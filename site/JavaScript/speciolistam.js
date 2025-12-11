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