import * as vscode from 'vscode';

export class ManifestEditorProvider implements vscode.CustomTextEditorProvider {

    private static readonly viewType = 'progressify.preview';

    constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new ManifestEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(ManifestEditorProvider.viewType, provider);
		return providerRegistration;
	}

    public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {

		webviewPanel.webview.options = {
			enableScripts: true,
		};

		webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

		function updateWebview() {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: document.getText(),
			});
		}

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		updateWebview();
	}

    // initial HTML
    private getHtmlForWebview(webview: vscode.Webview): string {

		const headerStyles = webview.asWebviewUri(vscode.Uri.joinPath(
			this.context.extensionUri, 'media', 'header.css'));

		return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${headerStyles}" rel="stylesheet" />

				<title>Manifest Preview</title>
			</head>
			<body class="body">
                <header class='system-header'>
                
                </header>
                <div>Splash Screen content</div>
			</body>
			</html>`;
	}
}