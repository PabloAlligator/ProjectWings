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

// уврцу
// Функция для перелистывания элементов meeting__blocks
document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы для перелистывания
    const meetingElements = document.querySelectorAll('.meeting__blocks-element');
    const btnPrev = document.querySelector('.meeting__buttons .btn-primary');
    const btnNext = document.querySelector('.meeting__buttons .btn-secondary');
    const meetingButtons = document.querySelector('.meeting__buttons');
    
    // Если элементов нет или нет кнопок - выходим
    if (!meetingElements.length || !btnPrev || !btnNext) return;
    
    // Проверяем, мобильное ли устройство
    function isMobile() {
        return window.innerWidth <= 780;
    }
    
    // Индекс текущего активного элемента
    let currentIndex = 0;
    
    // Функция для восстановления десктопного вида
    function restoreDesktopView() {
        console.log('Восстанавливаем десктопный вид');
        
        // Показываем ВСЕ элементы на десктопе
        meetingElements.forEach((element, index) => {
            // Восстанавливаем исходные стили
            element.style.display = ''; // Пустая строка удаляет inline-стили
            element.style.opacity = '';
            element.style.transition = '';
            element.style.flexDirection = '';
            element.style.width = '';
            element.style.height = ''; // Восстанавливаем оригинальную высоту
            element.style.margin = '';
            element.style.position = '';
            element.style.top = '';
            element.style.left = '';
            
            // Удаляем все inline-стили
            element.removeAttribute('style');
        });
        
        // Скрываем кнопки на десктопе
        if (meetingButtons) {
            meetingButtons.style.display = 'none';
        }
        
        // Отключаем обработчики событий на десктопе
        btnNext.removeEventListener('click', nextElement);
        btnPrev.removeEventListener('click', prevElement);
    }
    
    // Функция для настройки мобильного вида
    function setupMobileView() {
        console.log('Настраиваем мобильный вид');
        
        // Показываем кнопки на мобильных
        if (meetingButtons) {
            meetingButtons.style.display = 'flex';
        }
        
        // Показываем только первый элемент, остальные скрываем
        meetingElements.forEach((element, index) => {
            if (index === 0) {
                element.style.display = 'flex';
                element.style.opacity = '1';
                element.style.transition = 'opacity 0.5s ease';
                element.style.flexDirection = 'column';
                element.style.width = '100%';
                element.style.maxWidth = '427px';
                element.style.margin = '0 auto';
                element.style.height = 'auto'; // Автоматическая высота на мобильных
            } else {
                element.style.display = 'none';
                element.style.opacity = '0';
            }
        });
        
        // Обновляем состояние кнопок
        updateButtons();
        
        // Добавляем обработчики событий на мобильных
        btnNext.addEventListener('click', nextElement);
        btnPrev.addEventListener('click', prevElement);
    }
    
    // Показываем только первый элемент, остальные скрываем
    function initializeElements() {
        if (!isMobile()) {
            restoreDesktopView();
            return;
        }
        
        setupMobileView();
    }
    
    // Функция перехода к следующему элементу
    function nextElement() {
        if (!isMobile()) return; // Только для мобильных
        
        if (currentIndex < meetingElements.length - 1) {
            // Скрываем текущий элемент
            meetingElements[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                meetingElements[currentIndex].style.display = 'none';
                currentIndex++;
                meetingElements[currentIndex].style.display = 'flex';
                meetingElements[currentIndex].style.flexDirection = 'column';
                meetingElements[currentIndex].style.width = '100%';
                meetingElements[currentIndex].style.maxWidth = '427px';
                meetingElements[currentIndex].style.margin = '0 auto';
                meetingElements[currentIndex].style.height = 'auto';
                
                // Даем время для применения display: block
                setTimeout(() => {
                    meetingElements[currentIndex].style.opacity = '1';
                }, 50);
                
                updateButtons();
            }, 300);
        }
    }
    
    // Функция перехода к предыдущему элементу
    function prevElement() {
        if (!isMobile()) return; // Только для мобильных
        
        if (currentIndex > 0) {
            // Скрываем текущий элемент
            meetingElements[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                meetingElements[currentIndex].style.display = 'none';
                currentIndex--;
                meetingElements[currentIndex].style.display = 'flex';
                meetingElements[currentIndex].style.flexDirection = 'column';
                meetingElements[currentIndex].style.width = '100%';
                meetingElements[currentIndex].style.maxWidth = '427px';
                meetingElements[currentIndex].style.margin = '0 auto';
                meetingElements[currentIndex].style.height = 'auto';
                
                // Даем время для применения display: block
                setTimeout(() => {
                    meetingElements[currentIndex].style.opacity = '1';
                }, 50);
                
                updateButtons();
            }, 300);
        }
    }
    
    // Обновляем состояние кнопок (отключаем если нельзя дальше)
    function updateButtons() {
        if (!isMobile()) return; // Только для мобильных
        
        // Обновляем кнопку "назад"
        if (currentIndex === 0) {
            btnPrev.disabled = true;
            btnPrev.style.opacity = '0.5';
            btnPrev.style.cursor = 'not-allowed';
        } else {
            btnPrev.disabled = false;
            btnPrev.style.opacity = '1';
            btnPrev.style.cursor = 'pointer';
        }
        
        // Обновляем кнопку "вперед"
        if (currentIndex === meetingElements.length - 1) {
            btnNext.disabled = true;
            btnNext.style.opacity = '0.5';
            btnNext.style.cursor = 'not-allowed';
        } else {
            btnNext.disabled = false;
            btnNext.style.opacity = '1';
            btnNext.style.cursor = 'pointer';
        }
    }
    
    // Инициализируем элементы при загрузке
    initializeElements();
    
    // Обработчик изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const mobileNow = isMobile();
            
            if (mobileNow) {
                // Перешли на мобильный вид
                setupMobileView();
            } else {
                // Перешли на десктопный вид
                currentIndex = 0; // Сбрасываем индекс
                restoreDesktopView();
            }
        }, 250); // Задержка для оптимизации
    });
    
    // Добавляем поддержку клавиатуры только на мобильных
    document.addEventListener('keydown', function(event) {
        if (!isMobile()) return; // Только для мобильных
        
        if (event.key === 'ArrowRight') {
            nextElement();
        } else if (event.key === 'ArrowLeft') {
            prevElement();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const specElements = document.querySelectorAll('.speciolists__element');
    const btnPrev = document.querySelector('.speciolists-previovs');
    const btnNext = document.querySelector('.speciolists-next');
    const specButtonsWrapper = document.querySelector('.speciolists__title-btns');

    if (!specElements.length || !btnPrev || !btnNext) return;

    let currentIndex = 0;

    function isMobile() {
        return window.innerWidth <= 780;
    }

    // Восстановление десктопного вида
    function restoreDesktopView() {
        specElements.forEach(el => {
            el.style.display = 'flex';
            el.style.opacity = '';
            el.style.transition = '';
            el.style.width = '';
            el.style.height = '';
            el.style.margin = '';
        });

        if (specButtonsWrapper) specButtonsWrapper.style.display = 'flex'; // или 'none', если кнопки не нужны

        btnNext.removeEventListener('click', nextElement);
        btnPrev.removeEventListener('click', prevElement);
    }

    // Настройка мобильного вида
    function setupMobileView() {
        if (specButtonsWrapper) specButtonsWrapper.style.display = 'flex';

        specElements.forEach((el, i) => {
            if (i === currentIndex) {
                el.style.display = 'flex';
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.5s ease';
                el.style.width = '100%';
                el.style.maxWidth = '427px';
                el.style.margin = '0 auto';
                el.style.height = 'auto';
            } else {
                el.style.display = 'none';
                el.style.opacity = '0';
            }
        });

        updateButtons();

        btnNext.addEventListener('click', nextElement);
        btnPrev.addEventListener('click', prevElement);
    }

    function initializeElements() {
        if (!isMobile()) {
            restoreDesktopView();
            return;
        }
        setupMobileView();
    }

    function nextElement() {
        if (!isMobile()) return;

        if (currentIndex < specElements.length - 1) {
            specElements[currentIndex].style.opacity = '0';

            setTimeout(() => {
                specElements[currentIndex].style.display = 'none';
                currentIndex++;
                specElements[currentIndex].style.display = 'flex';
                specElements[currentIndex].style.opacity = '1';
                updateButtons();
            }, 300);
        }
    }

    function prevElement() {
        if (!isMobile()) return;

        if (currentIndex > 0) {
            specElements[currentIndex].style.opacity = '0';

            setTimeout(() => {
                specElements[currentIndex].style.display = 'none';
                currentIndex--;
                specElements[currentIndex].style.display = 'flex';
                specElements[currentIndex].style.opacity = '1';
                updateButtons();
            }, 300);
        }
    }

    function updateButtons() {
        if (!isMobile()) return;

        btnPrev.disabled = currentIndex === 0;
        btnPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
        btnPrev.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';

        btnNext.disabled = currentIndex === specElements.length - 1;
        btnNext.style.opacity = currentIndex === specElements.length - 1 ? '0.5' : '1';
        btnNext.style.cursor = currentIndex === specElements.length - 1 ? 'not-allowed' : 'pointer';
    }

    // Инициализация
    initializeElements();

    // Обработка ресайза
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isMobile()) {
                setupMobileView();
            } else {
                currentIndex = 0;
                restoreDesktopView();
            }
        }, 250);
    });

    // Поддержка стрелок на мобильных
    document.addEventListener('keydown', function(event) {
        if (!isMobile()) return;
        if (event.key === 'ArrowRight') nextElement();
        if (event.key === 'ArrowLeft') prevElement();
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