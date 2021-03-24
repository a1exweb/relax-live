import Slider from './slider';

const ourPartners = () => {
    const slider = new Slider({
        main: '#partners-wrapper',
        wrapp: '.partners-slider',
        prev: '#partners-arrow_left',
        next: '#partners-arrow_right',
        loop: true,
        activeSlide: true,
        slidesToShow: 3,
        responsive: [{
                breackpoint: 9024,
                slidesToShow: 3
            },
            {
                breackpoint: 768,
                slidesToShow: 1
            },
        ]
    })
    slider.init();
}

export default ourPartners;