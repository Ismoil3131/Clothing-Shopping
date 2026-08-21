import { addToProduct } from "./moduls/addToCard.js";
import { getProductsCard } from "./moduls/getProductsCard.js";
import { getCategory } from "./moduls/getCategory.js";

window.addEventListener('DOMContentLoaded', ()=> {
    getProductsCard()
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

// ываываы


const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');

increment.addEventListener('click', () => {
    let count = parseInt(counter.textContent) || 0;
    counter.textContent = count + 1;
});

decrement.addEventListener('click', () => {
    let count = parseInt(counter.textContent) || 0;
    if (count > 1) { 
        counter.textContent = count - 1;
    }
});



