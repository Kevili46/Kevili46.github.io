//variables for handling scroll direction
let lastScrollTop = 0;
let scrollDown = false;

const header = document.querySelector('header');

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    if (window.innerWidth >= 768) {
        header.classList.remove('mobile-header');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
        header.classList.remove('mobile-header');
        menuCont.classList.remove('opened');
        maskShape.classList.remove('filter-html');
        document.body.classList.remove('no-scroll');
    }
    if (window.innerWidth < 769) {
        header.classList.add('mobile-header');
    }
});

window.addEventListener('scroll', () => {
    checkScrollDown();
    makeHeaderFloating();
});

// ------------ EventListener for Mobile Header ------------ 

const burgerMenu = document.getElementById('burger-menu');
const maskShape = document.getElementsByClassName('mask-html')[0];
const menuCont = document.getElementsByClassName('logo-and-menu')[0];
burgerMenu.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
    maskShape.classList.toggle('filter-html');
    menuCont.classList.toggle('opened');
})

maskShape.addEventListener('click', () => {
    document.body.classList.toggle('no-scroll');
    maskShape.classList.toggle('filter-html');
    menuCont.classList.toggle('opened');
});

// --------------- FUNCTIONS --------------------

function checkScrollDown() {
    if (window.pageYOffset > lastScrollTop) {
        scrollDown = true;
    } else if (window.pageYOffset <= lastScrollTop && window.pageYOffset + window.innerHeight < document.body.offsetHeight) {
        scrollDown = false;
    } else {
        scrollDown = true;
    }
    lastScrollTop = window.pageYOffset;
}

function makeHeaderFloating() {
    if (window.pageYOffset > 64 && !header.classList.contains('floating-h')) {
        header.classList.add('floating-h');
    }
    if (window.pageYOffset === 0 && header.classList.contains('floating-h')) {
        header.classList.remove('floating-h');
        header.removeAttribute('style');
    }

    // only show while scrolling up
    if (header.classList.contains('floating-h') && scrollDown) {
        header.setAttribute('style', 'top: -64px; box-shadow: none');
    } else if (header.classList.contains('floating-h') && !scrollDown) {
        header.setAttribute('style', 'top: 0px');
    }
}