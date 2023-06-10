import * as vscode from 'vscode';
import { ManifestPreviewManager } from './features/preview/ManifestPreviewManager';
import { startUpPWA } from './features/generation/startUp';
import { ManifestGenerationPanel } from './features/generation/static/view/ManifestGanerationPanel';

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

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'progressify.startUpPWA',
			startUpPWA
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'progressify.generateManifest',
			async () => {
				ManifestGenerationPanel.render(context.extensionUri);
			}
		)
	);
}

export function deactivate() {
}
