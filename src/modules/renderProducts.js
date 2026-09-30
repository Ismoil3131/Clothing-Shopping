export const renderProducts = (products) => {
    const container = document.querySelector('#products-container');
    if (!container) return;

    container.innerHTML = '';

    if (!products || products.length === 0) {
        container.innerHTML = '<p>No products .</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">В корзину</button>
        `;
        container.appendChild(card);
    });
};