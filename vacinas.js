// ========================================
// VACCINES PAGE - MODERN FUNCTIONALITY 2025
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeVaccinesPage();
});

function initializeVaccinesPage() {
    // Initialize main components
    initializeVaccineData();
    initializeSearch();
    initializeMobileMenu();
    initializeCalendar();
    initializeQuickActions();
    initializeVaccinesList();
    initializeInteractions();
    
    console.log('✅ Vaccines page initialized successfully');
}

// ========================================
// VACCINE DATA STRUCTURE
// ========================================

const vaccineData = {
    brucelose: {
        name: 'Brucelose',
        type: 'obligatory',
        keywords: ['brucelose', 'aborto', 'infertilidade', 'obrigatória', 'fêmeas', 'dose única', 'mapa'],
        description: 'Vacina obrigatória contra brucelose, previne abortos e infertilidade. Fundamental para a saúde reprodutiva do rebanho.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>`,
        schedule: [
            { month: 'Todo o ano', age: '3-8 meses', note: 'Fêmeas apenas - dose única' }
        ],
        details: {
            'Aplicação': 'Fêmeas de 3 a 8 meses (dose única)',
            'Reforço': 'Não necessário',
            'Observações': 'Seguir orientações do MAPA'
        }
    },
    clostridioses: {
        name: 'Clostridioses',
        type: 'recommended',
        keywords: ['clostridiose', 'clostridium', 'carbúnculo', 'gangrena', 'enterotoxemia', 'manqueira'],
        description: 'Previne doenças clostridiais fatais como carbúnculo sintomático, gangrena gasosa e enterotoxemia.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>`,
        schedule: [
            { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
            { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
            { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
        ],
        details: {
            'Primeira dose': 'Animais no maternal',
            'Segunda dose': 'Após 30 dias',
            'Reforço': 'Anual para todos os animais'
        }
    },
    diarreia: {
        name: 'Diarreia Neonatal',
        type: 'recommended',
        keywords: ['diarreia', 'neonatal', 'cordeiros', 'recém-nascidos', 'desidratação', 'mortalidade'],
        description: 'Protege cordeiros contra diarreia neonatal que pode causar desidratação e alta mortalidade.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>`,
        schedule: [
            { month: 'Junho', age: 'Novilhas', note: '60 dias pré-parto' },
            { month: 'Julho', age: 'Novilhas', note: '30 dias pré-parto' },
            { month: 'Janeiro', age: 'Matrizes', note: 'Reforço anual' }
        ],
        details: {
            'Aplicação': 'Novilhas 60 e 30 dias antes do parto',
            'Reforço': 'Anual para todas as matrizes',
            'Público': 'Fêmeas reprodutoras'
        }
    },
    leptospirose: {
        name: 'Leptospirose',
        type: 'recommended',
        keywords: ['leptospirose', 'leptospira', 'aborto', 'natimorto', 'renal', 'icterícia'],
        description: 'Previne leptospirose, doença bacteriana que causa abortos, natimortos e problemas renais.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                <rect x="2" y="9" width="20" height="12" rx="2" ry="2"/>
              </svg>`,
        schedule: [
            { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
            { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
            { month: 'Julho', age: 'Todos', note: 'Reforço semestral' }
        ],
        details: {
            'Primeira dose': 'Animais no maternal',
            'Segunda dose': 'Após 30 dias',
            'Reforço': 'Semestral ou trimestral'
        }
    },
    raiva: {
        name: 'Raiva',
        type: 'obligatory',
        keywords: ['raiva', 'zoonose', 'sistema nervoso', 'morcego', 'obrigatória', 'fatal'],
        description: 'Vacina obrigatória contra raiva, doença viral fatal que afeta o sistema nervoso. É uma zoonose.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>`,
        schedule: [
            { month: 'Maio', age: '4+ meses', note: 'Primeira dose' },
            { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
        ],
        details: {
            'Aplicação': 'A partir dos 4 meses de idade',
            'Reforço': 'Anual',
            'Observações': 'Obrigatória em áreas endêmicas'
        }
    },
    'ibr-bvd': {
        name: 'IBR e BVD',
        type: 'recommended',
        keywords: ['ibr', 'bvd', 'reprodutiva', 'respiratória', 'gestacional', 'rinotraqueíte'],
        description: 'Previne doenças reprodutivas e respiratórias, reduzindo perdas gestacionais significativamente.',
        icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
              </svg>`,
        schedule: [
            { month: 'Março-Abril', age: 'Maternal', note: 'Primeira dose' },
            { month: 'Abril-Maio', age: 'Maternal', note: 'Segunda dose' },
            { month: 'Janeiro', age: 'Todos', note: 'Reforço anual' }
        ],
        details: {
            'Primeira dose': 'Animais no maternal',
            'Segunda dose': 'Após 30 dias',
            'Reforço': 'Anual para todos os animais'
        }
    }
};

// ========================================
// DATA INITIALIZATION
// ========================================

function initializeVaccineData() {
    // Prepare search index
    window.vaccineSearchIndex = [];
    
    Object.entries(vaccineData).forEach(([id, vaccine]) => {
        window.vaccineSearchIndex.push({
            id: id,
            name: vaccine.name,
            type: vaccine.type,
            keywords: vaccine.keywords,
            description: vaccine.description,
            relevance: 0
        });
    });
    
    console.log('📊 Vaccine data initialized:', Object.keys(vaccineData).length, 'vaccines');
}

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!mobileToggle || !mobileNav) return;
    
    let isMenuOpen = false;
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        mobileToggle.classList.toggle('active', isMenuOpen);
        mobileNav.classList.toggle('active', isMenuOpen);
        
        // Update ARIA attributes
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileToggle.setAttribute('aria-label', isMenuOpen ? 'Fechar menu' : 'Abrir menu');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Add animation classes
        if (isMenuOpen) {
            mobileNav.style.transform = 'translateX(0)';
            mobileNav.style.opacity = '1';
            mobileNav.style.visibility = 'visible';
        } else {
            mobileNav.style.transform = 'translateX(-100%)';
            mobileNav.style.opacity = '0';
            mobileNav.style.visibility = 'hidden';
        }
    }
    
    function closeMobileMenu() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    console.log('📱 Mobile menu initialized');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function initializeSearch() {
    const searchInput = document.getElementById('vaccine-search');
    const searchClear = document.getElementById('search-clear');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchModal = document.getElementById('search-results-modal');
    const closeSearch = document.getElementById('close-search');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    // Search input handlers
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        // Show/hide clear button
        if (searchClear) {
            searchClear.style.display = query ? 'block' : 'none';
        }
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        if (query.length >= 2) {
            // Debounce search
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        } else {
            hideSuggestions();
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });
    
    // Clear search
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            searchClear.style.display = 'none';
            hideSuggestions();
            searchInput.focus();
        });
    }
    
    // Close search modal
    if (closeSearch && searchModal) {
        closeSearch.addEventListener('click', function() {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close on backdrop click
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close search modal on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    function showSearchSuggestions(query) {
        if (!searchSuggestions) return;
        
        const suggestions = searchVaccines(query).slice(0, 5); // Show top 5 suggestions
        
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }
        
        const suggestionsHTML = suggestions.map(vaccine => `
            <div class="suggestion-item" data-vaccine="${vaccine.id}">
                <div class="suggestion-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${vaccine.name}</div>
                    <div class="suggestion-description">${vaccine.description.substring(0, 80)}...</div>
                </div>
            </div>
        `).join('');
        
        searchSuggestions.innerHTML = suggestionsHTML;
        searchSuggestions.classList.add('active');
        
        // Add click handlers to suggestions
        searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const vaccineId = this.dataset.vaccine;
                searchInput.value = vaccineData[vaccineId].name;
                hideSuggestions();
                scrollToVaccine(vaccineId);
            });
        });
    }
    
    function hideSuggestions() {
        if (searchSuggestions) {
            searchSuggestions.classList.remove('active');
        }
    }
    
    function performSearch(query) {
        if (!query || query.length < 2) return;
        
        hideSuggestions();
        
        const results = searchVaccines(query);
        showSearchResults(results, query);
    }
    
    function searchVaccines(query) {
        const queryWords = query.toLowerCase().split(' ');
        const results = [];
        
        window.vaccineSearchIndex.forEach(vaccine => {
            let relevance = 0;
            
            // Search in name (highest weight)
            queryWords.forEach(word => {
                if (vaccine.name.toLowerCase().includes(word)) {
                    relevance += 10;
                }
            });
            
            // Search in keywords (medium weight)
            queryWords.forEach(word => {
                vaccine.keywords.forEach(keyword => {
                    if (keyword.includes(word)) {
                        relevance += 5;
                    }
                });
            });
            
            // Search in description (lower weight)
            queryWords.forEach(word => {
                if (vaccine.description.toLowerCase().includes(word)) {
                    relevance += 2;
                }
            });
            
            if (relevance > 0) {
                results.push({
                    ...vaccine,
                    relevance: relevance
                });
            }
        });
        
        return results.sort((a, b) => b.relevance - a.relevance);
    }
    
    function showSearchResults(results, query) {
        if (!searchModal) return;
        
        const resultsBody = document.getElementById('search-results-body');
        if (!resultsBody) return;
        
        if (results.length === 0) {
            resultsBody.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--vaccine-text-light);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; opacity: 0.5;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente pesquisar com termos diferentes como "brucelose", "obrigatória" ou "cordeiros".</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(vaccine => {
                const vaccineDetails = vaccineData[vaccine.id];
                return `
                    <div class="search-result-item" data-vaccine="${vaccine.id}">
                        <div class="result-header">
                            <div class="result-icon">${vaccineDetails.icon}</div>
                            <div class="result-info">
                                <h4>${vaccine.name}</h4>
                                <span class="result-type ${vaccine.type}">${vaccine.type === 'obligatory' ? 'Obrigatória' : 'Recomendada'}</span>
                            </div>
                        </div>
                        <p class="result-description">${vaccine.description}</p>
                        <button class="result-action" onclick="scrollToVaccine('${vaccine.id}'); closeSearchModal();">
                            Ver detalhes
                        </button>
                    </div>
                `;
            }).join('');
            
            resultsBody.innerHTML = `
                <div style="margin-bottom: 1.5rem;">
                    <h4>Encontramos ${results.length} resultado(s) para "${query}":</h4>
                </div>
                ${resultsHTML}
            `;
        }
        
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function scrollToVaccine(vaccineId) {
        const vaccineElement = document.getElementById(vaccineId) || document.querySelector(`[data-vaccine="${vaccineId}"]`);
        if (vaccineElement) {
            vaccineElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add highlight effect
            vaccineElement.style.transform = 'scale(1.02)';
            vaccineElement.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.3)';
            
            setTimeout(() => {
                vaccineElement.style.transform = '';
                vaccineElement.style.boxShadow = '';
            }, 2000);
        }
    }
    
    // Make functions globally available
    window.scrollToVaccine = scrollToVaccine;
    window.closeSearchModal = function() {
        if (searchModal) {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    console.log('🔍 Search functionality initialized');
}

// ========================================
// QUICK ACTIONS
// ========================================

function initializeQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Remove active class from all cards
            actionCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Handle different views
            switch(view) {
                case 'calendar':
                    scrollToSection('calendar-section');
                    break;
                case 'vaccines':
                    scrollToSection('vaccines-section');
                    break;
                case 'schedule':
                    showScheduleModal();
                    break;
                case 'download':
                    downloadCalendar();
                    break;
            }
        });
    });
    
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function showScheduleModal() {
        // Implementation for schedule modal
        alert('Cronograma detalhado em desenvolvimento!');
    }
    
    console.log('⚡ Quick actions initialized');
}

// ========================================
// CALENDAR FUNCTIONALITY
// ========================================

function initializeCalendar() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const monthlyCalendar = document.getElementById('monthlyCalendar');
    const annualCalendar = document.getElementById('annualCalendar');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Toggle between monthly and annual views
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show appropriate calendar
            if (view === 'monthly') {
                monthlyCalendar?.classList.add('active');
                annualCalendar?.classList.remove('active');
            } else {
                monthlyCalendar?.classList.remove('active');
                annualCalendar?.classList.add('active');
            }
        });
    });
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const category = this.value;
            filterVaccines(category);
        });
    }
    
    // Generate calendar content
    generateCalendarContent();
    
    function filterVaccines(category) {
        const vaccineCards = document.querySelectorAll('.vaccine-card');
        
        vaccineCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const hasCategory = card.classList.contains(category);
                card.style.display = hasCategory ? 'block' : 'none';
            }
        });
    }
    
    function generateCalendarContent() {
        // Generate monthly calendar
        if (monthlyCalendar) {
            monthlyCalendar.innerHTML = generateMonthlyView();
        }
        
        // Generate annual calendar
        if (annualCalendar) {
            annualCalendar.innerHTML = generateAnnualView();
        }
    }
    
    function generateMonthlyView() {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        return months.map((month, index) => `
            <div class="month-card">
                <h3 class="month-title">${month} 2025</h3>
                <div class="month-vaccines">
                    ${getVaccinesForMonth(index + 1)}
                </div>
            </div>
        `).join('');
    }
    
    function generateAnnualView() {
        return `
            <div class="annual-overview">
                <h3>Visão Geral do Ano</h3>
                <div class="timeline">
                    ${generateTimelineEvents()}
                </div>
            </div>
        `;
    }
    
    function getVaccinesForMonth(month) {
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                           'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const monthName = monthNames[month - 1];
        
        const vaccines = [];
        
        Object.entries(vaccineData).forEach(([id, vaccine]) => {
            vaccine.schedule.forEach(schedule => {
                if (schedule.month.includes(monthName)) {
                    vaccines.push({
                        name: vaccine.name,
                        type: vaccine.type,
                        note: schedule.note,
                        age: schedule.age
                    });
                }
            });
        });
        
        if (vaccines.length === 0) {
            return '<p class="no-vaccines">Nenhuma vacinação programada</p>';
        }
        
        return vaccines.map(vaccine => `
            <div class="vaccine-event ${vaccine.type}">
                <strong>${vaccine.name}</strong>
                <span>${vaccine.age} - ${vaccine.note}</span>
            </div>
        `).join('');
    }
    
    function generateTimelineEvents() {
        // Timeline implementation
        return '<p>Timeline em desenvolvimento...</p>';
    }
    
    console.log('📅 Calendar initialized');
}

// ========================================
// VACCINES LIST
// ========================================

function initializeVaccinesList() {
    const vaccinesGrid = document.getElementById('vaccines-grid');
    
    if (!vaccinesGrid) return;
    
    // Generate vaccine cards
    const vaccinesHTML = Object.entries(vaccineData).map(([id, vaccine]) => `
        <div class="vaccine-card ${vaccine.type}" id="${id}" data-vaccine="${id}">
            <div class="vaccine-header">
                <div class="vaccine-icon">
                    ${vaccine.icon}
                </div>
                <div class="vaccine-info">
                    <h3 class="vaccine-name">${vaccine.name}</h3>
                    <span class="vaccine-type ${vaccine.type}">
                        ${vaccine.type === 'obligatory' ? 'Obrigatória' : 'Recomendada'}
                    </span>
                </div>
            </div>
            
            <div class="vaccine-content">
                <p class="vaccine-description">${vaccine.description}</p>
                
                <div class="vaccine-details">
                    ${Object.entries(vaccine.details).map(([key, value]) => `
                        <div class="detail-item">
                            <strong>${key}:</strong>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    vaccinesGrid.innerHTML = vaccinesHTML;
    
    // Add interaction handlers
    const vaccineCards = document.querySelectorAll('.vaccine-card');
    vaccineCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        
        // Add click handler for mobile
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    console.log('💉 Vaccines list initialized');
}

// ========================================
// GENERAL INTERACTIONS
// ========================================

function initializeInteractions() {
    // Download calendar functionality
    const downloadBtn = document.getElementById('downloadCalendar');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCalendar);
    }
    
    // Alert CTA
    const alertCta = document.querySelector('.alert-cta');
    if (alertCta) {
        alertCta.addEventListener('click', function() {
            // Scroll to contact section or open contact modal
            window.location.href = 'index.html#contato';
        });
    }
    
    // Smooth scroll for internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.vaccine-card, .stat-card, .management-card').forEach(el => {
        observer.observe(el);
    });
    
    console.log('🎭 Interactions initialized');
}

// ========================================
// DOWNLOAD FUNCTIONALITY
// ========================================

function downloadCalendar() {
    // Show loading state
    const btn = document.getElementById('downloadCalendar');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            Gerando PDF...
        `;
        btn.disabled = true;
        
        // Simulate download process
        setTimeout(() => {
            // Create download link
            const link = document.createElement('a');
            link.href = '#'; // In real implementation, this would be the PDF URL
            link.download = 'calendario-vacinacao-ovinos-2025.pdf';
            
            // For demo purposes, show success message
            alert('Em uma implementação real, o download do PDF começaria agora!\n\nCalendário de Vacinação para Ovinos - RS 2025');
            
            // Restore button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .month-card {
        background: var(--vaccine-surface);
        border: 1px solid var(--vaccine-border);
        border-radius: var(--vaccine-radius-lg);
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .month-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--vaccine-text);
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .month-vaccines {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .vaccine-event {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border-radius: var(--vaccine-radius);
        color: white;
        font-size: 0.875rem;
    }
    
    .vaccine-event.obligatory {
        background: linear-gradient(135deg, var(--vaccine-danger), #ef4444);
    }
    
    .vaccine-event.recommended {
        background: linear-gradient(135deg, var(--vaccine-primary), var(--vaccine-primary-light));
    }
    
    .no-vaccines {
        text-align: center;
        color: var(--vaccine-text-muted);
        font-style: italic;
        padding: 1rem;
    }
    
    .search-result-item {
        background: var(--vaccine-surface-elevated);
        border: 1px solid var(--vaccine-border);
        border-radius: var(--vaccine-radius);
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .result-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.75rem;
    }
    
    .result-icon {
        color: var(--vaccine-primary);
    }
    
    .result-info h4 {
        margin: 0;
        color: var(--vaccine-text);
        font-weight: 600;
    }
    
    .result-type {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .result-type.obligatory {
        background: rgba(220, 38, 38, 0.1);
        color: var(--vaccine-danger);
    }
    
    .result-type.recommended {
        background: rgba(5, 150, 105, 0.1);
        color: var(--vaccine-primary);
    }
    
    .result-description {
        color: var(--vaccine-text-light);
        margin-bottom: 1rem;
        line-height: 1.5;
    }
    
    .result-action {
        background: var(--vaccine-primary);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--vaccine-radius);
        font-weight: 600;
        cursor: pointer;
        transition: var(--vaccine-transition);
    }
    
    .result-action:hover {
        background: var(--vaccine-primary-light);
    }
`;

document.head.appendChild(style);

console.log('🚀 Vaccines page fully loaded and interactive!');