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
            <div class="preview-container">
                <header>
                    <div class="preview-header"></div>
                </header>
                <main class="preview-app-content">
                    <div class="preview-app-content__container">
                        <img class="container__logo"/>
                        <h1 class="container__name"></h1>
                    </div>
                </main>
            </div>
            <script type="text/javascript" src="${scriptsPath}"></script>
        </body>
        </html>    
    `;
};
