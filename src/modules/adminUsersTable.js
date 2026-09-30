export const adminUsersTable = (users, onEdit, onDelete) => {
    const totalUsers = users ? users.length : 0;
    const totalUsersElement = document.querySelector('#total-users');
    if (totalUsersElement) {
        totalUsersElement.textContent = totalUsers;
    }

    const usersTableBody = document.querySelector('#user-content table tbody');
    if (!usersTableBody) return;

    usersTableBody.innerHTML = '';
    if (!users || users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No users found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');

        // Обработка имени (объект или строка)
        let fullName = 'No Name';
        if (typeof user.name === 'object' && user.name !== null) {
            fullName = `${user.name.firstname || ''} ${user.name.lastname || ''}`.trim();
        } else if (typeof user.name === 'string') {
            fullName = user.name;
        }

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${fullName}</td>
            <td>${user.email || ''}</td>
            <td>${user.username || user.login || ''}</td>
            <td>${user.phone || ''}</td>
            <td>
                <div class="edit-and-delete">
                    <button type="button" class="btn-edit" data-id="${user.id}" title="edit">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn-delete" data-id="${user.id}" title="delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;

        const editBtn = row.querySelector('.btn-edit');
        const deleteBtn = row.querySelector('.btn-delete');

        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                onEdit(user.id);
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                onDelete(user.id);
            });
        }

        usersTableBody.appendChild(row);
    });
};