import * as vscode from 'vscode';
import { Message } from './Message';

// webview (html), xml, etc.
export interface Preview {
    
    _previewSource: vscode.WebviewPanel;

    getPreviewSource(): vscode.WebviewPanel
    
    initContent(eviewContent: string): void;
    
    postMessage(message: Message): void;

    getAsWebviewUri(path: vscode.Uri): vscode.Uri
}