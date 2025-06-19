document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('3d-gallery');
    if (!galleryContainer) return;
    
    const images = [
        'https://www.informio.ru/imgs/fotos/Leningradskii_soc._pedag_._kolledzh_.jpg',
        'https://avatars.mds.yandex.net/get-altay/1525683/2a0000016a3fee09b8d420d0d722bc26ff13/orig',
        'https://yt3.googleusercontent.com/ytc/APkrFKZ4cF8BxGbkJPkBgJPVd0gKNG2srZ1QsMTtxVF6=s900-c-k-c0x00ffffff-no-rj',
        'https://i.vuzopedia.ru/storage/app/uploads/public/63f/34b/147/63f34b1477042059726744.jpg'
    ];
    
    // Создание 3D галереи
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${img}" alt="Галерея ${index + 1}">`;
        galleryContainer.appendChild(item);
        
        // Позиционирование элементов в 3D пространстве
        const angle = (index / images.length) * Math.PI * 2;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${angle}rad)`;
        item.style.zIndex = Math.round(z);
    });
    
    // Анимация галереи
    let angle = 0;
    const items = document.querySelectorAll('.gallery-item');
    
    function animateGallery() {
        angle += 0.005;
        
        items.forEach((item, index) => {
            const itemAngle = angle + (index / items.length) * Math.PI * 2;
            const radius = 150;
            const x = Math.cos(itemAngle) * radius;
            const z = Math.sin(itemAngle) * radius;
            
            item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${itemAngle}rad)`;
            item.style.zIndex = Math.round(z);
        });
        
        requestAnimationFrame(animateGallery);
    }
    
    animateGallery();
    
    // Интерактивность
    let isDragging = false;
    let startX, startAngle;
    
    galleryContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startAngle = angle;
        galleryContainer.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        angle = startAngle + deltaX * 0.01;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
        galleryContainer.style.cursor = 'grab';
    });
    
    galleryContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startAngle = angle;
    });
    
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        angle = startAngle + deltaX * 0.01;
    });
    
    window.addEventListener('touchend', () => {
        isDragging = false;
    });
});