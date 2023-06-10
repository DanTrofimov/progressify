import * as vscode from 'vscode';
import { IMessage } from './Message';

// webview (html), xml, etc.
export interface Preview {
    
    _previewSource: vscode.WebviewPanel;

    getPreviewSource(): vscode.WebviewPanel
    
    initContent(eviewContent: string): void;
    
    postMessage(message: IMessage): void;

    getAsWebviewUri(path: vscode.Uri): vscode.Uri
}