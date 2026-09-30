export const getUsers = async () => {
    let users =[]; 

    try {
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        const cached = JSON.parse(localStorage.getItem('users'));
        return Array.isArray(cached) ? cached : [];
    }
};