import * as vscode from 'vscode';
import { ManifestPreviewManager } from './features/preview/ManifestPreviewManager';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"progressify.sidePreview",

			() => {
				const manifestPreviewManager = new ManifestPreviewManager(context);

				vscode.workspace.onDidChangeTextDocument((e) => {
					manifestPreviewManager.updatePreviewContent(e.document.uri);
				});
			}
		),
	);
}

export function deactivate() {
}
