import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Different from './modules/difference';
import Form from './modules/form';
import Accordion from './modules/accordion';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({
        container: '.moduleapp', 
        btns: '.next',
        nextModule: '.nextmodule',
        prevModule: '.prevmodule'}).render();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider', 
        next: '.showup__next', 
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true}).init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider', 
        next: '.feed__slider .slick-next', 
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'}).init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider', 
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'feed__item-active',
        animate: true,
        autoplay: true}).init();

    new Different('.officerold', '.officer__card-item').init();
    new Different('.officernew', '.officer__card-item').init();

    new Form().init();

    new Accordion('.module__info-show .plus', '.msg').init();
});