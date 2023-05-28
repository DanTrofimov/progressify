import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('progressify.startPreview', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'progressify', // Identifies the type of the webview. Used internally
			'Manifest Preview', // Title of the panel displayed to the user
			vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		   // And set its HTML content
		   panel.webview.html = getWebviewContent();
		})
	  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
  }