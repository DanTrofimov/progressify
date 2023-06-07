import * as vscode from 'vscode';

export const previewTemplate = (stylesPath: vscode.Uri, scriptsPath: vscode.Uri,) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="${stylesPath}">
            <title>Cat Coding</title>
        </head>

            <body>
                <div class="preview-container">
                    <header class="preview-header">
                        
                    </header>
                    <pre class="preview-app-content">
                        
                    </pre>
                </div>
                <script type="text/javascript" src="${scriptsPath}"></script>
            </body>
        </html>
`;
};