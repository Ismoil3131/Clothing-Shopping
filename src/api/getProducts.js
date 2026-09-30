export const getProducts = async ()=> {

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        localStorage.setItem('products', JSON.stringify(products));
        return products;
    } catch (error) {
        const cached = JSON.parse(localStorage.getItem('products'));
        return Array.isArray(cached) ? cached : [];
    }
};
