document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.category-card');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');

  // Navigate when a category is clicked
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const category = encodeURIComponent(card.dataset.category || '');
      // When jumping from Categories to the search page, we pass the generic query to the search index
      window.location.href = `busca.html?categoria=${category}`;
    });
  });

  // Search logic on the categories page
  if (clearSearch && searchInput) {
    clearSearch.addEventListener('click', () => {
      searchInput.value = '';
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = encodeURIComponent(searchInput.value.trim());
        if (query) {
          window.location.href = `busca.html?q=${query}`;
        }
      }
    });
  }
});
