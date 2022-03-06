import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        this.paused = false;
    }

    decorizeSlides() {
        this.slides.forEach(slide => {

            for (let i = 0; i < this.slides.length; i++) {
                if (slide.tagName == 'BUTTON') { //т.к. в верстке изначально кнопки входят в контейнер слайдера
                    continue;
                }
                slide.classList.remove(this.activeClass);
                if (this.animate) {
                    slide.querySelector('.card__title').style.opacity = '0.4';
                    slide.querySelector('.card__controls-arrow').style.opacity = '0';
                }
            }
        });

        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[0].tagName == 'BUTTON') {
                continue;
            }
            this.slides[0].classList.add(this.activeClass);
            if (this.animate ) {
                this.slides[0].querySelector('.card__title').style.opacity = '1';
                this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
            }
        }
        
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            this.container.prepend(this.slides[this.slides.length - 1]);
            this.decorizeSlides();
        });
    }

    nextSlide() {
        this.container.append(this.slides[0]);
        this.decorizeSlides();
    }

    addAutoplay() {
        this.paused = setInterval(() => this.nextSlide(), 5000);
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();
        
        if (this.autoplay) {
            this.container.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            });

            this.container.addEventListener('mouseleave', () => {
                this.addAutoplay();
            });

            this.addAutoplay();
        }
    }
}