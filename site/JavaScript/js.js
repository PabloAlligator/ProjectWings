// Сценарий: фильтрация статей на странице `food.html` по набору тегов-кнопок
// - Находит карточки статей внутри `.arcticle__wrapper` (ищет элементы с заголовками h1-h4
//   или с атрибутом data-title / data-article-title).
// - Сопоставляет заголовок статьи с заранее заданным списком статей в категориях.
// - При клике на кнопку-фильтр (класс `.arcticle__tag`) показывает только подходящие карточки.

(function(){
  'use strict';

  var currentIndex = 0;
  var cards = Array.from(document.querySelectorAll('.arcticle-card'));
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');

  function showCard(index){
    cards.forEach((c,i)=>{
      c.classList.remove('active');
      if(i === index) c.classList.add('active');
    });
    updateButtons();
  }

  function updateButtons(){
    if(prevBtn) prevBtn.disabled = currentIndex === 0;
    if(nextBtn) nextBtn.disabled = currentIndex === cards.length-1;
  }

  if(prevBtn){
    prevBtn.addEventListener('click', ()=>{
      if(currentIndex > 0){
        currentIndex--;
        showCard(currentIndex);
      }
    });
  }

  if(nextBtn){
    nextBtn.addEventListener('click', ()=>{
      if(currentIndex < cards.length-1){
        currentIndex++;
        showCard(currentIndex);
      }
    });
  }

  function applyFilter(category){
    cards.forEach(c=>{
      var cat = c.getAttribute('data-category');
      if(!cat) cat = c.getAttribute('data-category');
      if(!category || category === 'Все' || cat === category){
        c.style.display = '';
      } else {
        c.style.display = 'none';
      }
    });
    // пересчет видимых карточек
    cards = Array.from(document.querySelectorAll('.arcticle-card')).filter(c=>c.style.display !== 'none');
    currentIndex = 0;
    showCard(currentIndex);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    showCard(currentIndex);

    var buttons = document.querySelectorAll('.arcticle__tag');
    buttons.forEach(b=>{
      b.addEventListener('click', ()=>{
        buttons.forEach(x=>{ x.classList.remove('arcticle__tag--active'); x.setAttribute('aria-pressed','false'); });
        b.classList.add('arcticle__tag--active');
        b.setAttribute('aria-pressed','true');
        var cat = b.textContent.trim();
        applyFilter(cat);
      });
    });
  });
})();

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