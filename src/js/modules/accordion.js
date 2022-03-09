export default class Accordion {
    constructor(triggers, text) {
        this.btns = document.querySelectorAll(triggers);
        this.text = document.querySelectorAll(text);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.text.forEach(item => {
                    if (item.style.display !== 'block') {
                        item.classList.add('animate__animated', 'animate__fadeIn');
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}