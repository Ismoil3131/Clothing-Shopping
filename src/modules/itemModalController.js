export function initModalController({ onSaveProduct, onSaveUser }) {
    const modal = document.querySelector('#modal-overlay');
    const form = document.querySelector('#modal-form');
    const modalTitle = document.querySelector('#modal-title');
    const submitBtn = document.querySelector('#modal-submit-btn');

    const inputId = document.querySelector('#form-item-id');
    const inputTitle = document.querySelector('#form-input-title');
    const inputCategory = document.querySelector('#form-input-category');
    const inputPrice = document.querySelector('#form-input-price');
    const inputExtra = document.querySelector('#form-input-extra');
    const inputDescription = document.querySelector('#form-input-description');
    const inputFile = document.querySelector('#form-input-file');

    const groupDescription = document.querySelector('#group-description');
    const groupImage = document.querySelector('#group-image');

    const labelTitle = document.querySelector('#label-title');
    const labelCategory = document.querySelector('#label-category');
    const labelPrice = document.querySelector('#label-price');
    const labelExtra = document.querySelector('#label-extra');

    const closeBtn = document.querySelector('#modal-close-btn');
    const cancelBtn = document.querySelector('#modal-cancel-btn');

    let currentEntity = 'products';
    let currentMode = 'add';
    let currentEditingItem = null;
    let base64Image = '';

    if (inputFile) {
        inputFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    base64Image = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function openModal(entityType, mode, data = null) {
        currentEntity = entityType;
        currentMode = mode;
        currentEditingItem = data;
        base64Image = data?.image || '';

        if (form) form.reset();
        if (inputId) inputId.value = '';

        if (entityType === 'products') {
            if (labelTitle) labelTitle.textContent = 'Product Name';
            if (labelCategory) labelCategory.textContent = 'Category';
            if (labelPrice) labelPrice.textContent = 'Pieces';
            if (labelExtra) labelExtra.textContent = 'Price ($)';

            if (inputTitle) { inputTitle.type = 'text'; inputTitle.placeholder = 'Enter product name'; }
            if (inputCategory) { inputCategory.type = 'text'; inputCategory.placeholder = 'Enter category'; }
            if (inputPrice) { inputPrice.type = 'number'; inputPrice.min = '0'; inputPrice.placeholder = 'Enter count'; }
            if (inputExtra) { inputExtra.type = 'number'; inputExtra.min = '0'; inputExtra.step = '1'; inputExtra.placeholder = 'Enter price'; }

            if (groupDescription) groupDescription.style.display = 'block';
            if (groupImage) groupImage.style.display = 'block';

            if (modalTitle) modalTitle.textContent = mode === 'add' ? 'Add Product' : 'Edit Product';
            if (submitBtn) submitBtn.textContent = mode === 'add' ? 'Create Product' : 'Save Changes';

            if (mode === 'edit' && data) {
                if (inputId) inputId.value = data.id ?? '';
                if (inputTitle) inputTitle.value = data.title || '';
                if (inputCategory) inputCategory.value = data.category || '';
                if (inputPrice) inputPrice.value = data.rating?.count ?? data.pieces ?? 1;
                if (inputExtra) inputExtra.value = data.price || 1;
                if (inputDescription) inputDescription.value = data.description || '';
            }
        } else {
            if (labelTitle) labelTitle.textContent = 'Full Name';
            if (labelCategory) labelCategory.textContent = 'Email';
            if (labelPrice) labelPrice.textContent = 'Login';
            if (labelExtra) labelExtra.textContent = 'Phone';

            if (inputTitle) { inputTitle.type = 'text'; inputTitle.placeholder = 'Enter full name'; }
            if (inputCategory) { inputCategory.type = 'email'; inputCategory.placeholder = 'Enter email'; }
            if (inputPrice) { inputPrice.type = 'text'; inputPrice.placeholder = 'Enter login'; }
            if (inputExtra) { inputExtra.type = 'text'; inputExtra.maxLength = '9'; inputExtra.placeholder = 'Enter phone number'; }

            if (groupDescription) groupDescription.style.display = 'none';
            if (groupImage) groupImage.style.display = 'none';

            if (modalTitle) modalTitle.textContent = mode === 'add' ? 'Add User' : 'Edit User';
            if (submitBtn) submitBtn.textContent = mode === 'add' ? 'Create User' : 'Save Changes';

            if (mode === 'edit' && data) {
                if (inputId) inputId.value = data.id ?? '';
                
                // Исправление undefined для пользователя
                let nameStr = '';
                if (typeof data.name === 'object' && data.name !== null) {
                    nameStr = `${data.name.firstname || ''} ${data.name.lastname || ''}`.trim();
                } else {
                    nameStr = data.name || '';
                }

                if (inputTitle) inputTitle.value = nameStr;
                if (inputCategory) inputCategory.value = data.email || '';
                if (inputPrice) inputPrice.value = data.username || data.login || '';
                if (inputExtra) inputExtra.value = data.phone || '';
            }
        }

        if (modal) modal.classList.remove('hidden');
    }

    function closeModal() {
        if (modal) modal.classList.add('hidden');
    }

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const idVal = inputId?.value ? String(inputId.value) : String(Date.now());

        if (currentEntity === 'products') {
            const countVal = Math.max(1, Number(inputPrice?.value) || 1);
            const priceVal = Math.max(1, Number(inputExtra?.value) || 1);

            const productData = {
                id: isNaN(Number(idVal)) ? idVal : Number(idVal),
                title: inputTitle?.value || '',
                price: priceVal,
                category: inputCategory?.value || '',
                description: inputDescription?.value || 'No description',
                image: base64Image || currentEditingItem?.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
                rating: {
                    rate: currentEditingItem?.rating?.rate || 0,
                    count: countVal
                }
            };

            onSaveProduct(productData, currentMode);
        } else {
            const fullName = inputTitle?.value || '';
            const nameParts = fullName.trim().split(' ');

            const userData = {
                id: isNaN(Number(idVal)) ? idVal : Number(idVal),
                name: {
                    firstname: nameParts[0] || fullName,
                    lastname: nameParts.slice(1).join(' ') || ''
                },
                email: inputCategory?.value || '',
                username: inputPrice?.value || '',
                phone: inputExtra?.value || ''
            };

            onSaveUser(userData, currentMode);
        }

        closeModal();
    });

    return { openModal, closeModal };
}