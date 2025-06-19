document.addEventListener('DOMContentLoaded', function() {
    const bannerContainer = document.getElementById('main-banner');
    if (!bannerContainer) return;
    
    const banners = [
        {
            image: 'assets/banner1.jpg',
            title: 'Новые возможности',
            link: 'features.html'
        },
        {
            image: 'assets/banner2.jpg',
            title: 'Специальное предложение',
            link: 'promo.html'
        },
        {
            image: 'assets/banner3.jpg',
            title: 'Обновления системы',
            link: 'updates.html'
        }
    ];
    
    // Создание баннера
    banners.forEach((banner, index) => {
        const slide = document.createElement('div');
        slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${banner.image}" alt="${banner.title}">
            <div class="banner-caption">
                <h3>${banner.title}</h3>
            </div>
        `;
        slide.addEventListener('click', () => {
            // В реальном приложении здесь был бы переход по ссылке
            alert(`Переход на: ${banner.link}`);
        });
        bannerContainer.appendChild(slide);
    });
    
    // Автопереключение баннеров
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, 5000);
});