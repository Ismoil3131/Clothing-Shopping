const cart = [];
const orders = document.querySelector('.orders')
const cardWrapper= document.querySelector('.card-wrapper')
const orderCount = document.querySelector('.order-count')
let products = [];

const addToCard = (products = []) => {
    cardWrapper.addEventListener('click', (event) =>{
        const button = event.target.closest('.add-to-cart-btn')
        
        

        if (!button) return;

        const productId = Number(button.dataset.id);
        const product = products.find(item =>item.id == productId);

        if (productId){
            cart.push(product);
            renderCart(orders)
            amountOrder();
            
        }
    });

    orders.addEventListener('click', (e) => {
        const orderEl = e.target.closest('.order');
        if (!orderEl) return;

        const productId = Number(orderEl.dataset.id);

        if (e.target.closest('.increment')) {
            const item = cart.find(p => p.id === productId);
            if (item) item.count += 1;
        } 
        else if (e.target.closest('.decrement')) {
            const item = cart.find(p => p.id === productId);
            if (item && item.count > 1) {
                item.count -= 1;
            } else {
                cart = cart.filter(p => p.id !== productId);
            }
        } 
        else if (e.target.closest('#delete')) {
            cart = cart.filter(p => p.id !== productId);
        }

        renderCart(orders);
        amountOrder();
    });
}

const amountOrder = () => {
    if (!orderCount) return;
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    orderCount.textContent = totalCount;
};

const renderCart = (container) => {
    container.innerHTML = cart.map(item =>` 
        <div class="order data-id="${item.id}">
            <img src="${item.img}" alt="${item.title}">
            <div class="order-info">
                <h4>${item.title}</h4>
                <p id="size">Size: S</p>
                <p id="price">$ ${item.price}</p>
            </div>
            <div class="order-counter">
                <button id="delete"><i class="bi bi-trash"></i></button>
                <div class="counter">
                    <button id="decrement">-</button>
                    <span id="counter">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
        </div>
    `).join('');
}


export {
    addToCard
}