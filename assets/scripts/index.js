window.addEventListener('message', eventHandler);

const eventHandler = (event) => {
    const { command, payload } = event.data;
    
    switch(command) {
        case 'update_preview':
            const contentRoot = document.querySelector(".preview-app-content");
            contentRoot.textContent = payload;
            return;
        default:
            console.log('Unknown command');
    }
};
