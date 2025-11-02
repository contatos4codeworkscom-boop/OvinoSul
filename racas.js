// ========================================
// BREEDS PAGE - MODERN FUNCTIONALITY 2025
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeBreedsPage();
});

function initializeBreedsPage() {
    // Initialize main components
    initializeBreedData();
    initializeSearch();
    initializeMobileMenu();
    initializeFilters();
    initializeBreedsList();
    initializeComparison();
    initializeInteractions();
    
    console.log('✅ Breeds page initialized successfully');
}

// ========================================
// BREED DATA STRUCTURE
// ========================================

const breedData = {
    texel: {
        name: 'Texel',
        origin: 'Holanda (Ilha de Texel)',
        aptitude: 'meat',
        popularity: 95,
        keywords: ['texel', 'carne', 'precoce', 'qualidade', 'adaptada', 'muscular', 'holanda'],
        description: 'Raça amplamente reconhecida por sua aptidão para produção de carne de alta qualidade. Ovinos de tamanho médio a grande, com conformação corporal robusta e musculosa.',
        characteristics: {
            'Peso Adulto': 'Machos: 90-120kg | Fêmeas: 70-90kg',
            'Fertilidade': 'Alta - 150-180% de cordeiros/ovelha',
            'Precocidade': 'Abate aos 4-6 meses (35-40kg)',
            'Rusticidade': 'Excelente adaptação ao clima do RS'
        },
        tags: ['meat', 'hardy', 'precocious'],
        advantages: [
            'Adaptação climática: Excelente adaptação às estações bem definidas do Rio Grande do Sul',
            'Qualidade da carne: Carne magra, macia e suculenta com baixo teor de gordura',
            'Rentabilidade: Precocidade permite giro rápido do rebanho e maior produtividade',
            'Facilidade de manejo: Ovelhas são boas mães com boa produção de leite',
            'Mercado: Alta demanda por carne de qualidade no mercado gaúcho'
        ],
        woolProduction: 0,
        adultWeight: 105,
        score: 9.2
    },
    corriedale: {
        name: 'Corriedale',
        origin: 'Nova Zelândia',
        aptitude: 'dual',
        popularity: 88,
        keywords: ['corriedale', 'dupla aptidão', 'tradicional', 'lã', 'carne', 'adaptada', 'nova zelândia'],
        description: 'Raça de dupla aptidão, tradicionalmente criada no Rio Grande do Sul. Oferece boa produção de carne e lã de qualidade média, sendo excelente para diversificar a produção.',
        characteristics: {
            'Peso Adulto': 'Machos: 80-100kg | Fêmeas: 60-75kg',
            'Produção de Lã': '4-6kg por animal/ano',
            'Finura da Lã': '25-31 mícrons',
            'Fertilidade': '120-140% de cordeiros/ovelha'
        },
        tags: ['dual', 'wool', 'traditional'],
        advantages: [
            'Tradição: Raça bem estabelecida e adaptada ao clima gaúcho',
            'Dupla aptidão: Produção simultânea de carne e lã',
            'Rusticidade: Excelente adaptação aos campos nativos',
            'Mercado da lã: Aproveitamento da reorganização do mercado laneiro',
            'Facilidade de manejo: Temperamento dócil e fácil manejo'
        ],
        woolProduction: 5,
        adultWeight: 90,
        score: 8.5
    },
    dorper: {
        name: 'Dorper',
        origin: 'África do Sul',
        aptitude: 'meat',
        popularity: 92,
        keywords: ['dorper', 'deslanado', 'carne', 'resistente', 'sem tosquia', 'prolífico', 'áfrica'],
        description: 'Raça deslanada de aptidão para carne, conhecida por sua rusticidade e adaptabilidade. Não necessita de tosquia, reduzindo custos de manejo e mão de obra.',
        characteristics: {
            'Peso Adulto': 'Machos: 90-140kg | Fêmeas: 70-90kg',
            'Fertilidade': '150-200% de cordeiros/ovelha',
            'Precocidade': 'Abate aos 4-5 meses',
            'Característica': 'Deslanado - não precisa tosquia'
        },
        tags: ['meat', 'hardy', 'no-wool'],
        advantages: [
            'Baixo custo: Não necessita tosquia, reduzindo custos operacionais',
            'Adaptabilidade: Boa adaptação a diferentes sistemas de criação',
            'Prolificidade: Alta taxa de nascimentos múltiplos',
            'Carne de qualidade: Boa cobertura muscular e baixo teor de gordura',
            'Resistência: Boa resistência a parasitas e doenças'
        ],
        woolProduction: 0,
        adultWeight: 115,
        score: 9.0
    },
    romney: {
        name: 'Romney Marsh',
        origin: 'Inglaterra',
        aptitude: 'dual',
        popularity: 75,
        keywords: ['romney', 'dupla aptidão', 'rústica', 'lã forte', 'longevidade', 'inglaterra'],
        description: 'Raça de dupla aptidão conhecida pela rusticidade e capacidade de produzir lã forte, adequada para tapetes e produtos industriais. Adapta-se bem a terrenos úmidos.',
        characteristics: {
            'Peso Adulto': 'Machos: 100-130kg | Fêmeas: 70-85kg',
            'Produção de Lã': '5-7kg por animal/ano',
            'Finura da Lã': '36-40 mícrons',
            'Longevidade': '8-10 anos de vida produtiva'
        },
        tags: ['dual', 'wool', 'hardy'],
        advantages: [
            'Rusticidade extrema: Adapta-se a condições adversas e terrenos úmidos',
            'Lã industrial: Produção de lã forte para mercado industrial',
            'Longevidade: Animais com vida produtiva prolongada',
            'Baixo custo: Menor exigência nutricional',
            'Resistência: Boa resistência a doenças podais'
        ],
        woolProduction: 6,
        adultWeight: 115,
        score: 8.0
    },
    morada_nova: {
        name: 'Morada Nova',
        origin: 'Brasil (Ceará)',
        aptitude: 'meat',
        popularity: 85,
        keywords: ['morada nova', 'brasileira', 'carne', 'tropical', 'resistente', 'ceará', 'nacional'],
        description: 'Raça brasileira desenvolvida no Ceará, com excelente adaptação ao clima tropical e resistência a parasitas. Boa opção para diversificação no RS.',
        characteristics: {
            'Peso Adulto': 'Machos: 60-80kg | Fêmeas: 40-55kg',
            'Fertilidade': '140-160% de cordeiros/ovelha',
            'Precocidade': 'Abate aos 5-6 meses',
            'Característica': 'Excelente resistência a verminoses'
        },
        tags: ['meat', 'hardy', 'brazilian'],
        advantages: [
            'Origem brasileira: Raça nacional adaptada ao nosso clima',
            'Resistência parasitária: Menor necessidade de vermifugação',
            'Eficiência reprodutiva: Boa taxa de fertilidade e prolificidade',
            'Rusticidade: Baixas exigências nutricionais',
            'Carne saborosa: Produto diferenciado no mercado'
        ],
        woolProduction: 0,
        adultWeight: 70,
        score: 8.3
    },
    santa_ines: {
        name: 'Santa Inês',
        origin: 'Brasil (Bahia)',
        aptitude: 'meat',
        popularity: 90,
        keywords: ['santa inês', 'brasileira', 'carne', 'deslanado', 'resistente', 'bahia', 'tropical'],
        description: 'Raça brasileira deslanada, resultante do cruzamento de raças africanas com europeias. Excelente para produção de carne em clima tropical.',
        characteristics: {
            'Peso Adulto': 'Machos: 80-120kg | Fêmeas: 50-70kg',
            'Fertilidade': '150-180% de cordeiros/ovelha',
            'Precocidade': 'Abate aos 4-5 meses',
            'Característica': 'Deslanado e resistente ao calor'
        },
        tags: ['meat', 'hardy', 'brazilian'],
        advantages: [
            'Adaptação brasileira: Desenvolvida para condições tropicais',
            'Alta prolificidade: Excelentes índices reprodutivos',
            'Sem tosquia: Economia em mão de obra',
            'Ganho de peso: Boa conversão alimentar',
            'Mercado crescente: Demanda em expansão no Sul'
        ],
        woolProduction: 0,
        adultWeight: 100,
        score: 8.8
    }
};

