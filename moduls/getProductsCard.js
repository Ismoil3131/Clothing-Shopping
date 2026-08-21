import { getCategory } from "./getCategory.js";

const cardWrapper = document.querySelector('.card-wrapper');

const getProductsCard = async ()=> {
    try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
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

    cardWrapper.innerHTML = products.map((product) => {
        const { title, price, description ,rating, image, category } = product;

        return `
            <div class="card">
                <span id= "product-category">${category}</span>
                <img src="${image}" alt="${title}">
                <div class="card-info-wraper">
                    <div class="card-info">
                        <h2>${title}</h2>
                        <p> Rating ${rating.rate} </p>
                        <span>$${price}</span>
                    </div>
                    <button type="submit" class= "add-to-cart"><i class="bi bi-cart2"></i>Add to cart</button>
                </div>
            </div>
        `;
    }).join('');
};

export {
    getProductsCard
}