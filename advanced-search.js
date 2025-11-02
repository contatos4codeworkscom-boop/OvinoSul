// Advanced Search System with Navigation
class AdvancedSearch {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.input = null;
        this.resultsContainer = null;
        this.isOpen = false;
        this.currentFilter = 'all';
        
        this.searchData = [
            {
                id: 1,
                title: 'Raças de Ovinos',
                description: 'Conheça as principais raças de ovinos criadas no Rio Grande do Sul com características detalhadas.',
                url: 'racas.html',
                section: 'Raças',
                category: 'page',
                keywords: ['raças', 'ovinos', 'criação', 'animais', 'rebanho', 'genética', 'texel', 'merino', 'hampshire']
            },
            {
                id: 2,
                title: 'Calendário de Vacinação',
                description: 'Cronograma completo de vacinação para ovinos adaptado ao clima do Rio Grande do Sul.',
                url: 'vacinas.html',
                section: 'Vacinas',
                category: 'page',
                keywords: ['vacinas', 'vacinação', 'calendário', 'saúde', 'prevenção', 'doenças', 'protocolo']
            },
            {
                id: 3,
                title: 'Sobre o Projeto',
                description: 'Conheça mais sobre o OvinoSul e nossa missão de ajudar produtores gaúchos.',
                url: 'index.html#sobre',
                section: 'Sobre',
                category: 'section',
                keywords: ['sobre', 'projeto', 'informações', 'equipe', 'missão']
            },
            {
                id: 4,
                title: 'Contato',
                description: 'Entre em contato conosco para dúvidas, sugestões ou parcerias.',
                url: 'index.html#contato',
                section: 'Contato',
                category: 'section',
                keywords: ['contato', 'email', 'telefone', 'suporte', 'ajuda']
            },
            {
                id: 5,
                title: 'Guias Práticos',
                description: 'Dicas e orientações práticas para manejo de ovinos no pampa gaúcho.',
                url: 'index.html#guias',
                section: 'Guias',
                category: 'section',
                keywords: ['guias', 'práticos', 'manejo', 'dicas', 'orientações', 'cuidados']
            },
            {
                id: 6,
                title: 'Recursos',
                description: 'Ferramentas e recursos úteis para criadores de ovinos.',
                url: 'index.html#recursos',
                section: 'Recursos',
                category: 'section',
                keywords: ['recursos', 'ferramentas', 'materiais', 'downloads']
            },
            {
                id: 7,
                title: 'Para Produtores',
                description: 'Informações especializadas para produtores profissionais de ovinos.',
                url: 'index.html#produtores',
                section: 'Produtores',
                category: 'section',
                keywords: ['produtores', 'profissionais', 'negócios', 'mercado', 'comercialização']
            },
            {
                id: 8,
                title: 'Novidades 2025',
                description: 'Últimas atualizações e novidades para o ano de 2025.',
                url: 'index.html#novidades',
                section: 'Novidades',
                category: 'section',
                keywords: ['novidades', '2025', 'atualizações', 'novo', 'lançamentos']
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createSearchModal();
        this.bindEvents();
    }
    
    createSearchModal() {
        const modalHTML = `
            <div class="search-modal-overlay">
                <div class="search-modal">
                    <div class="search-modal-header">
                        <div class="search-input-wrapper">
                            <div class="search-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                class="search-modal-input" 
                                placeholder="Buscar raças, vacinas, guias..."
                                autocomplete="off"
                            >
                            <button class="search-close-btn" aria-label="Fechar busca">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="search-modal-body">
                        <div class="search-results-container"></div>
                    </div>
                    <div class="search-shortcuts">
                        <div class="search-shortcut">
                            <kbd class="search-shortcut-key">↑</kbd>
                            <kbd class="search-shortcut-key">↓</kbd>
                            <span>Navegar</span>
                        </div>
                        <div class="search-shortcut">
                            <kbd class="search-shortcut-key">Enter</kbd>
                            <span>Abrir</span>
                        </div>
                        <div class="search-shortcut">
                            <kbd class="search-shortcut-key">ESC</kbd>
                            <span>Fechar</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        this.overlay = document.querySelector('.search-modal-overlay');
        this.modal = document.querySelector('.search-modal');
        this.input = document.querySelector('.search-modal-input');
        this.resultsContainer = document.querySelector('.search-results-container');
        
        this.showSuggestions();
    }
    
    bindEvents() {
        const searchBtns = document.querySelectorAll('.header-search-btn, .search-btn, #hero-search-input');
        searchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });
        
        const closeBtn = document.querySelector('.search-close-btn');
        closeBtn?.addEventListener('click', () => this.close());
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        this.input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
        });
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.showSuggestions();
            return;
        }
        
        const results = this.search(query);
        this.displayResults(results, query);
    }
    
    search(query) {
        const searchTerm = query.toLowerCase().trim();
        
        return this.searchData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descMatch = item.description.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords.some(kw => kw.includes(searchTerm));
            
            return titleMatch || descMatch || keywordMatch;
        }).sort((a, b) => {
            const aTitle = a.title.toLowerCase().startsWith(searchTerm) ? 0 : 1;
            const bTitle = b.title.toLowerCase().startsWith(searchTerm) ? 0 : 1;
            return aTitle - bTitle;
        });
    }
    
    displayResults(results, query) {
        if (results.length === 0) {
            this.showEmptyState(query);
            return;
        }
        
        const resultsHTML = `
            <div class="search-results-header">
                <div class="search-results-count">
                    <strong>${results.length}</strong> resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}
                </div>
            </div>
            <ul class="search-results-list">
                ${results.map(result => this.createResultItem(result, query)).join('')}
            </ul>
        `;
        
        this.resultsContainer.innerHTML = resultsHTML;
        
        this.resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const url = item.getAttribute('href');
                this.close();
                setTimeout(() => {
                    window.location.href = url;
                }, 200);
            });
        });
    }
    
    createResultItem(result, query) {
        const icon = this.getCategoryIcon(result.category);
        const highlightedTitle = this.highlightText(result.title, query);
        const highlightedDesc = this.highlightText(result.description, query);
        
        return `
            <a href="${result.url}" class="search-result-item">
                <div class="search-result-header">
                    <div class="search-result-icon">${icon}</div>
                    <div class="search-result-content">
                        <h3 class="search-result-title">
                            ${highlightedTitle}
                            <span class="search-result-badge">${result.category === 'page' ? 'Página' : 'Seção'}</span>
                        </h3>
                        <p class="search-result-description">${highlightedDesc}</p>
                        <div class="search-result-meta">
                            <div class="search-result-meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                                ${result.section}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
    
    getCategoryIcon(category) {
        const icons = {
            page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
            section: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
        };
        return icons[category] || icons.section;
    }
    
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: #fef08a; color: #854d0e; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    }
    
    showSuggestions() {
        const suggestionsHTML = `
            <div class="search-suggestions">
                <h3 class="search-suggestions-title">Sugestões Populares</h3>
                <div class="search-suggestions-list">
                    <button class="search-suggestion-tag" data-query="raças">🐑 Raças</button>
                    <button class="search-suggestion-tag" data-query="vacinas">💉 Vacinas</button>
                    <button class="search-suggestion-tag" data-query="manejo">📋 Manejo</button>
                    <button class="search-suggestion-tag" data-query="guias">📖 Guias</button>
                    <button class="search-suggestion-tag" data-query="produtores">👨‍🌾 Produtores</button>
                </div>
            </div>
            <ul class="search-results-list" style="margin-top: 24px;">
                ${this.searchData.slice(0, 4).map(result => this.createResultItem(result, '')).join('')}
            </ul>
        `;
        
        this.resultsContainer.innerHTML = suggestionsHTML;
        
        this.resultsContainer.querySelectorAll('.search-suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.getAttribute('data-query');
                this.input.value = query;
                this.handleSearch(query);
                this.input.focus();
            });
        });
        
        this.resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const url = item.getAttribute('href');
                this.close();
                setTimeout(() => {
                    window.location.href = url;
                }, 200);
            });
        });
    }
    
    showEmptyState(query) {
        const emptyHTML = `
            <div class="search-empty-state">
                <div class="search-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>
                <h3 class="search-empty-title">Nenhum resultado encontrado</h3>
                <p class="search-empty-description">
                    Não encontramos nada para "<strong>${query}</strong>". Tente buscar por termos como raças, vacinas ou guias.
                </p>
            </div>
            <div class="search-suggestions">
                <h3 class="search-suggestions-title">Experimente buscar por:</h3>
                <div class="search-suggestions-list">
                    <button class="search-suggestion-tag" data-query="raças">Raças de Ovinos</button>
                    <button class="search-suggestion-tag" data-query="vacinação">Calendário de Vacinação</button>
                    <button class="search-suggestion-tag" data-query="manejo">Dicas de Manejo</button>
                </div>
            </div>
        `;
        
        this.resultsContainer.innerHTML = emptyHTML;
        
        this.resultsContainer.querySelectorAll('.search-suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.getAttribute('data-query');
                this.input.value = query;
                this.handleSearch(query);
                this.input.focus();
            });
        });
    }
    
    open() {
        this.isOpen = true;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            this.input.focus();
        }, 100);
    }
    
    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.input.value = '';
        this.showSuggestions();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AdvancedSearch();
});
