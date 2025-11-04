// ============================================
// TECH HUB - Search Functionality
// ============================================

class SearchManager {
    constructor() {
        this.searchHistory = this.loadSearchHistory();
        this.initializeSearch();
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            // Add autocomplete functionality
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });

            // Add search suggestions
            this.createSuggestionBox(searchInput);
        }
    }

    handleSearchInput(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.getSuggestions(query);
        this.showSuggestions(suggestions);
    }

    getSuggestions(query) {
        const products = productManager.searchProducts(query);
        return products.slice(0, 5).map(p => ({
            type: 'product',
            text: p.name,
            id: p.id
        }));
    }

    createSuggestionBox(searchInput) {
        const suggestionBox = document.createElement('div');
        suggestionBox.id = 'searchSuggestions';
        suggestionBox.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 2px solid var(--light-gray);
            border-top: none;
            border-radius: 0 0 var(--radius-md) var(--radius-md);
            box-shadow: var(--shadow-lg);
            max-height: 300px;
            overflow-y: auto;
            display: none;
            z-index: 1000;
        `;
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(suggestionBox);
    }

    showSuggestions(suggestions) {
        const box = document.getElementById('searchSuggestions');
        if (!box || suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        box.innerHTML = suggestions.map(s => `
            <div class="search-suggestion-item" style="padding: 0.75rem 1rem; cursor: pointer; transition: var(--transition-fast);" 
                 onmouseover="this.style.background='var(--off-white)'" 
                 onmouseout="this.style.background='white'"
                 onclick="window.location.href='pages/products/detail.html?id=${s.id}'">
                <i class="fas fa-search" style="color: var(--gray); margin-right: 0.5rem;"></i>
                ${s.text}
            </div>
        `).join('');

        box.style.display = 'block';
    }

    hideSuggestions() {
        const box = document.getElementById('searchSuggestions');
        if (box) {
            box.style.display = 'none';
        }
    }

    addToHistory(query) {
        if (!query || this.searchHistory.includes(query)) return;
        
        this.searchHistory.unshift(query);
        if (this.searchHistory.length > 10) {
            this.searchHistory.pop();
        }
        
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

    loadSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Make globally accessible
window.searchManager = searchManager;
