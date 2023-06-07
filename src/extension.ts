import * as vscode from 'vscode';
import { ManifestPreviewManager } from './preview/ManifestPreviewManager';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"progressify.sidePreview",

			() => new ManifestPreviewManager(context),
		),
	);

	vscode.workspace.onDidChangeTextDocument((e) => {
		const manifestPreviewManager = new ManifestPreviewManager(context);
		manifestPreviewManager.updatePreviewContent(e.document.uri);
	});
}

export function deactivate() {
}
