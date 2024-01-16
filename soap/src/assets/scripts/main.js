import Route from './route.js';

let route = new Route();

const panorama = document.getElementsByClassName('panorama')[0];
const track = document.getElementsByClassName('track')[0];
const view = document.getElementsByClassName('view')[0];
const dashboard = document.getElementsByClassName('dashboard')[0];
const roadMarkings = document.getElementsByClassName('road-markings')[0];
dashboard.style.height = `${Math.ceil((window.innerHeight - view.offsetHeight) / 2)}px`;

window.addEventListener('resize', () => {
    dashboard.style.height = `${Math.ceil((window.innerHeight - view.offsetHeight) / 2)}px`;
})

// ---- BASE MOVEMENT -------------------

let randY = 0;

let drivingAnimation = setInterval(() => {
    randY = Math.random() * .6;
}, 250);


// ---- STEERING -------------------

let driveX = 0;
let driveY = 100;
let direction = 0;
let steeringLeft = false;
let steeringRight = false;

let steerRange = 10;
let steerSensibility = .2;

let steeringInterval = setInterval(() => {
    steer();
    track.style.translate = `-50% ${-50 + (-.3 + randY)}%`;
    track.style.left = `${50 + driveX}%`;
    panorama.style.translate = `-50% ${-50 + (-.3 + randY)}%`;
    panorama.style.objectPosition = `${50 - driveX / 2.2}% bottom`;
}, 10);

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        steeringLeft = true;
    }
    if (e.key === 'ArrowRight') {
        steeringRight = true;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        steeringLeft = false;
    }
    if (e.key === 'ArrowRight') {
        steeringRight = false;
    }
})

function steer() {
    if ((!steeringLeft && !steeringRight) || (steeringLeft && steeringRight)) {
        direction *= .9;
        if (Math.sqrt(Math.pow(direction, 2)) < 0.05) {
            direction = 0;
        }
    }
    else if (steeringLeft) {
        direction = steerSensibility;
    }
    else if (steeringRight) {
        direction = -steerSensibility;
    }
    if (driveX >= steerRange && direction > 0) {
        driveX = steerRange;
        direction = 0;
        return
    }
    if (driveX <= -steerRange && direction < 0) {
        driveX = -steerRange;
        direction = 0;
        return
    }
    driveX += direction;
}

// ---- LANE MARKERS -------------------

const laneMarker = document.getElementsByClassName('lane-marker')[0];

let markerAm = 24;

for (let i = 0; i < markerAm - 1; i++) {
    const marker = document.createElement('span');
    marker.classList.add('marker');
    marker.style.left = `${(i + 1) * (100 / markerAm)}%`;
    laneMarker.appendChild(marker);
}

// ---- SPEEDOMETER -------------------

const speed = document.getElementsByClassName('speed')[0];
let velocity = 26;
let velocityInterval = setInterval(() => {
    let rand = Math.random();
    if (rand < .4 && velocity < 28) {
        ++velocity;
    }
    if (rand > .6 && velocity > 24) {
        --velocity;
    }
    speed.innerHTML = `${velocity}`;
}, 400)

// ---- STEERING INDICATOR -------------------

const stindL = document.getElementsByClassName('stind-left')[0];
const stindR = document.getElementsByClassName('stind-right')[0];
const stinds = document.getElementsByClassName('stind');
let perfLane = 0;
let steerDiff = 0;

const windshield = document.getElementsByClassName('windshield')[0];

let laneInterval, indiInterval;

function calcPerfLane() {
    let randLane = .5;
    if (Math.random() > .7) {
        randLane += 1;
    } else {
        randLane += .5;
    }
    if (Math.random() > .5) {
        randLane = -randLane;
    }
    if (Math.random() > .8) {
        randLane *= 3;
    }
    perfLane += randLane;
    if (perfLane >= steerRange) {
        perfLane = steerRange;
    } else if (perfLane <= -steerRange) {
        perfLane = -steerRange;
    }
}

function updateIndicator() {
    steerDiff = perfLane - driveX;

    if (steerDiff <= 0) {
        steerDiff = Math.sqrt(Math.pow(steerDiff, 2));
        categoriseDiff(steerDiff);
        stindL.style.width = '0%';
        stindL.classList.add('stind-0');
        stindR.classList.remove('stind-0');
        stindR.style.width = `${34 * (steerDiff / 30)}%`;
    } else if (steerDiff >= 0) {
        steerDiff = Math.sqrt(Math.pow(steerDiff, 2));
        categoriseDiff(steerDiff);
        stindR.style.width = '0%';
        stindR.classList.add('stind-0');
        stindL.classList.remove('stind-0');
        stindL.style.width = `${34 * (steerDiff / 30)}%`;
    }

}

