export class Pagination {
    constructor({ itemsPerPage = 10, onPageChange }) {
        this.currentPage = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChange = onPageChange;
        this.data = [];

        this.initDOM();
    }

    initDOM() {
        this.selectEl = document.querySelector('#per-page');
        this.prevBtn = document.querySelector('#prev-page');
        this.nextBtn = document.querySelector('#next-page');
        this.pageInfo = document.querySelector('.pages span');

        //Кол-во страниц 
        this.selectEl?.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value, 10);
            this.currentPage = 1;
            this.update();
        });

        // Кнопка Назад
        this.prevBtn?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.update();
            }
        });

        // Кнопка Вперед
        this.nextBtn?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.data.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.update();
            }
        });
    }

    setData(newData) {
        this.data = newData;
        this.currentPage = 1;
        this.update();
    }

    update() {
        const totalPages = Math.ceil(this.data.length / this.itemsPerPage) || 1;

        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;

        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = this.data.slice(start, end);

        // Обновляем текст страницы и состояние кнопок
        if (this.pageInfo) this.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        if (this.prevBtn) this.prevBtn.disabled = (this.currentPage <= 1);
        if (this.nextBtn) this.nextBtn.disabled = (this.currentPage >= totalPages);

        // Передаем нарезанные данные в функцию отрисовки
        this.onPageChange(paginatedItems);
    }
}