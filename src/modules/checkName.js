const checkName = () => {
    const yourName = document.querySelectorAll('.feedback-block__form-input_name');
    const check = (e) => {
        const target = e.target;
        target.value = target.value.replace(/[^а-я-ё\-\s]/ig, '');
    };
    yourName.forEach((item) => {
        item.addEventListener('input', check);
        item.addEventListener('blur', (e) => {
            const target = e.target;
            target.value = target.value.replace(/ +/g, ' ').trim();
            target.value = target.value.replace(/([А-ЯЁ])/g, x => x.toLowerCase());
            target.value = target.value.replace(/(( |^)[а-яё])(?=[а-яё])/g, x => x.toUpperCase());
        });
    });
};

export default checkName;