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

function onUpdate(payload) {
    const contentRoot = document.querySelector(".preview-app-content");
    contentRoot.textContent = payload;
}