import { menuItems } from "./menuItems.js";

const hoverAudio = [];
for (let i = 0; i < 10; i++) {
    hoverAudio.push(new Audio('src/assets/sounds/hover.mp3'));
}

const selectAudio = [];
for (let i = 0; i < 10; i++) {
    selectAudio.push(new Audio('src/assets/sounds/select.mp3'));
}

const deselectAudio = [];
for (let i = 0; i < 10; i++) {
    deselectAudio.push(new Audio('src/assets/sounds/deselect.mp3'));
}

export function handleAudio(action) {
    if (!menuItems[0].submenu[1].state) {
        return
    }
    let audio;
    switch (action) {
        case 'hover':
            audio = hoverAudio;
            break;
        case 'select':
            audio = selectAudio;
            break;
        case 'deselect':
            audio = deselectAudio;
            break;
    }
    for (let i = 0; i < audio.length; i++) {
        if (!audio[i].paused) {
            continue
        }
        if (i === audio.length - 1) {
            audio[0].currentTime = 0;
            audio[0].play();
            console.log(i);
            return
        }
        audio[i].play();
        return
    }
}
