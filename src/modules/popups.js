export const closeAllPopup = () => {
    const popup = document.querySelectorAll('.popup')
    popup.forEach(item => {
        item.classList.remove('visible')
    })
    scrollOn();
}

export const scrollOff = () => {
    document.body.style.overflowY = 'hidden';
}
export const scrollOn = () => {
    document.body.style.overflowY = 'auto';
}

const headerMenu = () => {
    const popupDialogMenu = document.querySelector('.popup-dialog-menu');
    const popupRepairTypes = document.querySelector('.popup-repair-types');

    const toggleMenu = () => {
        popupDialogMenu.parentElement.classList.toggle('visible');
        popupDialogMenu.classList.toggle('popup-dialog-menu_active');
    };

    const openPopupRepairTypes = () => {
        popupRepairTypes.classList.add('visible');
    };

    document.addEventListener('click', e => {
        const target = e.target;
        const buttonsRepairTypes = document.querySelectorAll('.nav-popup-repair-types .button_o');
        const buttonsDesigns = document.querySelectorAll('#nav-list-popup-designs .button_o');
        const mobileRows = document.querySelectorAll('.popup-repair-types-content-table-wrap .mobile-row');
        const popupPrivacy = document.querySelector('.popup-privacy');

        const closePopupButtons = () => {
            buttonsRepairTypes.forEach(item => {
                item.style.visibility = `hidden`;
            });
            buttonsDesigns.forEach(item => {
                const svg = item.querySelector('svg');
                svg.style.display = `none`;
                item.style.visibility = `hidden`;
            });
            mobileRows.forEach(item => item.style.display = `none`);
        }

        const popupPrivacyConsultationClose = () => {
            closePopupButtons();
            popupPrivacy.classList.remove('popup-privacy_consultation');
            popupPrivacy.classList.remove('visible');
        }

        if (target.closest('.close-menu')) {
            toggleMenu();
            scrollOn();
        }
        if (target.closest('.menu__icon')) {
            toggleMenu();
            scrollOff();
        }
        if (target.matches('.link-list, .link-list a')) {
            buttonsRepairTypes.forEach(item => {
                item.style.visibility = `visible`;
            });
            mobileRows.forEach(item => item.style.display = `block`);
        }
        if (target.closest('.popup-menu-nav__item')) {
            e.preventDefault();
            scrollOn();
            const scrollHeight = document.getElementById(target.href.split('#')[1]).offsetTop;
            toggleMenu();
            window.scrollTo({top: scrollHeight, behavior: 'smooth'});
        }
        if (target.matches('.link-list-designs a')) {
            buttonsDesigns.forEach(item => {
                const svg = item.querySelector('svg');
                svg.style.display = `block`;
                item.style.visibility = `visible`;
            });
            mobileRows.forEach(item => item.style.display = `block`);
        }
        if (target.closest('.button-footer')) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
        if (target.parentElement.matches('.link-list-repair')) {
            openPopupRepairTypes();
            scrollOff();
        }
        if (target.parentElement.matches('.link-list-menu')) {
            e.preventDefault();
            toggleMenu();
            openPopupRepairTypes();
            scrollOff();
        }
        if (target.matches('.link-privacy') && !target.matches('.link-privacy_consultation')) {
            popupPrivacy.classList.add('visible');
            scrollOff();
        }

        if (target.matches('.link-privacy_consultation')) {
            popupPrivacy.classList.add('visible');
            popupPrivacy.classList.add('popup-privacy_consultation');
            scrollOff();
        }

        if (target.closest('.close') && !target.parentElement.closest('.popup-privacy_consultation')) {
            closePopupButtons();
            closeAllPopup();
        }
        if (target.closest('.close') && target.parentElement.closest('.popup-privacy_consultation')) {
            popupPrivacyConsultationClose();
        }
        if (target.parentElement.closest('.popup-privacy')) {
            const popup = document.querySelectorAll('.popup-privacy')
            popup.forEach(item => {
                item.classList.remove('visible')
            })
        }
        if (target.classList.contains('popup') && !target.classList.contains('popup-privacy_consultation')){
            closePopupButtons();
            closeAllPopup();
            popupDialogMenu.classList.remove('popup-dialog-menu_active');
        }
        if (target.classList.contains('popup') && target.classList.contains('popup-privacy_consultation')) {
            popupPrivacyConsultationClose();
        }
    });
};

export default headerMenu;