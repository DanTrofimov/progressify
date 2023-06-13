import * as vscode from 'vscode';
import { parse } from '@babel/parser';
const fetch = require('node-fetch');

const API_KEY = 'Api-Key';
const CLOUD_FUNC_ENDPOINT = 'https://functions.yandexcloud.net/d4e5igjblkjsmcp0u277';  

export async function selectFileForCloudLinting() {
    const lintingFileSelect: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectMany: false,
        canSelectFolders: false,
        openLabel: 'Select file for linting',
    });

    const lintingFilePath: vscode.Uri | undefined = lintingFileSelect ? lintingFileSelect[0] : undefined;

    if (lintingFilePath) {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Progressify',
            cancellable: false,
        }, async (progress) => {
            progress.report({ message: "Cloud linting..." });

            const lintingFile = await vscode.workspace.openTextDocument(
                lintingFilePath
            );

            const fileAST = parseFileToAST(lintingFile.getText());

            const response = await makeCloudFunctionRequest(fileAST);

            const terminal = vscode.window.createTerminal();
            terminal.show();
            terminal.sendText(response);

            progress.report({ message: "Linted successfully! See terminal output" });
        });
    } else {
        vscode.window.showErrorMessage(
            "You need to select file for cloud linting"
        );
    }
};

function parseFileToAST(code: string) {
    const ast = parse(code);

    const astJson = JSON.stringify(ast);
    
    return astJson;
}

async function makeCloudFunctionRequest<T>(ASTJson: string) { 

    const response = await fetch(CLOUD_FUNC_ENDPOINT, {
        method: 'POST', 
        body: ASTJson,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': API_KEY,
        }
    });

    const parsedResponse = await response.text();
    return parsedResponse;
}

function logLintingResult(log: string) {
    console.log(log);
}
