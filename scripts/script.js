const header = document.getElementsByTagName('header')[0];
const sphereCont = document.getElementsByClassName('sphere-container')[0];

const deviceInteract = 'click';


//variables for handling scroll direction
let lastScrollTop = 0;
let scrollDown = false;

// variables for sphere movement realtive to scroll progress ------------
const sphereShadow = document.getElementById('m-shadow');
const sphereBody = document.getElementById('m-sphere');
let sphereMotionFrame = 0;
let sphereOffset = 0;
let sphereMvmtStart = 0;

// variables for play video on hover ------------
const strengths = document.getElementsByClassName('strength-img');
const strengthsVis = document.getElementsByClassName('play-link');

// ------------ EventListener for window ------------ 

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    sphereMvmtStart = sphereCont.getBoundingClientRect().top + window.pageYOffset - (sphereCont.offsetHeight / 1.2);
    rollSphereAway();

});

window.addEventListener('touchstart', () => {
    deviceInteract = 'touchend';
});

window.addEventListener('resize', () => {
    sphereMvmtStart = sphereCont.getBoundingClientRect().top + window.pageYOffset - (sphereCont.offsetHeight / 1.2);
    rollSphereAway();
});

window.addEventListener('scroll', () => {
    checkScroll();
    rollSphereAway();
});

// ------------ EventListener for strength images ------------ 

for (let i = 0; i < strengths.length; i++) {
    strengthsVis[i].addEventListener(deviceInteract, () => {
        if (!strengths[i].classList.contains('play')) {
            strengths[i].classList.add('play');
            strengthVid = strengths[i].getElementsByTagName('video')[0];
            strengthVid.play();
            strengthVid.addEventListener('ended', () => {
                strengths[i].classList.remove('play');
            });
        }
    });
}

// --------------- FUNCTIONS --------------------

function checkScroll() {
    checkScrollDown();
    makeHeaderFloating();
}

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

function rollSphereAway() {
    sphereMotionFrame = -(-window.pageYOffset + sphereMvmtStart) / sphereCont.offsetHeight;
    if (sphereMotionFrame > 0 && sphereMotionFrame <= 1) {
        sphereShadow.setAttribute('style', `transform: translateX(${-100 * (sphereMotionFrame) ** 1.5}svw);`);
        sphereBody.setAttribute('style', `transform: translateX(${-100 * (sphereMotionFrame) ** 1.5}svw);`);
    }
    if (sphereMotionFrame > 1) {
        sphereShadow.setAttribute('style', 'transform: translateX(-100svw);');
        sphereBody.setAttribute('style', 'transform: translateX(-100svw);');
    }
    if (window.pageYOffset < 1 || sphereMotionFrame < 0) {
        sphereShadow.removeAttribute('style');
        sphereBody.removeAttribute('style');
    }

    if (sphereMotionFrame >= .2 && !sphereCont.classList.contains('rolling')) {
        sphereCont.classList.add('rolling');
    } else if (sphereMotionFrame < 0 && sphereCont.classList.contains('rolling')) {
        sphereCont.classList.remove('rolling');
    }

    if (window.pageYOffset < 1 && sphereCont.classList.contains('roll-start')) {
        sphereCont.classList.remove('roll-start');
    } else if (window.pageYOffset >= sphereCont.getBoundingClientRect().top / 5 && !sphereCont.classList.contains('roll-away')) {
        sphereCont.classList.add('roll-start');
    }
}

