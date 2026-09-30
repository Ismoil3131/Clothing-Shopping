import { addToCard } from "./src/services/addToCard.js";
import { getProductsCard} from "./src/api/getProducts.js";
import { getCategory } from "./src/services/getCategory.js";

window.addEventListener('DOMContentLoaded', async ()=> {
    const products = await getProductsCard();
    renderProducts(products);
    addToCard(products); 
    renderCategory(products, renderProducts);
});

const openShopBtn = document.querySelector('.open-shop-card-btn');
const closeShopCardBtn = document.querySelector('.close-shop-card-btn');
const orderProducts = document.querySelector('.order-products');
const cardWrapper = document.querySelector('.card-wrapper');
const mainContainer = document.querySelector('.main');



if (openShopBtn && orderProducts) {
    openShopBtn.addEventListener('click', () => {
        orderProducts.classList.add('active');
    });
}

if (closeShopCardBtn && orderProducts) {
    closeShopCardBtn.addEventListener('click', () => {
        orderProducts.classList.remove('active');
    });
}

// getproductsCard();

const showLoader = () => {
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="no-products">
                <div id="empty-card-products">
                    <div class="loader-ring"></div>
                    <span>Loading..</span>
                </div>
            </div>`;
    }
};


 export const renderProducts = (products) => {
    if (!cardWrapper) showLoader();

    cardWrapper.innerHTML = products.map((product) => `
        <div class="card">
            <span id="product-category">${product.category || ''}</span>
            <img src="${product.image}" alt="${product.title}">
            <div class="card-info-wraper">
                <div class="card-info">
                    <h2>${product.title}</h2>
                    <span id="rating">Rating ${product.rating.rate}</span>
                    <span>$${product.price}</span>
                </div>
                <button type="button" class="add-to-cart-btn" data-id="${product.id}">
                    <i class="bi bi-cart2"></i> Add to cart
                </button>
            </div>
        </div>
    `).join('');
};





