import * as vscode from 'vscode';
import { ManifestPreviewService } from './services/ManifestPreviewService';

export function activate(context: vscode.ExtensionContext) {
	const contentProvider = new ManifestPreviewService(context);

	function openPreviewToTheSide(uri: vscode.Uri) {
		let resource = uri;
		if (!(resource instanceof vscode.Uri)) {
		  if (vscode.window.activeTextEditor) {
			// we are relaxed and don't check for markdown files
			resource = vscode.window.activeTextEditor.document.uri;
		  }
		}
		contentProvider.initPreview(resource, {
		  viewColumn: vscode.ViewColumn.Two,
		  preserveFocus: true,
		});
	  }

	  context.subscriptions.push(
		vscode.commands.registerCommand(
		  "progressify.sidePreview",
		  openPreviewToTheSide,
		),
	  );
}

// This method is called when your extension is deactivated
export function deactivate() {
}
