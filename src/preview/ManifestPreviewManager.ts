// DOM nodes and styles orchestrator for static files preview
import * as vscode from 'vscode';
import { isManifest } from '../utils/isManifest';

enum Command {
    update ='update_preview'
}

interface IMessage {
    command: Command
    payload: string
}

export class ManifestPreviewManager {
    private _extensionPath: vscode.Uri;
    private _webViewPanel: vscode.WebviewPanel;

    constructor(context: vscode.ExtensionContext) {
        this._extensionPath = context.extensionUri;

		if (!(this._extensionPath instanceof vscode.Uri)) {
		  if (vscode.window.activeTextEditor) {
			this._extensionPath = vscode.window.activeTextEditor.document.uri;
		  }
		}

        this._webViewPanel = vscode.window.createWebviewPanel(
            "progressify-manifest-preview",
            "Manifest Preview",
            {
                viewColumn: vscode.ViewColumn.Two,
                preserveFocus: true,
            },
            {
                enableFindWidget: true,
                enableScripts: true,
            },
        );

        this._webViewPanel.webview.html = this.getPreviewInitialContent();
        
        this.updatePreviewContentOnInit();
    }

    public async updatePreviewContent(uri: vscode.Uri) {

        if (!isManifest(uri)) {return;}

        const message = await this.getUpdateWebViewMessage(uri);

        this._webViewPanel.webview.postMessage(message);
    }

    private async getUpdateWebViewMessage (uri: vscode.Uri): Promise<IMessage> {
        const document = await vscode.workspace.openTextDocument(uri);
    
        return {
            command: Command.update,
            payload: document.getText()
        };
    }

    public async updatePreviewContentOnInit() {
        const openTextDocument = this.getActiveEditorUri();
        if (openTextDocument) {
            this.updatePreviewContent(openTextDocument);
        }
    }

    protected getActiveEditorUri(): vscode.Uri | undefined {
        return vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri;
    }

    public getPreviewInitialContent(): string {
        const webview = this._webViewPanel.webview;
        const initialStylesPath = vscode.Uri.joinPath(this._extensionPath, 'assets', 'styles', 'initial.css');
        const scripts = vscode.Uri.joinPath(this._extensionPath, 'assets', 'scripts', 'index.js');

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
                    <script type="text/javascript" src="${webview.asWebviewUri(scripts)}"></script>
                </body>
            </html>
        `;
      }
}
