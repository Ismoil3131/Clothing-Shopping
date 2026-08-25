import { addToCard } from "./addToCard.js";
import { getCategory } from "./getCategory.js";

const cardWrapper = document.querySelector('.card-wrapper');

const getProductsCard = async ()=> {
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const products = await response.json();

        localStorage.setItem('products', JSON.stringify(products))
        renderProducts(products);
        addToCard(products);

    } catch (error) {
        products = JSON.parse(localStorage.getItem('products')) || [];
        console.error('Ошибка при загрузке товаров:', error);

        if (cardWrapper) {
            cardWrapper.innerHTML = 
            `<div class="no-products">
                <div id= "empty-card-products">
                    <p>Товаров нету</p>
                </div>
            </div>`;
        }
    }
}

const renderProducts = (products) => {
    if (!cardWrapper) return;

    cardWrapper.innerHTML = products.map((product) => `
        <div class="card">
            <span id="product-category">${product.category || ''}</span>
            <img src="${product.image}" alt="${product.title}">
            <div class="card-info-wraper">
                <div class="card-info">
                    <h2>${product.title}</h2>
                    <span id = "rating"></span>
                    <span>$${product.price}</span>
                </div>
                <button type="button" class="add-to-cart-btn" data-id="${product.id}">
                    <i class="bi bi-cart2"></i> Add to cart
                </button>
            </div>
        </div>
    `).join('');
};
    
export {
    getProductsCard
}