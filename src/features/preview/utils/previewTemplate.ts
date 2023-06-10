import * as vscode from 'vscode';

export const previewTemplate = (stylesPath: vscode.Uri, scriptsPath: vscode.Uri,) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" type="text/css" href="${stylesPath}" />
                <title>Manifest Preview</title>
            </head>
        
            <body>
                <div class="preview">
                    <div class="preview__splash-screen">
                        <header class="splash-screen__header">
                        </header>
                        <main class="splash-screen__content">
                            <div class="splash-screen__content-container">
                                <img class="splash-screen__logo" />
                                <h1 class="splash-screen__name">Weather App</h1>
                            </div>
                        </main>
                    </div>
                    <div class="preview__icons">
                    <div class="icons__badge">
                        <div class="badge">12</div>
                        <img class="app-icon__badge" />
                    </div>
                    <div class="icons__shortcuts">
                        <div class="shortcuts">
                            <li class="shortcuts__item"></li>
                            <li class="shortcuts__item"></li>
                            <li class="shortcuts__item"></li>
                        </div>
                        <img class="app-icon__shortcuts" />
                    </div>
                    </div>
                </div>
                <script type="text/javascript" src="${scriptsPath}"></script>
            </body>
        </html>    
    `;
};
