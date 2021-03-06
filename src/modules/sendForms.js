import { closeAllPopup } from './popups'
import { scrollOff } from './popups';

class Validate {
    constructor({
        selector
    }) {
        this.form = document.querySelector(selector);
        this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
        this.isError = new Set();
    }
    init() {
        this.addEvent();
    }
    showIsError() {
        return this.isError.size;
    }
    addEvent() {
        this.form.addEventListener('submit', () => {
            this.elementsForm.forEach(item => {
                this.checkElements.bind(this, item)();
            });
        });
        this.elementsForm.forEach(item => {
            item.addEventListener('change', () => {
                this.checkElements.bind(this, item)();
            })
        });
    }
    checkElements(item) {
        if (item.name === 'phone') {
            this.checkPhone(item);
        }
        if (item.name === 'name') {
            this.checkName(item);
        }
        if (item.getAttribute('type') === 'checkbox') {
            this.checkCheckBox(item);
        }
    }
    checkPhone(item) {
        if (/^\+?[78]\s([-()\s]*\d){10}$/.test(item.value)) {
            this.showSuccess(item);
        } else {
            this.showError(item);
        }
    }
    
    checkName(item) {
        if (/^[а-яА-ЯЁё]{2,}$/gi.test(item.value)) {
            this.showSuccess(item);
        }
        else {
            this.showError(item);
        }
    }
    checkCheckBox(item) {
        if (item.checked) {
            item.parentElement.children[2].classList.remove('_error-checkbox');
            this.isError.delete(item);
        } else {
            item.parentElement.children[2].classList.add('_error-checkbox');
            this.isError.add(item);
        }
    }
    showError(item) {
        item.classList.add('_error');
        this.isError.add(item);
        const check = item.parentElement.querySelector('._message-error');
        let message;
        if (item.name === 'name') {
            message = 'Длинна минимум 2 символа';
        }
        if (item.name === 'phone') {
            message = 'Введите номер полностью';
        }
        if (check === null) {
            item.parentElement.insertAdjacentHTML('beforeend', `<div class="_message-error ${item.name}">${message}</div`);
        }
    }
    showSuccess(item) {
        const check = item.parentElement.querySelector('._message-error');
        if (check) {
            check.remove();
        }
        item.classList.remove('_error');
        this.isError.delete(item);
    }
}
const sendForms = () => {
    const popupThank = document.querySelector('.popup-thank');
    const popupThankTitle = document.querySelector('.popup-thank__title');
    const popupThankDescr = document.querySelector('.popup-thank__descr');

    let form1, form2, form3, form4, form5, form6;
    let formValidArray = [ form1, form2, form3, form4, form5, form6 ];

    formValidArray = formValidArray.map((item, i) => {
        item = new Validate({
            selector: `#feedback${i + 1}`
        });
        item.init();
        return item;
    });

    function clearInput(form) {
        [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button').forEach(item => {
            item.value = '';
            if (item.type !== 'chackbox'){
                item.checked = false;
            }
        });
    }

    function postData(body) {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    const fetchForm = (form) => {
        const formData = new FormData(form);
            let body = {};
            for (let val of formData.entries()) {
                body[val[0]] = val[1];
            }

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Что то пошло не так')
                    }
                    clearInput(form);
                    openModal('Спасибо за обращение!', 'Ожидайте звонка нашего специалиста. Будем рады помогать Вам!');
                    closeModal();
                })
                .catch(error => {
                    openModal('Сообщение не отправлено!', '')
                    closeModal();
                    console.log(error);
                });
    }

    document.addEventListener('submit', e => {
        e.preventDefault();
        const target = e.target;
        switch (target.id) {
            case 'feedback1':
                if(!formValidArray[0].showIsError()) {
                    fetchForm(target);
                }
                break;
            case 'feedback2':
                if(!formValidArray[1].showIsError()) {
                    fetchForm(target);
                }
                break;
            case 'feedback3':
                if(!formValidArray[2].showIsError()) {
                    fetchForm(target);
                }
                break;
            case 'feedback4':
                if(!formValidArray[3].showIsError()) {
                    fetchForm(target);
                }
                break;
            case 'feedback5':
                if(!formValidArray[4].showIsError()) {
                    fetchForm(target);
                }
                break;
            case 'feedback6':
                if(!formValidArray[5].showIsError()) {
                    fetchForm(target);
                }
                break;
        }
    });

    const closeModal = () => {
        setTimeout(closeAllPopup, 3000);
    };

    const openModal = (message, description) => {
        popupThankTitle.textContent = message;
        popupThankDescr.textContent = description;
        popupThank.classList.add('visible');
        scrollOff();
    };
};

export default sendForms;