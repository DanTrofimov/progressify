const vscode = acquireVsCodeApi();

const icon_background_color = document.getElementById("icon_background_color");
const padding = document.getElementById("padding");
const generateMaskable = document.getElementById("generateMaskable");

const appName =  document.getElementById("name");
const theme_color =  document.getElementById("theme_color");
const background_color =  document.getElementById("background_color");
const start_url =  document.getElementById("start_url");
const display =  document.getElementById("display");

document.querySelector("#generate").addEventListener("click", () => {
  vscode.postMessage({
    command: 'generate-manifest',
    options: {
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

document.querySelector("#chooseBase").addEventListener("click", () => {
  vscode.postMessage({
      command: 'choose-base',
  });
});

window.addEventListener("message", (message) => {
  if (message.data.command === "base-icon") {
      const baseIcon = document.querySelector("#base-icon");
      baseIcon.style.display = 'block';
      baseIcon.src = message.data.icon.external;
  }
});
