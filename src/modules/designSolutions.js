'use strict'
import { Carousel } from './problems';
import { scrollOff } from './popups';

const designSolutions = () => {
    const designs = document.getElementById('designs');
    const designsNavItem = document.querySelectorAll('.designs-nav__item_base');
    const designsSliderItem = document.querySelectorAll('.designs-slider-item');
    const previewBlock = document.querySelectorAll('.preview-block');
    const sliderCurrent = document.getElementById('slider-counter-responsive-current');
    const sliderTotal = document.getElementById('slider-counter-responsive-total');
    const popup = document.querySelector('.popup-design');
    const designsNavItemPopup = document.querySelectorAll('.designs-nav__item_popup');
    const popupDesignsSliderItem = document.querySelectorAll('.popup-designs-slider__item');
    const popupDesignText = document.querySelectorAll('.popup-design-text');
    const popupDesignsCounterCurrent = document.getElementById('popup-designs-counter-current');
    const popupDesignsCounterTotal = document.getElementById('popup-designs-counter-total');

    const setDefaultCounter = (total, current = 1) => {
        sliderTotal.textContent = total;
        sliderCurrent.textContent = current;
    }
    const setDefaultCounterPopup = (total, current = 1) => {
        popupDesignsCounterCurrent.textContent = current;
        popupDesignsCounterTotal.textContent = total;
    }

    const addActive = (arr, i, className) => {
        arr.forEach((item, ind) => {
            item.classList.remove(className);
            if (ind === i) {
                item.classList.add(className);
            }
        });
    };

    const showSliderItem = (i = 0) => {
        const slider = document.querySelector('.designs-slider-item_active').children;
        addActive([...slider], i, 'designs-slide-active');
    };

    const showSliderItemPopup = (i = 0) => {
        const slider = document.querySelector('.popup-designs-slider__item_active').children;
        addActive([...slider], i, 'designs-slide-active');
        setDefaultCounterPopup(slider.length);
    };

    const defaultActiveClassForPreview = () => {
        previewBlock.forEach(item => {
            [...item.children].forEach((elem, i) => {
                elem.children[0].classList.remove('preview_active');
                if (i === 0) {
                    elem.children[0].classList.add('preview_active');
                }
            });
        });
    };

    const tabChange = ( callBack, target, buttons, ActiveClass, sliders, activeClassForSliders, previews, activeClassPreview, objForText) => {
        buttons.forEach((item, i) => {
            item.classList.remove(ActiveClass);
            if (target === item) {
                indexActivePreview = i;
                item.classList.add(ActiveClass);
                if (sliders){
                    addActive(sliders, i, activeClassForSliders);
                }
                if (previews){
                    addActive(previews, i, activeClassPreview);
                }
                callBack();
                if (previews){
                    defaultActiveClassForPreview();
                }
                setDefaultCounter(sliders[i].children.length);
                setDefaultCounterPopup(sliders[i].children.length);
                if (objForText){
                    addActive(objForText.popupDesignText, i, 'visible-content-block');
                }
            }
        });
    }

    popup.addEventListener('click', e => {
        const target = e.target;

        if (target.tagName === 'BUTTON') {
            tabChange(showSliderItemPopup, target, designsNavItemPopup, 'active', popupDesignsSliderItem, 'popup-designs-slider__item_active', null, null, {
                popupDesignText,
                active: 'visible-content-block'
            });
        }

        if(target.closest('.popup-arrow_right')){
            const arraySlides = popup.querySelector('.popup-designs-slider__item_active').children;
            let count;
            [...arraySlides].forEach((item, i) => {
                if (item.classList.contains('designs-slide-active')){
                    count = i;
                }
            });
            ++count;
            if (count > arraySlides.length - 1) {
                count = 0;
            }

            [...arraySlides].forEach((item, i) => {
                item.classList.remove('designs-slide-active');
                if (i === count){
                    item.classList.add('designs-slide-active');
                }
            });
            setDefaultCounterPopup(arraySlides.length, count + 1);
        }

        if(target.closest('.popup-arrow_left')){
            const arraySlides = popup.querySelector('.popup-designs-slider__item_active').children;
            let count;
            [...arraySlides].forEach((item, i) => {
                if (item.classList.contains('designs-slide-active')) {
                    count = i;
                }
            });
            --count;
            if (count < 0 ){
                count = arraySlides.length - 1;
            }

            [...arraySlides].forEach((item, i) => {
                item.classList.remove('designs-slide-active');
                if (i === count){
                    item.classList.add('designs-slide-active');
                }
            });
            setDefaultCounterPopup(arraySlides.length, count + 1);
        }
    });

    let indexActivePreview = 0;
    designs.addEventListener('click', e => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            tabChange(showSliderItem, target, designsNavItem, 'active', designsSliderItem, 'designs-slider-item_active', previewBlock, 'visible', );
        }
        if (target.closest('.preview-block__item')) {
            const previewItems = target.parentElement.parentElement.children;
            [...previewItems].forEach((item, i) => {
                if (item === target.parentElement) {
                    showSliderItem(i);
                    setDefaultCounter(previewItems.length, i + 1);
                }
            });
            [...previewItems].forEach(item => {
                item.children[0].classList.remove('preview_active');
                if (item.children[0] === target) {
                    item.children[0].classList.add('preview_active');
                }
            });
        }
        if (target.closest('.slider-arrow-tablet-mobile_right')) {
            const arraySlides = designs.querySelector('.designs-slider-item_active').children;
            let count;
            [...arraySlides].forEach((item, i) => {
                if (item.classList.contains('designs-slide-active')) {
                    count = i;
                }
            });
            ++count;
            if (count > arraySlides.length - 1) {
                count = 0;
            }

            [...arraySlides].forEach((item, i) => {
                item.classList.remove('designs-slide-active');
                if (i === count) {
                    item.classList.add('designs-slide-active');
                }
            });

            [...previewBlock[indexActivePreview].children].forEach((item, i) => {
                item.children[0].classList.remove('preview_active');
                if (i === count){
                    item.children[0].classList.add('preview_active');
                }
            });
            setDefaultCounter(arraySlides.length, count + 1);
        }

        if (target.closest('.slider-arrow-tablet-mobile_left')){
            const arraySlides = designs.querySelector('.designs-slider-item_active').children;
            let count;
            [...arraySlides].forEach((item, i) => {
                if (item.classList.contains('designs-slide-active')) {
                    count = i;
                }
            });
            --count;
            if (count < 0 ) {
                count = arraySlides.length - 1;
            };

            [...arraySlides].forEach((item, i) => {
                item.classList.remove('designs-slide-active');
                if (i === count) {
                    item.classList.add('designs-slide-active');
                }
            });

            [...previewBlock[indexActivePreview].children].forEach((item, i) => {
                item.children[0].classList.remove('preview_active');
                if (i === count){
                    item.children[0].classList.add('preview_active');
                }
            })
            setDefaultCounter(arraySlides.length, count + 1);
        }

        if (target.matches('.link-list-designs a')) {
            popup.classList.add('visible');
            addActive(popupDesignsSliderItem, 0, 'popup-designs-slider__item_active');
            showSliderItemPopup(0);
            scrollOff();
        }
    });
    addActive(designsSliderItem, 0, 'designs-slider-item_active');
    addActive(previewBlock, 0, 'visible');
    showSliderItem(0);

    const includeSlider = () => {
        let carousel = new Carousel({
            wrap: '.nav-designs',
            slider: '.nav-list-designs',
            activClass: 'test',
            classForSlider: 'carousel-slider',
            classForWrapper: 'carousel-slider-wrapper',
            classForSlide: 'carousel-slider-button',
            slidesToShow: 1,
            prev: '#nav-arrow-designs_left',
            next: '#nav-arrow-designs_right',
        })
        if (innerWidth < 1135) {
            carousel.init();
        } else {
            carousel.destroy();
        }
    };

    const includSliderPopup = () => {
        let carousel = new Carousel({
            wrap: '#nav-designs-popup',
            slider: '#nav-list-popup-designs',
            activClass: 'test',
            classForSlider: 'carousel-slider',
            classForWrapper: 'carousel-slider-wrapper',
            classForSlide: 'carousel-slider-button',
            slidesToShow: 1,
            prev: '#nav-arrow-popup-designs_left',
            next: '#nav-arrow-popup-designs_right',
        })
        if (innerWidth < 1135) {
            carousel.init();
        } else {
            carousel.destroy();
        }
    }

    window.addEventListener('resize', () => {
        includeSlider();
        includSliderPopup();
    })

    includeSlider();
    includSliderPopup();
}

export default designSolutions;