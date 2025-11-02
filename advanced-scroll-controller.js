// Smart Scroll Controller for Header Behavior
class SmartScrollController {
    constructor() {
        this.subHeader = document.querySelector('.sub-header');
        this.mainHeader = document.querySelector('.header');
        this.hero = document.querySelector('.hero') || document.querySelector('.page-hero');
        this.main = document.querySelector('main');
        
        this.lastScrollY = 0;
        this.scrollThreshold = 50;
        this.hideThreshold = 150;
        this.isHeaderHidden = false;
        this.ticking = false;
        
        console.log('ScrollController initialized:', {
            subHeader: !!this.subHeader,
            mainHeader: !!this.mainHeader,
            hero: !!this.hero,
            main: !!this.main
        });
        
        if (this.subHeader && this.mainHeader) {
            this.init();
        }
    }
    
    init() {
        this.setupScrollListener();
        this.setupResizeListener();
        console.log('SmartScrollController initialized successfully');
    }
    
    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
    }
    
    handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
        
        // Update sub-header scroll class
        if (currentScrollY > this.scrollThreshold) {
            this.subHeader.classList.add('scrolled');
        } else {
            this.subHeader.classList.remove('scrolled');
        }
        
        // Smart header hiding logic
        if (scrollDirection === 'down' && currentScrollY > this.hideThreshold && scrollDelta > 3) {
            this.hideMainHeader();
        } else if (scrollDirection === 'up' && scrollDelta > 3) {
            this.showMainHeader();
        }
        
        // Update scroll position
        this.lastScrollY = currentScrollY;
    }
    
    hideMainHeader() {
        if (!this.isHeaderHidden) {
            console.log('Hiding main header');
            this.isHeaderHidden = true;
            this.mainHeader.classList.add('hidden');
            this.subHeader.classList.add('header-hidden');
            
            // Adjust content padding
            if (this.main) {
                this.main.classList.add('content-adjusted');
            }
        }
    }
    
    showMainHeader() {
        if (this.isHeaderHidden) {
            console.log('Showing main header');
            this.isHeaderHidden = false;
            this.mainHeader.classList.remove('hidden');
            this.subHeader.classList.remove('header-hidden');
            
            // Remove content padding adjustment
            if (this.main) {
                this.main.classList.remove('content-adjusted');
            }
        }
    }
    
    setupResizeListener() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    handleResize() {
        // Reset header state on resize
        if (window.innerWidth !== this.lastWidth) {
            this.showMainHeader();
            this.lastWidth = window.innerWidth;
        }
    }
}
    


// Initialize the scroll controller
document.addEventListener('DOMContentLoaded', () => {
    const scrollController = new SmartScrollController();
    
    // Make it globally accessible for debugging
    window.scrollController = scrollController;
});