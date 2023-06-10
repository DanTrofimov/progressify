import * as vscode from "vscode";
import { Manifest } from "../IManifest";
import { findManifest } from "../manifestService";
import { getUri } from "../../../../utils/getUri";
import { writeFile } from 'fs/promises';
import path = require("path");
import { manifestGeneratorTemplate } from "../utils/manifestGeneratorPreviewTemplate";

const pwaAssetGenerator = require('pwa-asset-generator');

export class ManifestGenerationPanel {
    public static currentPanel: ManifestGenerationPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];
    private _extensionPath: vscode.Uri;

    private chosenIcon: vscode.Uri | undefined;

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;

        this._panel.onDidDispose(this.dispose, null, this._disposables);

        this._extensionPath = extensionUri;

        this._panel.webview.html = this._getWebviewContent(
            this._panel.webview,
            extensionUri
        );

        this._panel.webview.onDidReceiveMessage(
            async (message) => {
                if (message.command === "generate-icons") {
                    await this.generateIcons(message.options);
                }
                else if (message.command === "choose-base") {
                    const icon = await this.getBaseIcon();

                    const onDiskPath = vscode.Uri.file(
                        icon![0].path
                    );

                    this.chosenIcon = icon![0];

                    const goodIconSrc = this._panel.webview.asWebviewUri(onDiskPath);
                    this._panel.webview.html.replace(/src=".*"/, `src="${goodIconSrc}"`);

                    if (icon) {
                        this._panel.webview.postMessage({
                            command: "base-icon",
                            icon: goodIconSrc,
                        });
                    }
                }
            },
            undefined,
            this._disposables
        );
    }

    private _getWebviewContent(
        webview: vscode.Webview,
        extensionUri: vscode.Uri
    ) {
        const toolkitPath = getUri(webview, extensionUri, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js",
        ]);

        const stylesPath = getUri(webview, extensionUri, [ 'assets', 'styles', 'manifestGenerator.css' ]);
        const scriptsPath = getUri(webview, extensionUri, [ 'assets', 'scripts', 'manifestGenerator.js' ]);

        return manifestGeneratorTemplate(stylesPath, toolkitPath, scriptsPath);
    }

    public static render(extensionUri: vscode.Uri) {
        if (ManifestGenerationPanel.currentPanel) {
            ManifestGenerationPanel.currentPanel._panel.reveal(vscode.ViewColumn.Two);
        } else {
            const panel = vscode.window.createWebviewPanel(
                "iconview",
                "Icon Generation",
                vscode.ViewColumn.Two,
                {
                    enableFindWidget: true,
                    enableScripts: true,
                }
            );

            ManifestGenerationPanel.currentPanel = new ManifestGenerationPanel(panel, extensionUri);
        }
    }

    public dispose() {
        ManifestGenerationPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    async generateIcons(options: any = {}, skipPrompts?: boolean) {
        return new Promise(async (resolve, reject) => {
            try {
                let iconFile: vscode.Uri[] | undefined;

                if (this.chosenIcon) {
                    iconFile = [this.chosenIcon];
                }
                else if (!skipPrompts) {
                    // ask user for icon file
                    iconFile = await this.getBaseIcon();
                }
                else {
                    iconFile = [vscode.Uri.file(
                        `${vscode.workspace.workspaceFolders?.[0].uri.fsPath}/icon-512.png`
                    )];
                }

                let outputDir: vscode.Uri[] | undefined;
                // ask user for output directory
                if (!skipPrompts) {
                    outputDir = await vscode.window.showOpenDialog({
                        canSelectFiles: false,
                        canSelectMany: false,
                        canSelectFolders: true,
                        openLabel: 'Select output directory',
                        defaultUri: vscode.Uri.file(
                            `${vscode.workspace.workspaceFolders?.[0].uri.fsPath}/icons`
                        ),
                    });
                }
                else {
                    outputDir = [vscode.Uri.file(
                        `${vscode.workspace.workspaceFolders?.[0].uri.fsPath}/icons`
                    )];
                }

                // show progress with vscode 
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: 'Generating Icons',
                    cancellable: false,
                }, async (progress) => {
                    progress.report({ message: "Generating Icons..." });

                    const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
                        iconFile ? iconFile[0].fsPath : null,
                        outputDir ? outputDir[0].fsPath : null,
                        {
                            scrape: false,
                            log: false,
                            iconOnly: true,
                            background: options.background_color || "transparent",
                            padding: options.padding || "10%",
                            maskable: options.generateMaskable || true,
                        });

                    const manifest: vscode.Uri = (await findManifest() as vscode.Uri);
                    if (manifest) {
                        const manifestFile = await vscode.workspace.openTextDocument(
                            manifest
                        );

                        const manifestObject: Manifest = JSON.parse(
                            manifestFile.getText()
                        );

                        manifestObject.icons = manifestJsonContent;

                        // transform icons to relative paths
                        manifestObject.icons?.forEach((icon: any) => {
                            icon.src = vscode.workspace.asRelativePath(icon.src);
                        });

                        // write manifest file
                        await writeFile(
                            manifest.fsPath,
                            JSON.stringify(manifestObject, null, 2)
                        );

                        // show manifest with vscode
                        await vscode.window.showTextDocument(manifestFile);

                        progress.report({ message: "Icons generated successfully!" });

                        resolve(manifestFile);
                    }
                    else {
                        vscode.window.showErrorMessage(
                            "You first need a Web Manifest. Tap the Generate Manifest button at the bottom to get started."
                        );

                        progress.report({ message: "Generate a Web Manifest first" });
                    }


                });

            }
            catch (err: any) {
                vscode.window.showErrorMessage(
                    `There was an error generaring icons: ${err}`
                );

                reject(err);
            }
        });
    }

    async getBaseIcon() {
        const iconFile = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectMany: false,
            filters: {
                'Images': ['png', 'jpg', 'jpeg'],
            },
            openLabel: 'Select your Icon file, 512x512 is preferred',
        });
        return iconFile;
    }
}