// Modern Drawer Menu with Swipe Gestures
class DrawerMenu {
    constructor() {
        this.drawer = null;
        this.overlay = null;
        this.toggle = null;
        this.closeBtn = null;
        this.handle = null;
        this.isOpen = false;
        this.startY = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.threshold = 100;
        
        this.init();
    }
    
    init() {
        this.drawer = document.querySelector('.drawer-menu');
        this.overlay = document.querySelector('.drawer-overlay');
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.closeBtn = document.querySelector('.drawer-close');
        this.handle = document.querySelector('.drawer-handle');
        
        if (!this.drawer || !this.overlay || !this.toggle) {
            console.log('Drawer menu elements not found');
            return;
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.boundToggleHandler = () => this.open();
        this.boundCloseHandler = () => this.close();
        this.boundOverlayHandler = () => this.close();
        this.boundTouchStart = (e) => this.handleTouchStart(e);
        this.boundTouchMove = (e) => this.handleTouchMove(e);
        this.boundTouchEnd = () => this.handleTouchEnd();
        this.boundDrawerTouchStart = (e) => this.handleTouchStart(e);
        this.boundDrawerTouchMove = (e) => this.handleTouchMove(e);
        this.boundDrawerTouchEnd = () => this.handleTouchEnd();
        this.boundKeydownHandler = (e) => this.handleKeydown(e);
        this.boundFocusTrap = (e) => this.trapFocus(e);
        
        this.toggle.addEventListener('click', this.boundToggleHandler);
        this.closeBtn?.addEventListener('click', this.boundCloseHandler);
        this.overlay.addEventListener('click', this.boundOverlayHandler);
        
        this.handle.addEventListener('touchstart', this.boundTouchStart, { passive: true });
        this.handle.addEventListener('touchmove', this.boundTouchMove, { passive: false });
        this.handle.addEventListener('touchend', this.boundTouchEnd);
        
        this.drawer.addEventListener('touchstart', this.boundDrawerTouchStart, { passive: true });
        this.drawer.addEventListener('touchmove', this.boundDrawerTouchMove, { passive: false });
        this.drawer.addEventListener('touchend', this.boundDrawerTouchEnd);
        
        document.addEventListener('keydown', this.boundKeydownHandler);
        
        this.navLinks = this.drawer.querySelectorAll('.drawer-nav-link');
        this.navLinkHandlers = [];
        
        this.navLinks.forEach(link => {
            const handler = () => {
                this.close();
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            };
            this.navLinkHandlers.push({ link, handler });
            link.addEventListener('click', handler);
        });
    }
    
    handleTouchStart(e) {
        if (!this.isOpen) return;
        this.startY = e.touches[0].clientY;
        this.isDragging = true;
        this.drawer.style.transition = 'none';
    }
    
    handleTouchMove(e) {
        if (!this.isDragging || !this.isOpen) return;
        
        this.currentY = e.touches[0].clientY;
        const deltaY = this.currentY - this.startY;
        
        if (deltaY > 0) {
            e.preventDefault();
            this.drawer.style.transform = `translateY(${deltaY}px)`;
        }
    }
    
    handleTouchEnd() {
        if (!this.isDragging || !this.isOpen) return;
        
        this.isDragging = false;
        this.drawer.style.transition = '';
        
        const deltaY = this.currentY - this.startY;
        
        if (deltaY > this.threshold) {
            this.close();
        } else {
            this.drawer.style.transform = '';
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }
    
    trapFocus(e) {
        if (!this.isOpen || e.key !== 'Tab') return;
        
        const focusableElements = this.drawer.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    open() {
        this.isOpen = true;
        this.drawer.classList.add('active');
        this.overlay.classList.add('active');
        this.toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.drawer.setAttribute('aria-hidden', 'false');
        this.toggle.setAttribute('aria-expanded', 'true');
        
        document.addEventListener('keydown', this.boundFocusTrap);
        
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
        }
        
        this.focusTimeout = setTimeout(() => {
            if (this.isOpen) {
                const firstLink = this.drawer.querySelector('.drawer-nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        }, 100);
    }
    
    close() {
        this.isOpen = false;
        this.drawer.classList.remove('active');
        this.overlay.classList.remove('active');
        this.toggle.classList.remove('active');
        this.drawer.style.transform = '';
        document.body.style.overflow = '';
        this.drawer.setAttribute('aria-hidden', 'true');
        this.toggle.setAttribute('aria-expanded', 'false');
        
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
            this.focusTimeout = null;
        }
        
        document.removeEventListener('keydown', this.boundFocusTrap);
        
        if (this.toggle) {
            this.toggle.focus();
        }
    }
    
    destroy() {
        this.close();
        
        if (this.toggle) {
            this.toggle.removeEventListener('click', this.boundToggleHandler);
        }
        if (this.overlay) {
            this.overlay.removeEventListener('click', this.boundOverlayHandler);
        }
        if (this.closeBtn) {
            this.closeBtn.removeEventListener('click', this.boundCloseHandler);
        }
        if (this.handle) {
            this.handle.removeEventListener('touchstart', this.boundTouchStart);
            this.handle.removeEventListener('touchmove', this.boundTouchMove);
            this.handle.removeEventListener('touchend', this.boundTouchEnd);
        }
        if (this.drawer) {
            this.drawer.removeEventListener('touchstart', this.boundDrawerTouchStart);
            this.drawer.removeEventListener('touchmove', this.boundDrawerTouchMove);
            this.drawer.removeEventListener('touchend', this.boundDrawerTouchEnd);
        }
        
        document.removeEventListener('keydown', this.boundKeydownHandler);
        document.removeEventListener('keydown', this.boundFocusTrap);
        
        if (this.navLinkHandlers) {
            this.navLinkHandlers.forEach(({ link, handler }) => {
                link.removeEventListener('click', handler);
            });
            this.navLinkHandlers = [];
        }
    }
}

let drawerInstance = null;

function initDrawer() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && !drawerInstance) {
        drawerInstance = new DrawerMenu();
    } else if (!isMobile && drawerInstance) {
        drawerInstance.destroy();
        drawerInstance = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDrawer();
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initDrawer();
        }, 250);
    });
});
