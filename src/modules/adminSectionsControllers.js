import { adminProductsTable } from './adminProductsTable.js';
import { adminUsersTable } from './adminUsersTable.js';
import { initModalController } from './itemModalController.js';

export function initAdminController({ products = [], users = [] }) {
    let currentTab = 'products-content'; 

    // Загружаем сохраненные данные из localStorage с верными ключами
    let rawProducts = JSON.parse(localStorage.getItem('products')) || [...products];
    let rawUsers = JSON.parse(localStorage.getItem('users')) || [...users];

    // Синхронизируем с localStorage
    localStorage.setItem('products', JSON.stringify(rawProducts));
    localStorage.setItem('users', JSON.stringify(rawUsers));

    function updateStatsCounters() {
        const totalProductsEl = document.querySelector('#total-products');
        const totalUsersEl = document.querySelector('#total-users');

        if (totalProductsEl) totalProductsEl.textContent = rawProducts.length;
        if (totalUsersEl) totalUsersEl.textContent = rawUsers.length;
    }

    const modal = initModalController({
        onSaveProduct: (productData, mode) => {
            if (mode === 'add') {
                rawProducts.unshift(productData);
            } else {
                const index = rawProducts.findIndex(p => String(p.id) === String(productData.id));
                if (index !== -1) {
                    rawProducts[index] = { ...rawProducts[index], ...productData };
                }
            }
            localStorage.setItem('products', JSON.stringify(rawProducts));
            
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            currentPage = 1;

            updateStatsCounters();
            update();
        },
        onSaveUser: (userData, mode) => {
            if (mode === 'add') {
                rawUsers.unshift(userData);
            } else {
                const index = rawUsers.findIndex(u => String(u.id) === String(userData.id));
                if (index !== -1) {
                    rawUsers[index] = { ...rawUsers[index], ...userData };
                }
            }
            // Гарантированно сохраняем пользователей в localStorage
            localStorage.setItem('users', JSON.stringify(rawUsers));

            searchQuery = '';
            if (searchInput) searchInput.value = '';
            currentPage = 1;

            updateStatsCounters();
            update();
        }
    });

    let searchQuery = '';
    const searchInput = document.querySelector('#search-input');
    const searchForm = document.querySelector('.search-form');
    const sortSelect = document.querySelector('#sort-by');
    const perPageSelect = document.querySelector('#per-page');
    const prevBtn = document.querySelector('#prev-page');
    const nextBtn = document.querySelector('#next-page');
    const pageInfoSpan = document.querySelector('.pages span');

    // Берем начальное значение из селектора, если он есть
    let sortOption = sortSelect ? sortSelect.value : 'cheap';
    let currentPage = 1;
    let itemsPerPage = 10;

    const addBtn = document.querySelector('.sort-and-add button');
    const perPageText = document.querySelector('.per-page p');

    const navItems = document.querySelectorAll('.navigation-links .nav-item');
    const productsSection = document.querySelector('#products-content');
    const usersSection = document.querySelector('#user-content');

    // Безопасный поиск товара по ID (приведение к строке)
    const handleEditProduct = (id) => {
        const item = rawProducts.find(p => String(p.id) === String(id));
        if (item) modal.openModal('products', 'edit', item);
    };

    // Безопасное удаление товара
    const handleDeleteProduct = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
            rawProducts = rawProducts.filter(p => String(p.id) !== String(id));
            localStorage.setItem('products', JSON.stringify(rawProducts));
            updateStatsCounters();
            update();
        }
    };

    // Безопасный поиск пользователя по ID
    const handleEditUser = (id) => {
        const item = rawUsers.find(u => String(u.id) === String(id));
        if (item) modal.openModal('users', 'edit', item);
    };

    // Безопасное удаление пользователя
    const handleDeleteUser = (id) => {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            rawUsers = rawUsers.filter(u => String(u.id) !== String(id));
            localStorage.setItem('users', JSON.stringify(rawUsers));
            updateStatsCounters();
            update();
        }
    };

    function update() {
        if (currentTab === 'products-content') {
            updateProductsView();
        } else if (currentTab === 'user-content') {
            updateUsersView();
        }
    }

    function updateProductsView() {
        let filtered = rawProducts.filter(p => {
            const title = p.title ? p.title.toLowerCase() : '';
            const category = p.category ? p.category.toLowerCase() : '';
            return title.includes(searchQuery) || category.includes(searchQuery);
        });

        // Создаем копию для сортировки
        let sortedProducts = [...filtered];

        if (sortOption === 'cheap') {
            sortedProducts.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        } else if (sortOption === 'expensive') {
            sortedProducts.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        }

        const paginated = paginate(sortedProducts);
        adminProductsTable(paginated, handleEditProduct, handleDeleteProduct);
    }

    function updateUsersView() {
        let filtered = rawUsers.filter(u => {
            const name = typeof u.name === 'object' ? `${u.name?.firstname || ''} ${u.name?.lastname || ''}` : (u.name || '');
            const fullName = name.toLowerCase();
            const email = u.email ? u.email.toLowerCase() : '';
            const username = (u.username || u.login || '').toLowerCase();

            return fullName.includes(searchQuery) || email.includes(searchQuery) || username.includes(searchQuery);
        });

        const paginated = paginate(filtered);
        adminUsersTable(paginated, handleEditUser, handleDeleteUser);
    }

    function paginate(dataArray) {
        const totalPages = Math.ceil(dataArray.length / itemsPerPage) || 1;
        
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        if (pageInfoSpan) pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        if (prevBtn) prevBtn.disabled = (currentPage <= 1);
        if (nextBtn) nextBtn.disabled = (currentPage >= totalPages);

        const start = (currentPage - 1) * itemsPerPage;
        return dataArray.slice(start, start + itemsPerPage);
    }

    function switchTab(tab) {
        currentTab = tab;
        searchQuery = '';
        currentPage = 1;
        if (searchInput) searchInput.value = '';

        navItems.forEach(item => {
            if (item.dataset.section === tab) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        if (tab === 'products-content') {
            productsSection?.classList.remove('hidden');
            usersSection?.classList.add('hidden');

            if (addBtn) addBtn.textContent = '+ Add Product';
            if (perPageText) perPageText.innerHTML = 'Products on page';
            if (sortSelect) sortSelect.style.display = 'inline-block';
        } else if (tab === 'user-content') {
            usersSection?.classList.remove('hidden');
            productsSection?.classList.add('hidden');

            if (addBtn) addBtn.textContent = '+ Add User';
            if (perPageText) perPageText.innerHTML = 'Users on page';
            if (sortSelect) sortSelect.style.display = 'none';
        }

        update();
    }

    addBtn?.addEventListener('click', () => {
        const entity = currentTab === 'products-content' ? 'products' : 'users';
        modal.openModal(entity, 'add');
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionTarget = item.dataset.section;
            if (sectionTarget && sectionTarget !== 'settings') {
                switchTab(sectionTarget);
            }
        });
    });

    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        currentPage = 1;
        update();
    });

    searchForm?.addEventListener('submit', (e) => e.preventDefault());

    sortSelect?.addEventListener('change', (e) => {
        sortOption = e.target.value;
        currentPage = 1;
        update();
    });

    perPageSelect?.addEventListener('change', (e) => {
        itemsPerPage = parseInt(e.target.value, 10) || 10;
        currentPage = 1;
        update();
    });

    prevBtn?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            update();
        }
    });

    nextBtn?.addEventListener('click', () => {
        currentPage++;
        update();
    });

    updateStatsCounters();
    switchTab('products-content');
}