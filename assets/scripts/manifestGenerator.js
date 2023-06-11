/* eslint-disable @typescript-eslint/naming-convention */
const vscode = acquireVsCodeApi();
window.addEventListener("message", eventReducer);

const MANIFEST_GEN_APP_NAME_SELECTOR = '#name';
const MANIFEST_GEN_THEME_COLOR_SELECTOR = '#theme_color';
const MANIFEST_GEN_BACKGROUND_COLOR_SELECTOR = '#background_color';
const MANIFEST_GEN_START_URL_SELECTOR = '#start_url';
const MANIFEST_GEN_DISPLAY_SELECTOR = '#display';
const MANIFEST_GEN_ICON_BG_SELECTOR = '#icon_background_color';
const MANIFEST_GEN_PADDING_SELECTOR = '#padding';
const MANIFEST_GEN_GENERATE_MASKABLE_SELECTOR = '#generateMaskable';

const MANIFEST_GEN_GENERATE_BUTTON_SELECTOR = '#generate';
const MANIFEST_GEN_CHOOSE_BASE_ICON_BUTTON_SELECTOR = '#chooseBase';
const MANIFEST_GEN_BASE_ICON_SELECTOR = '#base-icon';

const generateButton = document.querySelector(MANIFEST_GEN_GENERATE_BUTTON_SELECTOR);
const chooseBaseIconButton = document.querySelector(MANIFEST_GEN_CHOOSE_BASE_ICON_BUTTON_SELECTOR);
const baseIcon = document.querySelector(MANIFEST_GEN_BASE_ICON_SELECTOR);

function eventReducer(event) {
  const { command, payload } = event.data;
  
  switch(command) {
      case 'update-base-icon':
          baseIcon.style.display = 'block';
          baseIcon.src = message.data.payload.external;
          return;
      default:
          console.err('Unknown command');
  }
};

function getFormData() {
  const icon_background_color = document.querySelector(MANIFEST_GEN_ICON_BG_SELECTOR);
  const padding = document.querySelector(MANIFEST_GEN_PADDING_SELECTOR);
  const generateMaskable = document.querySelector(MANIFEST_GEN_GENERATE_MASKABLE_SELECTOR);
  
  const appName =  document.querySelector(MANIFEST_GEN_APP_NAME_SELECTOR);
  const theme_color =  document.querySelector(MANIFEST_GEN_THEME_COLOR_SELECTOR);
  const background_color =  document.querySelector(MANIFEST_GEN_BACKGROUND_COLOR_SELECTOR);
  const start_url =  document.querySelector(MANIFEST_GEN_START_URL_SELECTOR);
  const display =  document.querySelector(MANIFEST_GEN_DISPLAY_SELECTOR); 

  return {
    appName,
    theme_color,
    background_color,
    start_url,
    display,
    icon_background_color,
    padding,
    generateMaskable
  };
};

generateButton.addEventListener("click", () => {
  const {
    appName,
    theme_color,
    background_color,
    start_url,
    display,
    icon_background_color,
    padding,
    generateMaskable
  } = getFormData();

  vscode.postMessage({
    command: 'generate-manifest',
    payload: {
      icon_background_color: icon_background_color.value,
      padding: padding.value,
      generateMaskable: generateMaskable.checked,
      name: appName.value,
      theme_color: theme_color.value,
      background_color: background_color.value,
      start_url: start_url.value,
      display: display.value,
    }
  });
});

chooseBaseIconButton.addEventListener("click", () => {
  vscode.postMessage({
      command: 'choose-base-icon',
  });
});

