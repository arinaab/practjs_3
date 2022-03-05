import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns) {
        super(container, btns);

    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(slide => slide.style.display = 'none');

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    showHanson() {
        // console.log(this.slideIndex);
        if (this.slideIndex === 3) {
            setTimeout( () => {
                document.querySelector('.hanson').style.opacity = '1';
                document.querySelector('.hanson').classList.add('animate__animated', 'animate__slideInUp');
            }, 3000);
        } else {
            document.querySelector('.hanson').style.opacity = '0';
        }
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);

                this.showHanson();
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault(); //т.к.это ссылка
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}