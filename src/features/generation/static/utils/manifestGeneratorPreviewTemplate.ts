import * as vscode from 'vscode';

export const manifestGeneratorTemplate = (stylesPath: vscode.Uri, toolkitUri: vscode.Uri, scriptsPath: vscode.Uri) => {
    return /*html*/ `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://glitch.com/favicon.ico" />
            <link rel="stylesheet" type="text/css" href="${stylesPath}" />
            <title>Icon Generation</title>
            <script type="module" src="${toolkitUri}"></script>
            <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
        </head>
             <body>
                <div id="central">
                    <div id="submit-block">
                        <h1>Icon Generation Options</h1>

                        <vscode-button id="generate">Generate</vscode-button>
                    </div>
            
                <main>
                    <form>

                    <img id="base-icon" />
                    <div class="form-group">
                        <label for="chooseBase">Choose an icon file to use as a base. 512x512 is preferred. PWABuilder Studio will use this icon to generate icons that are the required sizes.</label>
                        <vscode-button id="chooseBase">Choose Base Icon</vscode-button>
                    </div>

                    <div class="form-group">
                        <div class="form-item">
                            <label for="background_color">Background Color: The background color of your icons</label>
                            <input class="form-control" id="background_color" value="transparent" type="color">
                        </div>

                        <div class="form-item">
                        <label for="padding">Icon Padding: The padding around your icon and the edge of the icon</label>
                        <vscode-text-field id="padding" placeholder="Enter padding" value="10" type="number"></vscode-text-field>
                        </div>

                        <div class="form-item">
                        <label for="generateMaskable">Generate Maskable Icon: Maskable icons allow your icon to fill the background and adapt to different icon shapes</label>
                        <vscode-checkbox id="generateMaskable" checked="true"></vscode-checkbox>
                        </div>
                    </div>
                    </form>
                </main>
            
                </div>
                <script type="text/javascript" src="${scriptsPath}"></script>
            </body>
        </html>
    `;
};