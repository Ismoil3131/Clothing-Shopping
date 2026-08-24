import { getProductsCard } from "./getProductsCard.js"

const cart = []

const addToCartBtn = document.querySelector('.add-to-cart')
const orders = document.querySelector('.orders')
const cardWrapper = document.querySelector('.card-wrapper')

const addToCard = () => {
   cardWrapper.addEventListener('click', (event) =>{
    const button = cardWrapper.closest('.add-to-card-btn')
    if (!button) return;

    const productId = Number(button.dataset.id);
    const product = product.find(item =>item.id = productId);

    if (productId){
        cart.push(product);
        renderCart(orders)
    }
})
}

const renderCart = (orderContainer) => {
    orderContainer.innerHTML = cart.map(item =>` <div class="order">
            <img src="${item.image}" alt="${item.title}">
            <div class="order-info">
                <h4>${item.title}</h4>
                <p id="price">$${item.price}</p>
            </div>
        </div>
    `).join('');
}


export {
    addToCard
}