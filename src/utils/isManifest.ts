import * as vscode from 'vscode';

export const isManifest = (uri: vscode.Uri) => {
    return /manifest\.json$/.test(uri.toString());
};