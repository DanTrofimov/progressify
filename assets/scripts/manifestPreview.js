window.addEventListener('message', eventReducer);

const SPLASH_SCREEN_HEADER_SELECTOR = ".splash-screen__header";
const SPLASH_SCREEN_NAME_SELECTOR = ".splash-screen__name";
const SPLASH_SCREEN_LOGO_SELECTOR = ".splash-screen__logo";
const SPLASH_SCREEN_PREVIEW_SELECTOR = ".preview__splash-screen";

const BADGE_ICON_SELECTOR = '.app-icon__badge';
const SHORTCUTS_ICON_SELECTOR = '.app-icon__shortcuts';

const SHORTCUTS_ITEMS_SELCTOR = '.shortcuts__item';

function eventReducer(event) {
    const { command, payload } = event.data;
    
    switch(command) {
        case 'update_preview':
            onUpdate(payload);
            return;
        default:
            console.err('Unknown command');
    }
};

// check required fields
function validatePayload(payload) {
    if (!payload.name) {return false;}
    if (!payload.icons) {return false;}
    if (!payload.start_url) {return false;};
    if (!payload.display) {return false;};
    return true;
}
    
function onUpdate(payload) {

    const parsedPayload = JSON.parse(payload);

    if (!validatePayload(parsedPayload)) {
        console.err('Some required fields are expected');
        return;
    }

    const { theme_color, background_color, name, icons, shortcuts } = parsedPayload;

    updateHeader(theme_color);
    updatePreviewContainerBackground(background_color);
    updateName(name);
    updateIcon(icons);
    updateShortcuts(shortcuts);
}

function updateHeader(themeColor) {

    const headerNode = document.querySelector(SPLASH_SCREEN_HEADER_SELECTOR);

    headerNode.style.backgroundColor = themeColor;
}

function updateName(name) {
    const nameNode =  document.querySelector(SPLASH_SCREEN_NAME_SELECTOR);

    nameNode.textContent = name;
}

function updateIcon(icons) {
    const splashCreenIconNode = document.querySelector(SPLASH_SCREEN_LOGO_SELECTOR);
    const badgeIconNode = document.querySelector(BADGE_ICON_SELECTOR);
    const shortcutsIconNode = document.querySelector(SHORTCUTS_ICON_SELECTOR);
    const iconsList = [splashCreenIconNode, badgeIconNode, shortcutsIconNode];

    iconsList.forEach(icon =>  icon.src = icons[0].src);
}

function updatePreviewContainerBackground(backgroundColor) {
    const previewContainerNode = document.querySelector(SPLASH_SCREEN_PREVIEW_SELECTOR);

    previewContainerNode.style.backgroundColor = backgroundColor;
}

function updateShortcuts(shortcuts) {
    const shortcutsTitles = shortcuts.map(item => item.name);
    const shortcutItemsNode = document.querySelectorAll(SHORTCUTS_ITEMS_SELCTOR);

    shortcutItemsNode.forEach((item, index) => item.textContent = shortcutsTitles[index]);
}
