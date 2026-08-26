import { addToCard } from "./moduls/addToCard.js";
import { getProductsCard } from "./moduls/getProductsCard.js";
import { getCategory } from "./moduls/getCategory.js";

window.addEventListener('DOMContentLoaded', async ()=> {
    const products = await getProductsCard();
    addToCard(products);
})





const openShopBtn = document.querySelector('.open-shop-card-btn');
const closeShopCardBtn = document.querySelector('.close-shop-card-btn');
const orderProducts = document.querySelector('.order-products');
const cardWrapper = document.querySelector('.card-wrapper');



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





