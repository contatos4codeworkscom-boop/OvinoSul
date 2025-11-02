// OvinoSul - Modern JavaScript 2025

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main app initialization
function initializeApp() {
    initializeHeader();
    initializeMobileMenu();
    initializeSearch();
    initializeScrollEffects();
    initializeNavigation();
    initializeAnimations();
    initializeServiceWorker();
}

// Header functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let isScrolled = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScrollY > 50 && !isScrolled) {
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScrollY <= 50 && isScrolled) {
            header.classList.remove('scrolled');
            isScrolled = false;
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Mobile menu functionality removed - replaced with sub-header carousel
    console.log('Mobile menu functionality has been replaced with sub-header carousel');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchInput || !searchBtn) return;

    // Create search index for the site
    const searchIndex = [
        {
            title: 'Raças de Ovinos',
            description: 'Conheça as principais raças de ovinos criadas no Rio Grande do Sul',
            url: 'racas.html',
            keywords: ['raças', 'ovinos', 'criação', 'animais', 'rebanho', 'genética']
        },
        {
            title: 'Calendário de Vacinação',
            description: 'Calendário completo de vacinação para ovinos com datas e vacinas essenciais',
            url: 'vacinas.html',
            keywords: ['vacinas', 'vacinação', 'calendário', 'saúde', 'prevenção', 'veterinário']
        },
        {
            title: 'Manejo de Ovinos',
            description: 'Guia completo para criação e manejo de ovinos no Rio Grande do Sul',
            url: 'index.html#sobre',
            keywords: ['manejo', 'criação', 'pampa', 'gaúcho', 'ovinocultura', 'produção']
        },
        {
            title: 'Contato e Suporte',
            description: 'Entre em contato para dúvidas sobre criação de ovinos',
            url: 'index.html#contato',
            keywords: ['contato', 'suporte', 'ajuda', 'dúvidas', 'consultoria']
        }
    ];

    // Create search results container
    function createSearchResultsContainer() {
        if (document.getElementById('global-search-results')) return;

        const searchResultsHTML = `
            <div id="global-search-results" class="search-results-overlay" style="display: none;">
                <div class="search-results-container">
                    <div class="search-results-header">
                        <h3>Resultados da Busca</h3>
                        <button class="close-search-results" aria-label="Fechar resultados">×</button>
                    </div>
                    <div class="search-results-content">
                        <div class="search-results-list"></div>
                        <div class="no-results" style="display: none;">
                            <p>Nenhum resultado encontrado. Tente outras palavras-chave.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', searchResultsHTML);

        // Add styles for search results
        const searchStyles = `
            <style>
                .search-results-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--space-4);
                }

                .search-results-container {
                    background: var(--color-background);
                    border-radius: var(--radius-lg);
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                .search-results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-4);
                    border-bottom: 1px solid var(--color-border);
                    background: var(--color-background-alt);
                }

                .search-results-header h3 {
                    margin: 0;
                    color: var(--color-text);
                    font-size: var(--font-lg);
                }

                .close-search-results {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    padding: var(--space-2);
                    color: var(--color-text-muted);
                    border-radius: var(--radius-sm);
                    transition: all var(--transition-fast);
                }

                .close-search-results:hover {
                    background: var(--color-neutral-200);
                    color: var(--color-text);
                }

                .search-results-content {
                    padding: var(--space-4);
                    max-height: 60vh;
                    overflow-y: auto;
                }

                .search-result-item {
                    padding: var(--space-3);
                    border-radius: var(--radius-md);
                    margin-bottom: var(--space-3);
                    border: 1px solid var(--color-border-light);
                    transition: all var(--transition-fast);
                    cursor: pointer;
                }

                .search-result-item:hover {
                    border-color: var(--color-primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .search-result-title {
                    font-weight: 600;
                    color: var(--color-primary);
                    margin-bottom: var(--space-1);
                }

                .search-result-description {
                    color: var(--color-text-light);
                    font-size: var(--font-sm);
                    line-height: 1.5;
                }

                .no-results {
                    text-align: center;
                    padding: var(--space-8) var(--space-4);
                    color: var(--color-text-muted);
                }

                @media (max-width: 768px) {
                    .search-results-overlay {
                        padding: var(--space-2);
                    }
                    
                    .search-results-container {
                        max-height: 90vh;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', searchStyles);
    }

    createSearchResultsContainer();

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const searchResults = searchInContent(query);
        showSearchResults(searchResults, query);
    }

    function searchInContent(query) {
        const results = [];
        
        // Search in predefined content
        searchIndex.forEach(item => {
            let score = 0;
            
            // Check title
            if (item.title.toLowerCase().includes(query)) {
                score += 10;
            }
            
            // Check description
            if (item.description.toLowerCase().includes(query)) {
                score += 5;
            }
            
            // Check keywords
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(query)) {
                    score += 3;
                }
            });
            
            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        // Search in current page content
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    const heading = section.querySelector('h1, h2, h3');
                    const title = heading ? heading.textContent : 'Seção da página';
                    
                    results.push({
                        title: title,
                        description: 'Encontrado na página atual',
                        url: '#' + section.id,
                        score: 2
                    });
                }
            });
        }

        // Sort by score
        return results.sort((a, b) => b.score - a.score);
    }

    function showSearchResults(results, query) {
        const overlay = document.getElementById('global-search-results');
        const resultsList = overlay.querySelector('.search-results-list');
        const noResults = overlay.querySelector('.no-results');

        if (results.length === 0) {
            resultsList.innerHTML = '';
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            
            const resultsHTML = results.map(result => `
                <div class="search-result-item" onclick="navigateToResult('${result.url}')">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-description">${result.description}</div>
                </div>
            `).join('');
            
            resultsList.innerHTML = resultsHTML;
        }

        overlay.style.display = 'flex';

        // Setup close functionality
        const closeBtn = overlay.querySelector('.close-search-results');
        closeBtn.onclick = () => {
            overlay.style.display = 'none';
        };

        // Close on overlay click
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        };

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                overlay.style.display = 'none';
            }
        });
    }

    // Global function for navigation
    window.navigateToResult = function(url) {
        if (url.startsWith('#')) {
            // Same page anchor
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // External page
            window.location.href = url;
        }
        
        // Close search results
        document.getElementById('global-search-results').style.display = 'none';
    };

    // Search event listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Auto-search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.trim().length >= 3) {
                // Show suggestions for longer queries
                const results = searchInContent(searchInput.value.trim().toLowerCase());
                if (results.length > 0) {
                    // Could show a dropdown with suggestions here
                }
            }
        }, 300);
    });

    console.log('🔍 Enhanced search functionality initialized');
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Parallax effect for hero image (subtle)
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    heroImage.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active states
                    updateActiveNavLink(href);
                }
            }
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink(activeHref = null) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        if (!activeHref) {
            // Determine active section based on scroll position
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeHref = `#${sectionId}`;
                }
            });
        }
        
        // Update all nav links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === activeHref);
        });
    }

    // Update active nav on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize animations and intersection observer
function initializeAnimations() {
    // Only add animations if user hasn't requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .hero-text, .features-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization: Preload images
function preloadImages() {
    const images = [
        'hero.jpg'
        // Add other important images here
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Service Worker Registration
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                console.log('New version available! Please refresh.');
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Export functions for potential use in other scripts
window.OvinoSul = {
    initializeApp,
    initializeHeader,
    initializeMobileMenu,
    initializeSearch,
    initializeServiceWorker
};