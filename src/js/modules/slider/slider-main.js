import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns, nextModule, prevModule) {
        super(container, btns, nextModule, prevModule);

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
        try {
            if (this.slideIndex === 3) {
                try{ setTimeout( () => {
                    document.querySelector('.hanson').style.opacity = '1';
                    document.querySelector('.hanson').classList.add('animate__animated', 'animate__slideInUp');
                }, 3000); } catch(e){}
            } else {
                document.querySelector('.hanson').style.opacity = '0';
            }
        } catch (error) {}
    }

    bindTriggers() {
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

        this.prevModule.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); //чтобы не происходило всплытия на блок с классом next,т.к. на нем уже есть соб
                e.preventDefault(); //т.к. это ссылка
                this.plusSlides(-1);
            });
        });

        this.nextModule.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        if (this.container) {
            this.bindTriggers();
    
            this.showSlides(this.slideIndex);
        }
    }
}