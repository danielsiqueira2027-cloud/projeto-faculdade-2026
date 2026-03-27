document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const sortSelect = document.getElementById("sortSelect");
  const cardsGrid = document.getElementById("cards");
  const cards = Array.from(document.querySelectorAll(".card"));

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const name = encodeURIComponent(card.dataset.name || "");
      window.location.href = `profissional.html?name=${name}`;
    });
  });

  function filterAndSort() {
    const query = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const role = card.querySelector(".role").textContent.toLowerCase();
      if (name.includes(query) || role.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    const visibleCards = cards.filter(card => card.style.display !== "none");
    visibleCards.sort((a, b) => {
      if (sortBy === "distance") {
        return parseFloat(a.dataset.distance) - parseFloat(b.dataset.distance);
      } else if (sortBy === "rating") {
        return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      } else if (sortBy === "name") {
        return a.dataset.name.localeCompare(b.dataset.name);
      }
      return 0;
    });

    visibleCards.forEach(card => cardsGrid.appendChild(card));
  }

  searchInput.addEventListener("input", filterAndSort);
  sortSelect.addEventListener("change", filterAndSort);
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterAndSort();
  });

  filterAndSort();
});