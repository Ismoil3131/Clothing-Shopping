import { getUsers } from "../api/getUsers.js";
import { getProducts } from "../api/getProducts.js";
import { adminUsersTable } from "../modules/adminUsersTable.js";
import { getProductsService } from "../services/productService.js";
import { adminProductsTable } from "../modules/adminProductsTable.js";
import { initAdminController } from "../modules/adminSectionsControllers.js";

window.addEventListener('DOMContentLoaded', async () => {
    // 1. Получаем данные
    const users = await getUsers(); 
    const products = await getProductsService();

    console.log('Полученный массив пользователей:', users);
    console.log('Полученный массив продуктов:', products);

    // 2. Запускаем главный контроллер (он сам всё отрисует, свяжет модалку и клики)
    initAdminController({
        products: products || [],
        users: users || []
    });
});

const sidebarBtn = document.querySelector('#sidebar-btn');
if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.toggle('collapse');
    });
}

const navList = document.querySelectorAll('.navigation-links .nav-item');
navList.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) activeItem.classList.remove('active');
        item.classList.add('active');

        const targetSectionId = item.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            const activeSection = document.querySelector('.content-sections.active');
            if (activeSection) activeSection.classList.remove('active');
            targetSection.classList.add('active');
        }
    });
});