export const menuItems = [];

const settingsDiv = document.getElementsByClassName('settings')[0];
const settings = {
    div: settingsDiv,
    startX: settingsDiv.getBoundingClientRect().left,
    startY: settingsDiv.getBoundingClientRect().top,
    endX: settingsDiv.getBoundingClientRect().right,
    endY: settingsDiv.getBoundingClientRect().bottom,
    submenu: [],
    hovered: false,
    clicked: false,
    doAction: function (run) {
        if (run) {
        } else {
        }
    }
}

const subSoundDiv = document.getElementsByClassName('sounds')[0];
const subSound = {
    div: subSoundDiv,
    state: true
}


const subGuiDiv = document.getElementsByClassName('gui')[0];
const subGui = {
    div: subGuiDiv,
    state: true
}

settings.submenu.push(subGui, subSound);


const assistantsDiv = document.getElementsByClassName('assistants')[0];
const assistants = {
    div: assistantsDiv,
    startX: assistantsDiv.getBoundingClientRect().left,
    startY: assistantsDiv.getBoundingClientRect().top,
    endX: assistantsDiv.getBoundingClientRect().right,
    endY: assistantsDiv.getBoundingClientRect().bottom,
    submenu: [],
    hovered: false,
    clicked: false,
    doAction: function () { }
}

const mapDiv = document.getElementsByClassName('map')[0];
const map = {
    div: mapDiv,
    startX: mapDiv.getBoundingClientRect().left,
    startY: mapDiv.getBoundingClientRect().top,
    endX: mapDiv.getBoundingClientRect().right,
    endY: mapDiv.getBoundingClientRect().bottom,
    submenu: [],
    hovered: false,
    clicked: true,
    doAction: function (run) {
        if (run) {
            document.getElementsByClassName('map-img')[0].classList.add('expand');
        } else {
            document.getElementsByClassName('map-img')[0].classList.remove('expand');
        }
    }
}

menuItems.push(settings);
menuItems.push(assistants);
menuItems.push(map);