import * as vscode from 'vscode';
import { ManifestPreviewManager } from './features/preview/ManifestPreviewManager';
import { generateBaseStructureOfPWA } from './features/generation/startUp/generateBaseStructureOfPWA';
import { ManifestGenerationPreviewManager } from './features/generation/static/ManifestGenerationPreviewManager';

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
			generateBaseStructureOfPWA
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'progressify.generateManifest',
			async () => {
				ManifestGenerationPreviewManager.render(context.extensionUri);
			}
		)
	);
}

export function deactivate() {
}
