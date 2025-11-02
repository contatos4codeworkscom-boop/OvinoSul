// Sub-header Carousel Functionality

class CarouselController {
    constructor() {
        this.carousel = document.querySelector('.carousel-track');
        this.container = document.querySelector('.carousel-container');
        this.items = document.querySelectorAll('.carousel-item');
        this.isScrolling = false;
        this.scrollSpeed = 1;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isDragging = false;
        this.animationId = null;
        
        if (this.carousel && this.container) {
            this.init();
        }
    }
    
    init() {
        this.duplicateItems();
        this.setupTouchEvents();
        this.setupMouseEvents();
        this.setupKeyboardEvents();
        this.handleVisibilityChange();
        this.startAutoScroll();
    }
    
    duplicateItems() {
        // Duplicate items for seamless infinite scroll
        const itemsArray = Array.from(this.items);
        itemsArray.forEach(item => {
            const clone = item.cloneNode(true);
            this.carousel.appendChild(clone);
        });
    }
    
    setupTouchEvents() {
        this.container.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: false });
        
        this.container.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: false });
        
        this.container.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        }, { passive: true });
    }
    
    setupMouseEvents() {
        this.container.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });
        
        this.container.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        this.container.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        });
        
        this.container.addEventListener('mouseleave', (e) => {
            this.handleMouseUp(e);
        });
        
        // Prevent context menu on long press
        this.container.addEventListener('contextmenu', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            this.pauseAutoScroll();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.resumeAutoScroll();
        });
    }
    
    setupKeyboardEvents() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.carousel-container')) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.scrollLeft();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.scrollRight();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.toggleAutoScroll();
                        break;
                }
            }
        });
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.isDragging = true;
        this.pauseAutoScroll();
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = this.touchStartX - touchX;
        const deltaY = this.touchStartY - touchY;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
            this.manualScroll(deltaX * 0.5);
        }
    }
    
    handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = this.touchStartX - touchEndX;
        
        if (Math.abs(deltaX) > 50) {
            // Swipe detected
            if (deltaX > 0) {
                this.scrollRight();
            } else {
                this.scrollLeft();
            }
        }
        
        this.isDragging = false;
        this.resumeAutoScroll();
    }
    
    handleMouseDown(e) {
        this.touchStartX = e.clientX;
        this.isDragging = true;
        this.pauseAutoScroll();
        this.container.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = this.touchStartX - e.clientX;
        this.manualScroll(deltaX * 0.3);
    }
    
    handleMouseUp(e) {
        if (this.isDragging) {
            const deltaX = this.touchStartX - e.clientX;
            
            if (Math.abs(deltaX) > 30) {
                if (deltaX > 0) {
                    this.scrollRight();
                } else {
                    this.scrollLeft();
                }
            }
        }
        
        this.isDragging = false;
        this.resumeAutoScroll();
        this.container.style.cursor = 'grab';
    }
    
    manualScroll(delta) {
        const currentTransform = this.getTransformX();
        const newTransform = currentTransform - delta;
        this.carousel.style.transform = `translateX(${newTransform}px)`;
    }
    
    scrollLeft() {
        const itemWidth = this.items[0].offsetWidth;
        const currentTransform = this.getTransformX();
        const newTransform = currentTransform + itemWidth;
        
        this.smoothScrollTo(newTransform);
    }
    
    scrollRight() {
        const itemWidth = this.items[0].offsetWidth;
        const currentTransform = this.getTransformX();
        const newTransform = currentTransform - itemWidth;
        
        this.smoothScrollTo(newTransform);
    }
    
    smoothScrollTo(targetX) {
        const startX = this.getTransformX();
        const distance = targetX - startX;
        const duration = 300;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentX = startX + (distance * easeOutCubic);
            
            this.carousel.style.transform = `translateX(${currentX}px)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    getTransformX() {
        const style = window.getComputedStyle(this.carousel);
        const matrix = style.transform || style.webkitTransform || style.mozTransform;
        
        if (matrix && matrix !== 'none') {
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            return parseFloat(matrixValues[4]) || 0;
        }
        
        return 0;
    }
    
    startAutoScroll() {
        this.carousel.style.animationPlayState = 'running';
    }
    
    pauseAutoScroll() {
        this.carousel.style.animationPlayState = 'paused';
    }
    
    resumeAutoScroll() {
        if (!this.isDragging) {
            this.carousel.style.animationPlayState = 'running';
        }
    }
    
    toggleAutoScroll() {
        const currentState = this.carousel.style.animationPlayState;
        if (currentState === 'paused') {
            this.resumeAutoScroll();
        } else {
            this.pauseAutoScroll();
        }
    }
    
    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoScroll();
            } else {
                this.resumeAutoScroll();
            }
        });
    }
    
    // Responsive behavior
    handleResize() {
        // Reset carousel position on resize
        this.carousel.style.transform = 'translateX(0)';
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new CarouselController();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        carousel.handleResize();
    });
});

// Add wheel scroll support
document.addEventListener('wheel', (e) => {
    const carouselContainer = e.target.closest('.carousel-container');
    if (carouselContainer) {
        e.preventDefault();
        
        const carousel = carouselContainer.querySelector('.carousel-track');
        const currentTransform = parseFloat(carousel.style.transform.split('(')[1]) || 0;
        const scrollAmount = e.deltaY > 0 ? -50 : 50;
        
        carousel.style.transform = `translateX(${currentTransform + scrollAmount}px)`;
        
        // Resume auto-scroll after a delay
        clearTimeout(carousel.wheelTimeout);
        carousel.style.animationPlayState = 'paused';
        carousel.wheelTimeout = setTimeout(() => {
            carousel.style.animationPlayState = 'running';
        }, 1000);
    }
}, { passive: false });