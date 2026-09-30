import { getProducts as fetchProductsFromApi } from '../api/getProducts.js';

export const getProductsService = async () => {
    const localData = localStorage.getItem('products');

    if (localData) {
        return JSON.parse(localData);
    }

    const apiProducts = await fetchProductsFromApi();
    if (apiProducts && apiProducts.length > 0) {
        localStorage.setItem('products', JSON.stringify(apiProducts));
    }
    return apiProducts || [];
};

export const saveProductsService = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const deleteProductService = async (id) => {
    const products = await getProductsService();
    const updatedProducts = products.filter(product => product.id !== Number(id));

    saveProductsService(updatedProducts);
    return updatedProducts;
};

export const addProductService = async (newProductData) => {
    const products = await getProductsService();
    const existingProduct = products.find(product => product.title === newProductData.title);

    if (existingProduct) {
        throw new Error('Product with this title already exists');
    }

    const newProduct = {
        id: Date.now(),
        ...newProductData
    };
    products.unshift(newProduct);
    
    saveProductsService(products);
    return products;
};

export const updateProductService = async (id, updatedData) => {
    const products = await getProductsService();

    const index = products.findIndex(product => product.id === Number(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        saveProductsService(products);
    }
    
    return products;
};