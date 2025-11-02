// Modern Navigation Controller - OvinoSul 2025

class ModernNavigationController {
    constructor() {
        this.navigation = document.querySelector('.modern-navigation');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 100;
        
        if (this.navigation) {
            this.init();
        }
    }
    
    init() {
        this.setupScrollListener();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupKeyboardNavigation();
        this.setupResizeListener();
        this.setupAccessibility();
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const updateNavigation = () => {
            const currentScrollY = window.pageYOffset;
            
            // Add scrolled class for styling
            if (currentScrollY > this.scrollThreshold) {
                if (!this.isScrolled) {
                    this.navigation.classList.add('scrolled');
                    this.isScrolled = true;
                }
            } else {
                if (this.isScrolled) {
                    this.navigation.classList.remove('scrolled');
                    this.isScrolled = false;
                }
            }
            
            // Add transparent class when at top
            if (currentScrollY < 50) {
                this.navigation.classList.add('transparent');
            } else {
                this.navigation.classList.remove('transparent');
            }
            
            // Hide/show navigation on scroll (optional)
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                // Scrolling down - hide navigation
                this.navigation.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navigation
                this.navigation.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial call
        updateNavigation();
    }
    
    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.mobileMenu) return;
        
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        this.mobileMenuBtn.classList.add('active');
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstLink = this.mobileMenu.querySelector('.mobile-menu-link');
        if (firstLink) {
            firstLink.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Menu mobile aberto');
    }
    
    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.mobileMenuBtn.classList.remove('active');
        this.isMobileMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to menu button
        this.mobileMenuBtn.focus();
        
        // Announce to screen readers
        this.announceToScreenReader('Menu mobile fechado');
    }
    
    setupActiveLinks() {
        // Set active link based on current page
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if link matches current page
            if (href === currentPath || 
                (currentHash && href === currentHash) ||
                (currentPath === '/' && href === '#home')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Handle smooth scrolling for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    }
    
    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
            
            // Update active link
            this.updateActiveLink(targetId);
        }
    }
    
    updateActiveLink(targetId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    setupKeyboardNavigation() {
        // Keyboard navigation for mobile menu
        this.mobileMenuLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextLink = this.mobileMenuLinks[index + 1];
                        if (nextLink) nextLink.focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevLink = this.mobileMenuLinks[index - 1];
                        if (prevLink) prevLink.focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.mobileMenuLinks[0]?.focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.mobileMenuLinks[this.mobileMenuLinks.length - 1]?.focus();
                        break;
                }
            });
        });
    }
    
    setupResizeListener() {
        // Close mobile menu on resize if screen becomes large
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    setupAccessibility() {
        // Add ARIA labels and roles
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            this.mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');
        }
        
        if (this.mobileMenu) {
            this.mobileMenu.setAttribute('role', 'navigation');
            this.mobileMenu.setAttribute('aria-label', 'Menu de navegação mobile');
        }
        
        // Update ARIA attributes when menu state changes
        this.updateAriaAttributes();
    }
    
    updateAriaAttributes() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.setAttribute('aria-expanded', this.isMobileMenuOpen.toString());
            this.mobileMenuBtn.setAttribute('aria-label', 
                this.isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
            );
        }
    }
    
    announceToScreenReader(message) {
        // Create temporary element for screen reader announcements
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Public method to close mobile menu (useful for external calls)
    closeMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.mobileMenu.classList.remove('active');
            this.mobileMenuBtn.classList.remove('active');
            this.isMobileMenuOpen = false;
            document.body.style.overflow = '';
            this.updateAriaAttributes();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernNavigationController();
});

// Export for potential external use
window.ModernNavigationController = ModernNavigationController;