// DOM nodes and styles orchestrator for static files preview
import * as vscode from 'vscode';
import { isManifest } from '../utils/isManifest';
import { previewTemplate } from '../utils/previewTemplate';
import { Command, IMessage } from './Message';
import { ManifestPreview } from './ManifestPreview';

export class ManifestPreviewManager {
    private _extensionPath: vscode.Uri;
    private _preview: ManifestPreview;

    constructor(context: vscode.ExtensionContext) {
        this._extensionPath = context.extensionUri;

        this._preview = new ManifestPreview({
                viewColumn: vscode.ViewColumn.Two,
                preserveFocus: true,
            },
            {
                enableFindWidget: true,
                enableScripts: true,
            }
        );

        this._preview.initContent(this.getPreviewInitialContent());
        
        this.updatePreviewContentOnInit();
    }

    public async updatePreviewContent(uri: vscode.Uri) {

        if (!isManifest(uri)) {return;}

        const message = await this.getUpdateWebViewMessage(uri);

        this._preview.postMessage(message);
    }

    public async updatePreviewContentOnInit() {
        const openTextDocument = this.getActiveEditorUri();
        if (openTextDocument) {
            this.updatePreviewContent(openTextDocument);
        }
    }

    private async getUpdateWebViewMessage (uri: vscode.Uri): Promise<IMessage> {
        const document = await vscode.workspace.openTextDocument(uri);
    
        return {
            command: Command.update,
            payload: document.getText()
        };
    }

    protected getActiveEditorUri(): vscode.Uri | undefined {
        return vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri;
    }

    public getPreviewInitialContent(): string {
        const stylesPath = vscode.Uri.joinPath(this._extensionPath, 'assets', 'styles', 'initial.css');
        const scriptsPath = vscode.Uri.joinPath(this._extensionPath, 'assets', 'scripts', 'index.js');

        return previewTemplate(this._preview.getAsWebviewUri(stylesPath), this._preview.getAsWebviewUri(scriptsPath));
      }
}
