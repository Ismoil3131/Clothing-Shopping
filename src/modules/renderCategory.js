export const renderCategory = (products, renderProducts) => {
    const filterContainer = document.querySelector('.filter');
    if (!filterContainer) return;

    const categories = ['All', ...new Set(products.map(item => item.category))];

    filterContainer.innerHTML = `
        <i class="bi bi-funnel"></i>
        ${categories.map((cat, index) => `
            <button type="button" 
                class="filter-btn ${index === 0 ? 'active' : ''}" 
                data-category="${cat}">
                ${cat === 'All' ? 'All products' : cat}
            </button>
        `).join('')}
    `;

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.dataset.category;
        const result = selectedCategory === 'All' ? products : products.filter(item => item.category === selectedCategory);

        renderProducts(result);
    });
};
