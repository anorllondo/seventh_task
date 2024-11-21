const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pager = document.getElementById('pager');

let currentIndex = 0;
let slidesToShow; // Количество слайдов, отображаемых одновременно
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Обновляет количество отображаемых слайдов в зависимости от ширины экрана
function updateSlidesToShow() {
    slidesToShow = window.innerWidth <= 768 ? 1 : 3;
}

// Создает пейджер на основе количества страниц
function createPager() {
    pager.innerHTML = '';
    const totalPages = Math.ceil(totalSlides / slidesToShow);
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('page-indicator');
        indicator.dataset.page = i;
        indicator.textContent = i + 1;
        if (i === currentIndex) indicator.classList.add('active');
        pager.appendChild(indicator);
    }
}

// Обновляет позицию слайдера
function updateSlider() {
    const offset = -(currentIndex * slidesToShow * (100 / slidesToShow));
    slider.style.transform = `translateX(${offset}%)`;
    updatePager();
}

// Обновляет активное состояние иконок пейджера
function updatePager() {
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Навигация: переход к предыдущей странице
prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
});

// Навигация: переход к следующей странице
nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(totalSlides / slidesToShow);
    currentIndex = Math.min(currentIndex + 1, totalPages - 1);
    updateSlider();
});

// Навигация через пейджер
pager.addEventListener('click', (e) => {
    if (e.target.classList.contains('page-indicator')) {
        currentIndex = Number(e.target.dataset.page);
        updateSlider();
    }
});

// Пересчитывает параметры при изменении размеров окна
window.addEventListener('resize', () => {
    updateSlidesToShow();
    createPager();
    updateSlider();
});

// Инициализация
updateSlidesToShow();
createPager();
updateSlider();
