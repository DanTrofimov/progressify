const vscode = acquireVsCodeApi();

const background_color = document.getElementById("background_color");
const padding = document.getElementById("padding");
const generateMaskable = document.getElementById("generateMaskable");

document.querySelector("#generate").addEventListener("click", () => {
  vscode.postMessage({
    command: 'generate-icons',
    options: {
      background_color: background_color.value,
      padding: padding.value,
      generateMaskable: generateMaskable.checked
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
      document.querySelector("#base-icon").src = message.data.icon.external;
  }
});
