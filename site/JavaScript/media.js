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

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.querySelector("#audio");
    const playBtn = document.querySelector(".play-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const speedBtn = document.querySelector(".player-speed");
    const volumeRange = document.querySelector(".player-volume input");
    const progressRange = document.querySelector(".player-progress input");
    const durationText = document.querySelector(".duration");

    let speedLevels = [1, 1.25, 1.5, 2];
    let speedIndex = 0;

    // ▶ PLAY / PAUSE
    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = "❚❚";
        } else {
            audio.pause();
            playBtn.innerHTML = "▶";
        }
    });

    // ⏪ -5 сек
    prevBtn.addEventListener("click", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    });

    // ⏩ +5 сек
    nextBtn.addEventListener("click", () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    });

    // ГРОМКОСТЬ
    volumeRange.addEventListener("input", () => {
        audio.volume = volumeRange.value;
    });

    // ОБНОВЛЕНИЕ ПРОГРЕССА
    audio.addEventListener("timeupdate", () => {
        progressRange.value = audio.currentTime;
        durationText.textContent = formatTime(audio.currentTime);
    });

    // Установка максимума ползунка
    audio.addEventListener("loadedmetadata", () => {
        progressRange.max = audio.duration;
    });

    // Перемотка ползунком
    progressRange.addEventListener("input", () => {
        audio.currentTime = progressRange.value;
    });

    // Скорость
    speedBtn.addEventListener("click", () => {
        speedIndex = (speedIndex + 1) % speedLevels.length;
        const newSpeed = speedLevels[speedIndex];
        audio.playbackRate = newSpeed;
        speedBtn.textContent = newSpeed + "x";
    });

    // Формат времени
    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        let s = Math.floor(sec % 60);
        if (s < 10) s = "0" + s;
        return `${m}:${s}`;
    }
});



const progressSlider = document.getElementById('progress');
const audioElement = document.getElementById('audio');

// Обновляем значение прогресса
progressSlider.addEventListener('input', function() {
    this.style.setProperty('--value', this.value + '%');
});

// Если привязано к аудио
audioElement.addEventListener('timeupdate', function() {
    const progress = (this.currentTime / this.duration) * 100;
    progressSlider.value = progress;
    progressSlider.style.setProperty('--value', progress + '%');
});

// наверх
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