function categoriseDiff(diff) {

    if (diff < 2) {
        for (let i = 0; i < stinds.length; i++) {
            stinds[i].classList.remove('stind-good', 'stind-ok', 'stind-bad');
            stinds[i].classList.add('stind-perfect');
        }
        windshield.classList.remove('danger-1', 'danger-2');
        return
    }
    else if (diff < 10) {
        for (let i = 0; i < stinds.length; i++) {
            stinds[i].classList.remove('stind-perfect', 'stind-ok', 'stind-bad');
            stinds[i].classList.add('stind-good');
        }
        windshield.classList.remove('danger-1', 'danger-2');
        return
    } else if (diff < 18) {
        for (let i = 0; i < stinds.length; i++) {
            stinds[i].classList.remove('stind-perfect', 'stind-good', 'stind-bad');
            stinds[i].classList.add('stind-ok');
        }
        windshield.classList.remove('danger-2');
        windshield.classList.add('danger-1');
        return
    }
    for (let i = 0; i < stinds.length; i++) {
        stinds[i].classList.remove('stind-perfect', 'stind-good', 'stind-ok');
        stinds[i].classList.add('stind-bad');
    }
    windshield.classList.remove('danger-1');
    windshield.classList.add('danger-2');
}

export function laneAssistant(run) {
    if (run) {
        document.getElementsByClassName('lane-marker')[0].classList.add('lane-visible');
        perfLane = 0;
        steerDiff = 0;
        laneInterval = setInterval(calcPerfLane, 500);
        indiInterval = setInterval(updateIndicator, 100);
    } else {
        document.getElementsByClassName('lane-marker')[0].classList.remove('lane-visible');
        clearInterval(laneInterval);
        clearInterval(indiInterval);
        windshield.classList.remove('danger-1', 'danger-2');
    }
}

// ---- CURSOR -------------------

const cursor = document.getElementsByClassName('cursor')[0];
let cursorRelPos = {
    x: 50,
    y: 50
}
let xDown = false;
let xUp = false;
let yLeft = false;
let yRight = false;

const cursorSpeed = 2;
let checkPos = 0;

// window.addEventListener('keydown', (e) => {
//     if (e.key === 'w') {
//         xUp = true;
//     }
//     if (e.key === 's') {
//         xDown = true;
//     }
//     if (e.key === 'a') {
//         yLeft = true;
//     }
//     if (e.key === 'd') {
//         yRight = true;
//     }
// })

// window.addEventListener('keyup', (e) => {
//     if (e.key === 'w') {
//         xUp = false;
//     }
//     if (e.key === 's') {
//         xDown = false;
//     }
//     if (e.key === 'a') {
//         yLeft = false;
//     }
//     if (e.key === 'd') {
//         yRight = false;
//     }
// })

function moveCursor() {
    if (xUp) {
        checkPos = cursorRelPos.x - (16 * cursorSpeed / 9);
        cursorRelPos.x = checkPos > 0 ? checkPos : 0;
    }
    if (xDown) {
        checkPos = cursorRelPos.x + (16 * cursorSpeed / 9);
        cursorRelPos.x = checkPos < 100 ? checkPos : 100;
    }
    if (yLeft) {
        checkPos = cursorRelPos.y - cursorSpeed;
        cursorRelPos.y = checkPos > 0 ? checkPos : 0;
    }
    if (yRight) {
        checkPos = cursorRelPos.y + cursorSpeed;
        cursorRelPos.y = checkPos < 100 ? checkPos : 100;
    }
    cursor.style.top = `${cursorRelPos.x}%`;
    cursor.style.left = `${cursorRelPos.y}%`;
}

// ---- MENU POINTS -------------------

import { menuItems } from './menuItems.js';
import { handleAudio } from './audio.js';

menuItems[1].doAction = laneAssistant;

export let currentMenu = 0;
export let currentSub = 0;
let spaceDown = false;

// -- menu navigation
menuItems[currentMenu].div.classList.add('hovered');

