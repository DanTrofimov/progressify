import { WebviewPanel } from "vscode";
import { Preview } from "../../interfaces/Preview";
import * as vscode from 'vscode';
import { IMessage } from "../../interfaces/Message";
import { ShowOptions } from "../../interfaces/ShowOptions";

export class ManifestPreview implements Preview {
    _previewSource: WebviewPanel;

    constructor(showoptions: ShowOptions, options: vscode.WebviewOptions & vscode.WebviewPanelOptions) {
        this._previewSource = vscode.window.createWebviewPanel(
            "progressify-manifest-preview",
            "Manifest Preview",
            showoptions,
            options
        );
    }

    initContent(previewContent: string) {
        this._previewSource.webview.html = previewContent;
    }
    
    postMessage(message: IMessage) {
        this._previewSource.webview.postMessage(message);
    }

    getAsWebviewUri(path: vscode.Uri): vscode.Uri {
        return this._previewSource.webview.asWebviewUri(path);
    }

    getPreviewSource() {
        return this._previewSource;
    }
}