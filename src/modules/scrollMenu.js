const scrollMenu = () => {
    const header = document.querySelector('.header');
    const checkResponseHeighHeader = () => {
        if (innerWidth > 575) {
            header.style.height = `120px`;
        } else {
            header.style.height = `80px`;
        }
    }
    checkResponseHeighHeader();
    window.addEventListener('resize', checkResponseHeighHeader);
    window.addEventListener('scroll', () => {
        const wrapperMiddle = document.querySelector('.wrapper_middle');
        let headerHeight = header.style.height;
        if (window.scrollY > 10) {
            header.classList.add('header_active');
            wrapperMiddle.style.cssText = `padding-top: ${headerHeight};`;
        } else {
            header.classList.remove('header_active');
            wrapperMiddle.style.cssText = `padding-top: unset;`;
        }
    });

};

export default scrollMenu;