window.addEventListener('keydown', (e) => {
    if (spaceDown) {
        return
    }
    if (e.key === 'w' && menuItems[currentMenu].submenu.length > 0 && currentSub < menuItems[currentMenu].submenu.length && menuItems[currentMenu].div.classList.contains('active')) {
        selectSubMenu(1);
    }
    if (e.key === 's' && menuItems[currentMenu].submenu.length > 0 && currentSub > 0 && menuItems[currentMenu].div.classList.contains('active')) {
        selectSubMenu(-1);
    }
    if (e.key === 'a' && currentMenu > 0 && currentSub === 0 && menuItems[0].submenu[0].state) {
        selectMenuItem(-1);
    }
    if (e.key === 'd' && currentMenu < menuItems.length - 1 && currentSub === 0 && menuItems[0].submenu[0].state) {
        selectMenuItem(1);
    }
})

function selectMenuItem(change) {
    handleAudio('hover');
    menuItems[currentMenu].div.classList.remove('hovered');
    currentMenu += change;
    menuItems[currentMenu].div.classList.add('hovered');
}

function selectSubMenu(change) {
    menuItems[currentMenu].div.classList.remove('hovered');
    handleAudio('hover');
    if (currentSub > 0) {
        menuItems[currentMenu].submenu[currentSub - 1].div.classList.remove('sub-hover');
    }
    currentSub += change;
    if (currentSub > 0) {
        menuItems[currentMenu].submenu[currentSub - 1].div.classList.add('sub-hover');
    }
    if (currentSub === 0) {
        menuItems[currentMenu].div.classList.add('hovered');
    }
}

// let cursorPos = {
//     x: 0,
//     y: 0
// }

// function checkHover() {
//     cursorPos.x = cursor.getBoundingClientRect().left + cursor.offsetWidth / 2;
//     cursorPos.y = cursor.getBoundingClientRect().top + cursor.offsetHeight / 2;

//     for (let i = 0; i < menuItems.length; i++) {
//         let xHover = (cursorPos.x >= menuItems[i].startX && cursorPos.x <= menuItems[i].endX);
//         let yHover = (cursorPos.y >= menuItems[i].startY && cursorPos.y <= menuItems[i].endY);

//         if (xHover && yHover) {
//             menuItems[i].div.classList.add('hovered');
//             menuItems[i].hovered = true;
//         } else {
//             menuItems[i].div.classList.remove('hovered');
//             menuItems[i].hovered = false;
//         }
//     }
// }

window.addEventListener('keydown', (e) => {
    if (e.key != ' ') {
        return
    }
    spaceDown = true;
    if (currentSub === 0) {
        menuItems[currentMenu].div.classList.add('click');
    }
    if (currentSub > 0) {
        menuItems[currentMenu].submenu[currentSub - 1].div.classList.add('sub-click');
    }
})

window.addEventListener('keyup', (e) => {
    if (e.key != ' ') {
        return
    }
    spaceDown = false;
    if (currentSub === 0) {
        menuItems[currentMenu].div.classList.remove('click');
        if (!menuItems[currentMenu].clicked) {
            menuItems[currentMenu].clicked = true;
            menuItems[currentMenu].doAction(true);
            handleAudio('select');
            menuItems[currentMenu].div.classList.add('active');
        } else {
            menuItems[currentMenu].clicked = false;
            menuItems[currentMenu].doAction(false);
            menuItems[currentMenu].div.classList.remove('active');
            handleAudio('deselect');
        }
    }
    if (currentSub > 0) {
        menuItems[currentMenu].submenu[currentSub - 1].div.classList.remove('sub-click');
        menuItems[currentMenu].submenu[currentSub - 1].state = !menuItems[currentMenu].submenu[currentSub - 1].state;
        menuItems[currentMenu].submenu[currentSub - 1].div.classList.toggle('sub-off');
        if (!menuItems[currentMenu].submenu[currentSub - 1].state) {
            handleAudio('deselect');
        } else {
            handleAudio('select');
        }
    }
    if (currentSub === 1) {
        view.classList.toggle('view-off');
    }
    if (currentSub === 1 && !menuItems[currentMenu].submenu[currentSub - 1].state) {
        laneAssistant(false);
    }
    if (currentSub === 1 && menuItems[currentMenu].submenu[currentSub - 1].state && menuItems[1].clicked) {
        laneAssistant(true);
    }
})