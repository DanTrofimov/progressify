// DOM nodes and styles orchestrator for static files preview
import * as vscode from 'vscode';

export class ManifestPreviewManager {
    private _extensionPath: vscode.Uri;

    constructor(context: vscode.ExtensionContext) {
        this._extensionPath = context.extensionUri;
    }

    public initPreview(
        viewOptions: { 
            sourceUri?: vscode.Uri,
            viewColumn: vscode.ViewColumn; 
            preserveFocus?: boolean 
        },
        resource?: vscode.Uri) {
        const panel = vscode.window.createWebviewPanel(
            "progressify-manifest-preview",
            "Manifest Preview",
            viewOptions,
            {
                enableFindWidget: true,
                enableScripts: true,
            },
        );

        panel.webview.html = this.getWebviewContent(panel);
    }

    public openPreviewToTheSide(uri?: vscode.Uri) {
		let resource = uri;
		if (!(resource instanceof vscode.Uri)) {
		  if (vscode.window.activeTextEditor) {
			resource = vscode.window.activeTextEditor.document.uri;
		  }
		}
		
        this.initPreview({
		  viewColumn: vscode.ViewColumn.Two,
		  preserveFocus: true,
		}, resource);
	}

    public getWebviewContent(panel: vscode.WebviewPanel): string {
        const webview = panel.webview;
        const initialStylesPath = vscode.Uri.joinPath(this._extensionPath, 'assets', 'styles', 'initial.css');

        console.log(initialStylesPath);

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="${webview.asWebviewUri(initialStylesPath)}">
                <title>Cat Coding</title>
            </head>
                <body>
                    <div class="preview-container">
                        <header class="preview-header">
                            
                        </header>
                        <main class="preview-app-content">
                            
                        </main>
                    </div>
                </body>
            </html>
        `;
      }
}
