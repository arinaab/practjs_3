export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/evolve.jpg';
    }

    downloadItem(path) {
        const link = document.createElement('a');
        link.setAttribute('href', path);
        link.setAttribute('download', 'picture'); //устанавливаем атрибут, чтобы была возм-ть скачать

        link.style.display = 'none';
        document.body.append(link);

        link.click(); //вызываем событие клика на созданном элементе
        document.body.removeChild(link); //удаляем элемент
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}