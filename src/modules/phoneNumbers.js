const phoneNumbers = () => {
    const headerContactsArrow = document.querySelector('.header-contacts__arrow');
    const headerContactsPhoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord');
    const reverseArrow = () => headerContactsArrow.children[0].classList.toggle('header-contacts__arrow_active');
    const togglePhoneNumber = () => {
        headerContactsPhoneNumberAccord.classList.toggle('header-contacts__phone-number-accord_active');
    };
    headerContactsArrow.addEventListener('click', () => {
        reverseArrow();
        togglePhoneNumber();
    });
};

export default phoneNumbers;

