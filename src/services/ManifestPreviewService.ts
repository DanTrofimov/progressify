// DOM nodes and styles orchestrator for static files preview
import * as vscode from 'vscode';

export class ManifestPreviewService {
    
    constructor(context: vscode.ExtensionContext) {
        
    }

    public initPreview(
        resource: vscode.Uri, 
        viewOptions: { 
            sourceUri?: vscode.Uri,
            viewColumn: vscode.ViewColumn; 
            preserveFocus?: boolean 
        }) {
        
        vscode.window.createWebviewPanel(
            "progressify-manifest-preview",
            "Manifest Preview",
            viewOptions,
            {
                enableFindWidget: true,
                enableScripts: true,
            },
        );
    }
}