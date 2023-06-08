window.addEventListener('message', eventHandler);

function eventHandler(event) {
    const { command, payload } = event.data;
    
    switch(command) {
        case 'update_preview':
            onUpdate(payload);
            return;
        default:
            console.log('Unknown command');
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
        console.log('Some required fields are expected');
        return;
    }

    const { theme_color, background_color, name, icons } = parsedPayload;

    updateHeader(theme_color);
    updatePreviewContainerBackground(background_color);
    updateName(name);
    updateIcon(icons);
}

function updateHeader(themeColor) {

    const headerNode = document.querySelector(".preview-header");

    headerNode.style.backgroundColor = themeColor;
}

function updateName(name) {
    const nameNode =  document.querySelector(".container__name");

    nameNode.textContent = name;
}

function updateIcon(icons) {
    const iconNode = document.querySelector(".container__logo");

    iconNode.src = icons[0].src;
}

function updatePreviewContainerBackground(backgroundColor) {
    const previewContainerNode = document.querySelector('.preview-container');

    previewContainerNode.style.backgroundColor = backgroundColor;
}