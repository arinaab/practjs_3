export default class Accordion {
    constructor(triggers, text) {
        this.triggers = document.querySelectorAll(triggers);
        this.text = document.querySelectorAll(text);
    }

    init() {
        this.triggers.forEach(item => {
            item.addEventListener('click', () => {
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