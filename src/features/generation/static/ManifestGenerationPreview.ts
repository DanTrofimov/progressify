import * as vscode from "vscode";
import { WebviewPanel } from "vscode";
import { ShowOptions } from "../../../interfaces/ShowOptions";
import { Preview } from "../../../interfaces/Preview";
import { Message } from "../../../interfaces/Message"; 

export class ManifestGeneratorPreview implements Preview {
    _previewSource: WebviewPanel;

    constructor(showoptions: ShowOptions, options: vscode.WebviewOptions & vscode.WebviewPanelOptions) {
        this._previewSource = vscode.window.createWebviewPanel(
            "progressify-manifest-generator",
            "Manifest Generator",
            showoptions,
            options
        );
    }

    initContent(previewContent: string) {
        this._previewSource.webview.html = previewContent;
    }
    
    postMessage(message: Message) {
        this._previewSource.webview.postMessage(message);
    }

    sendMessage(callback: (message: Message) => {}) {
        this._previewSource.webview.onDidReceiveMessage(callback);
    }

    getAsWebviewUri(path: vscode.Uri): vscode.Uri {
        return this._previewSource.webview.asWebviewUri(path);
    }

    getPreviewSource() {
        return this._previewSource;
    }
}