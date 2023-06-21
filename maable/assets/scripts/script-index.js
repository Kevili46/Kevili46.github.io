// variables for sphere movement relative to scroll progress ------------
const sphereCont = document.getElementsByClassName('sphere-container')[0];
const sphereShadow = document.getElementById('m-shadow');
const sphereBody = document.getElementById('m-sphere');
const missionHeading = document.getElementsByClassName('mission')[0];
let sphereMotionFrame = 0;
let sphereOffset = 0;
let sphereMvmtStart = 0;


// ------------ EventListener for window ------------ 

window.addEventListener('load', () => {
    sphereMvmtStart = sphereCont.getBoundingClientRect().top + window.pageYOffset - (missionHeading.offsetHeight * 1.2);
    rollSphereAway();
});

window.addEventListener('resize', () => {
    sphereMvmtStart = sphereCont.getBoundingClientRect().top + window.pageYOffset - (missionHeading.offsetHeight * 1.2);
    rollSphereAway();
});

window.addEventListener('scroll', () => {
    rollSphereAway();
});


// ------------ EventListener for Scroll Down Button ------------ 

const scrollBtn = document.getElementById('scroll-down-btn');

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: scrollBtn.getBoundingClientRect().top + (scrollBtn.offsetHeight / 2) + window.scrollY,
        left: 0,
        behavior: 'smooth'
    });
});

// ------------ EventListener for strength images video playback ------------ 

// variables for play video on hover ------------
const strengthVids = document.getElementsByClassName('m-qualities')[0].getElementsByTagName('video');
const strengthsPlayBtn = document.getElementsByClassName('play-link');

for (let i = 0; i < strengthVids.length; i++) {
    strengthsPlayBtn[i].addEventListener('click', () => {
        let strengthVid = strengthVids[i];
        strengthVid.play();
        strengthVid.addEventListener('ended', () => {
        });
    });
}

// ------------ Focus and Blur before CTA ------------ 

// variables for blur on focus hover

const focusElement = document.getElementsByClassName('focus-hover')[0];
const blurElements = document.getElementsByClassName('unfocus');
const underlineElement = document.getElementsByClassName('highlight-word')[0];
const headlineFocus = document.getElementsByClassName('btn-followed')[0];

focusElement.addEventListener('mouseenter', () => {
    for (let i = 0; i < blurElements.length; i++) {
        blurElements[i].classList.toggle('blurry');
    }
    focusElement.classList.toggle('focus-on');
    underlineElement.classList.toggle('underline');
});
focusElement.addEventListener('mouseleave', () => {
    for (let i = 0; i < blurElements.length; i++) {
        blurElements[i].classList.toggle('blurry');
    }
    focusElement.classList.toggle('focus-on');
    underlineElement.classList.toggle('underline');
});

// --------------- FUNCTIONS --------------------

function rollSphereAway() {
    sphereMotionFrame = -(-window.pageYOffset + sphereMvmtStart) / (sphereCont.offsetHeight / 1.2);
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
    } else if (window.pageYOffset >= sphereMvmtStart && !sphereCont.classList.contains('roll-start')) {
        sphereCont.classList.add('roll-start');
    }
}