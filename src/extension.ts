import * as vscode from 'vscode';
import { ManifestPreviewManager } from './preview/ManifestPreviewManager';

export function activate(context: vscode.ExtensionContext) {
	const previewManager = new ManifestPreviewManager(context);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"progressify.sidePreview",
			() => previewManager.openPreviewToTheSide(),
		),
	);
}

export function deactivate() {
}
