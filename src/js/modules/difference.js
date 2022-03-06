export default class Different {
    constructor(officer, cards) {
        this.officer = document.querySelector(officer);
        try {this.cards = this.officer.querySelectorAll(cards);} catch (error) {}
        this.counter = 0;
    }

    hideCards() {
        try {
            this.cards.forEach((card, i) => {
                if (i !== this.cards.length - 1) {
                    card.style.display = 'none';
                }
            });
        } catch (error) {}
    }

    showCard() {
        try {
            this.officer.querySelector('.plus').addEventListener('click', (e) => {
                this.counter++;
                // console.log(this.counter);
                if (this.counter == this.cards.length - 1) {
                    this.cards[this.cards.length - 1].remove(); //удаляем карточку с плюсом
                }
                this.cards[this.counter - 1].classList.add('animate__animated', 'animate__fadeInUp');
                this.cards[this.counter - 1].style.display = 'flex'; //добавляем карточки по порядку в соотв.с counter
            });
        } catch (error) {}
    }

    init() {
        // console.log(this.cards, this.plus);
        this.hideCards();
        this.showCard();
    }
}