export const adminProductsTable = (products, onEdit, onDelete) => {
    const totalProducts = products ? products.length : 0;
    const totalProductsElement = document.querySelector('#total-products');
    if (totalProductsElement) {
        totalProductsElement.textContent = totalProducts;
    }


    const productTbody = document.querySelector('#products-content table tbody');
    if (!productTbody) return;

    productTbody.innerHTML = ``;

    if (!products || products.length === 0) {
        productTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <a href="" class="product-info">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <p>${product.title}</p>
                </a>
            </td>
            <td>${product.category}</td>
            <td>${product.rating.count}</td>
            <td>$${product.price}</td>
            <td>
                <div class="edit-and-delete">
                    <button id="edit" data-id="${product.id}" title="edit"><i class="bi bi-pencil-square"></i></button>
                    <button id="delete" data-id="${product.id}" title="delete"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;

        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');

        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                onEdit(product.id);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                onDelete(product.id);
            });
        }
        

        productTbody.appendChild(row);
    });
};