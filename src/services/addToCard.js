let cart = JSON.parse(localStorage.getItem('tems')) || [];

// Save in localstorage function

const saveAndRender = (container) => {
    localStorage.setItem('tems', JSON.stringify(cart));
    renderCart(container);
    amountOrder();
    totalAmount();
};

// Add to basket function

export const addToCard = (products = []) => {
    const orders = document.querySelector('.orders');
    const cardWrapper = document.querySelector('.card-wrapper');
    const emptyBasketCntr = document.querySelector('.no-orders');

    if (!orders) {
        emptyBasketCntr.toggleAttribute('hidden', true);
        return;
    };

    saveAndRender(orders);

    if (cardWrapper) {
        cardWrapper.addEventListener('click', (event) => {
            const button = event.target.closest('.add-to-cart-btn');
            if (!button) return;

            let itemsList = [];

            if (products.length > 0) {
                itemsList = products;
            } else {
                itemsList = JSON.parse(localStorage.getItem('products')) || [];
            }               
            
            const productId = Number(button.dataset.id);
            const product = itemsList.find(item => item.id === productId);

            if (product) {
                const existItem = cart.find(item => item.id === productId);
                if (existItem) {
                    existItem.count += 1;
                    alert('Product added to cart');
                } else {
                    cart.push({ ...product, count: 1 });
                }
                saveAndRender(orders);
            }
        });
    }

    orders.addEventListener('click', (e) => {
        const orderEl = e.target.closest('.order');
        if (!orderEl) return;

        const productId = Number(orderEl.dataset.id);

        if (e.target.closest('#increment')) {
            const item = cart.find(p => p.id === productId);
            if (item) item.count += 1;
        } 
        else if (e.target.closest('#decrement')) {
            const item = cart.find(p => p.id === productId);
            if (item && item.count > 1) {
                item.count -= 1;
            } else {
                cart = cart.filter(p => p.id !== productId);
            }
        } 
        else if (e.target.closest('.delete')) {
            confirm('Are you sure you want to remove this item from the cart?') && (cart = cart.filter(p => p.id !== productId));
        }
        saveAndRender(orders);
    });
};

// Item price function

const amountOrder = () => {
    const orderCount = document.querySelector('.order-count');
    if (!orderCount) return;
    orderCount.textContent = cart.reduce((sum, item) => sum + item.count, 0);
};

// Total price function

const totalAmount = () => {
    const totalPrice = document.querySelector('#total-price');
    if (!totalPrice) return;

    let total = 0;

    for (const item of cart) {
        total += item.price * item.count;
    }

    totalPrice.textContent = `$ ${total.toFixed(2)}`;
};

const renderCart = (container) => {
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <i class="bi bi-cart-x"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => ` 
        <div class="order" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}">
            <div class="order-info">
                <h4>${item.title}</h4>
                <p id="price">$ ${(item.price * item.count).toFixed(2)}</p>
            </div>
            <div class="order-counter">
                <button class="delete"><i class="bi bi-trash"></i></button>
                <div class="counter">
                    <button id="decrement">-</button>
                    <span id="counter-value">${item.count}</span>
                    <button id="increment">+</button>
                </div>
            </div>
        </div>
    `).join('');
};