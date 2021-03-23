import { Carousel } from './problems';

const servicesSlider = () => {
    const carousel = new Carousel({
        wrap: '.services-slider',
        slider: '.services-slider-wrap',
        activClass: 'test',
        classForSlider: 'carousel-slider',
        slidesToShow: 1,
        prev: '#services-arrow_left',
        next: '#services-arrow_right',
    });
    carousel.init();
};
servicesSlider();
window.addEventListener('resize', servicesSlider);

export default servicesSlider;