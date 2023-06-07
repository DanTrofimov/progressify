import * as vscode from 'vscode';
import { ManifestPreviewManager } from './preview/ManifestPreviewManager';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"progressify.sidePreview",
			() => new ManifestPreviewManager(context),
		),
	);
}

export function deactivate() {
}
