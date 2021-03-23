const scrollMenu = () => {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        console.log(window);
        if (window.scrollY > 10) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    });
};

export default scrollMenu;