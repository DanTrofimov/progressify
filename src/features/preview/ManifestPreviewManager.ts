// DOM nodes and styles orchestrator for static files preview
import * as vscode from 'vscode';
import { isManifest } from './utils/isManifest';
import { previewTemplate } from './utils/previewTemplate';
import { getUri } from '../../utils/getUri';
import { Command, IMessage } from '../../interfaces/Message';
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
        const stylesPath = getUri(this._preview.getPreviewSource().webview, this._extensionPath, [ 'assets', 'styles', 'manifestPreview.css' ]);
        const scriptsPath = getUri(this._preview.getPreviewSource().webview, this._extensionPath, [ 'assets', 'scripts', 'manifestPreview.js']);

        return previewTemplate(this._preview.getAsWebviewUri(stylesPath), this._preview.getAsWebviewUri(scriptsPath));
      }
}
