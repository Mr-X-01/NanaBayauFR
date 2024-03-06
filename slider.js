document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const startSlide = (e) => {
            e.preventDefault();

            let startPos = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const afterImage = slider.previousElementSibling; // Изображение "После" для этого слайдера
            const container = slider.parentElement;

            let onMove = (moveEvent) => {
                let currentPos = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
                let shiftX = startPos - currentPos;
                let newLeft = Math.min(
                    container.offsetWidth - slider.offsetWidth,
                    Math.max(0, slider.offsetLeft - shiftX)
                );

                slider.style.left = newLeft + 'px';
                afterImage.style.width = newLeft + 'px';
                startPos = currentPos;
            };

            const stopSlide = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('touchmove', onMove);
                document.removeEventListener('mouseup', stopSlide);
                document.removeEventListener('touchend', stopSlide);
            };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('touchmove', onMove, {passive: false});
            document.addEventListener('mouseup', stopSlide);
            document.addEventListener('touchend', stopSlide);
        };

        slider.addEventListener('mousedown', startSlide);
        slider.addEventListener('touchstart', startSlide, {passive: false});
    });
});