// ========================================
// DATA INITIALIZATION
// ========================================

function initializeBreedData() {
    // Prepare search index
    window.breedSearchIndex = [];
    
    Object.entries(breedData).forEach(([id, breed]) => {
        window.breedSearchIndex.push({
            id: id,
            name: breed.name,
            aptitude: breed.aptitude,
            keywords: breed.keywords,
            description: breed.description,
            relevance: 0
        });
    });
    
    console.log('📊 Breed data initialized:', Object.keys(breedData).length, 'breeds');
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
    const searchInput = document.getElementById('breed-search');
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
        
        const suggestions = searchBreeds(query).slice(0, 5);
        
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }
        
        const suggestionsHTML = suggestions.map(breed => `
            <div class="suggestion-item" data-breed="${breed.id}">
                <div class="suggestion-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${breed.name}</div>
                    <div class="suggestion-description">${breed.description.substring(0, 80)}...</div>
                </div>
            </div>
        `).join('');
        
        searchSuggestions.innerHTML = suggestionsHTML;
        searchSuggestions.classList.add('active');
        
        // Add click handlers to suggestions
        searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const breedId = this.dataset.breed;
                searchInput.value = breedData[breedId].name;
                hideSuggestions();
                scrollToBreed(breedId);
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
        
        const results = searchBreeds(query);
        showSearchResults(results, query);
    }
    
    function searchBreeds(query) {
        const queryWords = query.toLowerCase().split(' ');
        const results = [];
        
        window.breedSearchIndex.forEach(breed => {
            let relevance = 0;
            
            // Search in name (highest weight)
            queryWords.forEach(word => {
                if (breed.name.toLowerCase().includes(word)) {
                    relevance += 10;
                }
            });
            
            // Search in keywords (medium weight)
            queryWords.forEach(word => {
                breed.keywords.forEach(keyword => {
                    if (keyword.includes(word)) {
                        relevance += 5;
                    }
                });
            });
            
            // Search in description (lower weight)
            queryWords.forEach(word => {
                if (breed.description.toLowerCase().includes(word)) {
                    relevance += 2;
                }
            });
            
            if (relevance > 0) {
                results.push({
                    ...breed,
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
                <div style="text-align: center; padding: 2rem; color: var(--breed-text-light);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; opacity: 0.5;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente pesquisar com termos como "texel", "carne", "dupla aptidão" ou "deslanado".</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(breed => {
                const breedDetails = breedData[breed.id];
                return `
                    <div class="search-result-item" data-breed="${breed.id}">
                        <div class="result-header">
                            <div class="result-info">
                                <h4>${breed.name}</h4>
                                <span class="result-origin">${breedDetails.origin}</span>
                                <span class="result-aptitude ${breed.aptitude}">${getAptitudeName(breed.aptitude)}</span>
                            </div>
                        </div>
                        <p class="result-description">${breed.description}</p>
                        <button class="result-action" onclick="scrollToBreed('${breed.id}'); closeSearchModal();">
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
    
    function scrollToBreed(breedId) {
        const breedElement = document.getElementById(breedId) || document.querySelector(`[data-breed="${breedId}"]`);
        if (breedElement) {
            breedElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add highlight effect
            breedElement.style.transform = 'scale(1.02)';
            breedElement.style.boxShadow = '0 0 0 3px rgba(3, 105, 161, 0.3)';
            
            setTimeout(() => {
                breedElement.style.transform = '';
                breedElement.style.boxShadow = '';
            }, 2000);
        }
    }
    
    // Make functions globally available
    window.scrollToBreed = scrollToBreed;
    window.closeSearchModal = function() {
        if (searchModal) {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    console.log('🔍 Search functionality initialized');
}

// ========================================
// FILTER FUNCTIONALITY
// ========================================

function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortSelect = document.getElementById('sortSelect');
    
    let currentFilter = 'all';
    let currentSort = 'name';
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            applyFilters();
        });
    });
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applyFilters();
        });
    }
    
    function applyFilters() {
        const breedCards = document.querySelectorAll('.breed-card');
        const visibleBreeds = [];
        
        // Filter breeds
        breedCards.forEach(card => {
            const breedId = card.dataset.breed;
            const breed = breedData[breedId];
            
            let shouldShow = false;
            
            if (currentFilter === 'all') {
                shouldShow = true;
            } else if (currentFilter === 'meat' && breed.aptitude === 'meat') {
                shouldShow = true;
            } else if (currentFilter === 'wool' && breed.woolProduction > 0) {
                shouldShow = true;
            } else if (currentFilter === 'dual' && breed.aptitude === 'dual') {
                shouldShow = true;
            }
            
            if (shouldShow) {
                visibleBreeds.push({ card, breed, id: breedId });
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort visible breeds
        sortBreeds(visibleBreeds);
    }
    
    function sortBreeds(breeds) {
        const container = document.getElementById('breeds-grid');
        if (!container) return;
        
        breeds.sort((a, b) => {
            switch (currentSort) {
                case 'name':
                    return a.breed.name.localeCompare(b.breed.name);
                case 'popularity':
                    return b.breed.popularity - a.breed.popularity;
                case 'weight':
                    return b.breed.adultWeight - a.breed.adultWeight;
                case 'wool':
                    return b.breed.woolProduction - a.breed.woolProduction;
                default:
                    return 0;
            }
        });
        
        // Reorder DOM elements
        breeds.forEach(({ card }) => {
            container.appendChild(card);
        });
    }
    
    console.log('🔍 Filters initialized');
}

// ========================================
// BREEDS LIST
// ========================================

function initializeBreedsList() {
    const breedsGrid = document.getElementById('breeds-grid');
    
    if (!breedsGrid) return;
    
    // Generate breed cards
    const breedsHTML = Object.entries(breedData).map(([id, breed]) => `
        <div class="breed-card" id="${id}" data-breed="${id}">
            <div class="breed-header">
                <div class="breed-image">
                    <div class="breed-placeholder">${breed.name}</div>
                </div>
                <div class="breed-info">
                    <h3 class="breed-name">${breed.name}</h3>
                    <p class="breed-origin">Origem: ${breed.origin}</p>
                    <div class="breed-tags">
                        ${breed.tags.map(tag => `<span class="tag ${tag}">${getTagName(tag)}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div class="breed-content">
                <p class="breed-description">${breed.description}</p>
                
                <div class="characteristics-grid">
                    ${Object.entries(breed.characteristics).map(([key, value]) => `
                        <div class="char-item">
                            <strong>${key}:</strong>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="breed-advantages">
                    <h4>Por que escolher ${breed.name} para o RS?</h4>
                    <ul>
                        ${breed.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="breed-actions">
                    <button class="btn-compare" onclick="addToComparison('${id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                            <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                            <path d="M15 11h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                            <path d="M15 7h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                            <line x1="9" y1="12" x2="15" y2="12"></line>
                        </svg>
                        Comparar
                    </button>
                    <button class="btn-details" onclick="showBreedDetails('${id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    breedsGrid.innerHTML = breedsHTML;
    
    // Add interaction handlers
    const breedCards = document.querySelectorAll('.breed-card');
    breedCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${0.1 + (index * 0.15)}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    console.log('🐑 Breeds list initialized');
}

// ========================================
// COMPARISON FUNCTIONALITY
// ========================================

function initializeComparison() {
    window.comparisonBreeds = [];
    const maxComparison = 3;
    
    window.addToComparison = function(breedId) {
        if (window.comparisonBreeds.includes(breedId)) {
            removeFromComparison(breedId);
            return;
        }
        
        if (window.comparisonBreeds.length >= maxComparison) {
            alert(`Você pode comparar no máximo ${maxComparison} raças por vez.`);
            return;
        }
        
        window.comparisonBreeds.push(breedId);
        updateComparisonUI();
        updateCompareButton(breedId, true);
    };
    
    function removeFromComparison(breedId) {
        const index = window.comparisonBreeds.indexOf(breedId);
        if (index > -1) {
            window.comparisonBreeds.splice(index, 1);
            updateComparisonUI();
            updateCompareButton(breedId, false);
        }
    }
    
    function updateCompareButton(breedId, isSelected) {
        const card = document.querySelector(`[data-breed="${breedId}"]`);
        const button = card?.querySelector('.btn-compare');
        
        if (button) {
            if (isSelected) {
                button.textContent = '✓ Selecionado';
                button.style.background = 'var(--breed-secondary)';
            } else {
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                        <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                        <path d="M15 11h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                        <path d="M15 7h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    Comparar
                `;
                button.style.background = '';
            }
        }
    }
    
    function updateComparisonUI() {
        const comparisonTool = document.getElementById('comparison-tool');
        if (!comparisonTool) return;
        
        if (window.comparisonBreeds.length === 0) {
            comparisonTool.innerHTML = `
                <div class="comparison-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                        <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4"></path>
                        <path d="M15 11h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                        <path d="M15 7h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4"></path>
                        <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    <h3>Selecione raças para comparar</h3>
                    <p>Clique no botão "Comparar" em qualquer raça para começar</p>
                </div>
            `;
        } else {
            const comparisonHTML = generateComparisonTable();
            comparisonTool.innerHTML = comparisonHTML;
        }
    }
    
    function generateComparisonTable() {
        const breeds = window.comparisonBreeds.map(id => ({ id, ...breedData[id] }));
        
        return `
            <div class="comparison-table">
                <div class="comparison-header">
                    <h3>Comparação de Raças (${breeds.length}/${maxComparison})</h3>
                    <button class="clear-comparison" onclick="clearComparison()">Limpar</button>
                </div>
                <div class="comparison-grid">
                    ${breeds.map(breed => `
                        <div class="comparison-breed">
                            <div class="comparison-breed-header">
                                <h4>${breed.name}</h4>
                                <button class="remove-breed" onclick="removeFromComparison('${breed.id}')">×</button>
                            </div>
                            <div class="comparison-details">
                                <div class="detail-row">
                                    <span class="detail-label">Origem:</span>
                                    <span class="detail-value">${breed.origin}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Aptidão:</span>
                                    <span class="detail-value">${getAptitudeName(breed.aptitude)}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Peso Adulto:</span>
                                    <span class="detail-value">${breed.adultWeight}kg (média)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Lã/ano:</span>
                                    <span class="detail-value">${breed.woolProduction ? breed.woolProduction + 'kg' : 'Deslanado'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Popularidade:</span>
                                    <span class="detail-value">${breed.popularity}%</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    window.clearComparison = function() {
        window.comparisonBreeds.forEach(breedId => {
            updateCompareButton(breedId, false);
        });
        window.comparisonBreeds = [];
        updateComparisonUI();
    };
    
    console.log('🔄 Comparison functionality initialized');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function getAptitudeName(aptitude) {
    const names = {
        'meat': 'Carne',
        'wool': 'Lã',
        'dual': 'Dupla Aptidão'
    };
    return names[aptitude] || aptitude;
}

function getTagName(tag) {
    const names = {
        'meat': 'Carne',
        'wool': 'Lã',
        'dual': 'Dupla Aptidão',
        'hardy': 'Rústica',
        'precocious': 'Precoce',
        'traditional': 'Tradicional',
        'no-wool': 'Deslanado',
        'brazilian': 'Brasileira'
    };
    return names[tag] || tag;
}

window.showBreedDetails = function(breedId) {
    const breed = breedData[breedId];
    alert(`Detalhes de ${breed.name}:\n\n${breed.description}\n\nOrigem: ${breed.origin}\nAptidão: ${getAptitudeName(breed.aptitude)}`);
};

// ========================================
// GENERAL INTERACTIONS
// ========================================

function initializeInteractions() {
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
    document.querySelectorAll('.breed-card, .stat-card, .market-card, .guide-card').forEach(el => {
        observer.observe(el);
    });
    
    console.log('🎭 Interactions initialized');
}

// Add CSS for comparison table
const style = document.createElement('style');
style.textContent = `
    .comparison-table {
        background: var(--breed-surface);
        border-radius: var(--breed-radius-xl);
        padding: 2rem;
        width: 100%;
    }
    
    .comparison-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--breed-border);
    }
    
    .comparison-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--breed-text);
        margin: 0;
    }
    
    .clear-comparison {
        background: var(--breed-surface-elevated);
        border: 1px solid var(--breed-border);
        border-radius: var(--breed-radius);
        padding: 0.5rem 1rem;
        color: var(--breed-text-light);
        cursor: pointer;
        transition: var(--breed-transition);
    }
    
    .clear-comparison:hover {
        background: var(--breed-border-light);
        color: var(--breed-text);
    }
    
    .comparison-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }
    
    .comparison-breed {
        background: var(--breed-surface-elevated);
        border: 1px solid var(--breed-border);
        border-radius: var(--breed-radius-lg);
        padding: 1.5rem;
    }
    
    .comparison-breed-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--breed-border-light);
    }
    
    .comparison-breed-header h4 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--breed-text);
        margin: 0;
    }
    
    .remove-breed {
        background: none;
        border: none;
        color: var(--breed-text-muted);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 50%;
        transition: var(--breed-transition);
    }
    
    .remove-breed:hover {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
    }
    
    .comparison-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .detail-label {
        font-weight: 600;
        color: var(--breed-text);
        font-size: 0.875rem;
    }
    
    .detail-value {
        color: var(--breed-text-light);
        font-size: 0.875rem;
        text-align: right;
    }
    
    .search-result-item {
        background: var(--breed-surface-elevated);
        border: 1px solid var(--breed-border);
        border-radius: var(--breed-radius);
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .result-header {
        margin-bottom: 0.75rem;
    }
    
    .result-info h4 {
        margin: 0 0 0.5rem 0;
        color: var(--breed-text);
        font-weight: 600;
    }
    
    .result-origin {
        font-size: 0.875rem;
        color: var(--breed-text-muted);
        margin-right: 1rem;
    }
    
    .result-aptitude {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .result-aptitude.meat {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
    }
    
    .result-aptitude.wool {
        background: rgba(5, 150, 105, 0.1);
        color: var(--breed-secondary);
    }
    
    .result-aptitude.dual {
        background: rgba(245, 158, 11, 0.1);
        color: var(--breed-accent);
    }
    
    .result-description {
        color: var(--breed-text-light);
        margin-bottom: 1rem;
        line-height: 1.5;
    }
    
    .result-action {
        background: var(--breed-primary);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--breed-radius);
        font-weight: 600;
        cursor: pointer;
        transition: var(--breed-transition);
    }
    
    .result-action:hover {
        background: var(--breed-primary-light);
    }
    
    @media (max-width: 768px) {
        .comparison-grid {
            grid-template-columns: 1fr;
        }
        
        .comparison-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            text-align: center;
        }
    }
`;

document.head.appendChild(style);

console.log('🚀 Breeds page fully loaded and interactive!');