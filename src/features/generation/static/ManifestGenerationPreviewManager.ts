import * as vscode from "vscode";
import { Manifest } from "../../../interfaces/Manifest";
import { getUri } from "../../../utils/getUri";
import { writeFile } from 'fs/promises';
import { manifestGeneratorTemplate } from "./utils/manifestGeneratorPreviewTemplate";
import { ManifestGeneratorPreview } from "./ManifestGenerationPreview";
import { Command, Message } from "../../../interfaces/Message";

const pwaAssetGenerator = require('pwa-asset-generator');

export class ManifestGenerationPreviewManager {
    private _preview: ManifestGeneratorPreview;
    private _extensionPath: vscode.Uri;
    private chosenIcon: vscode.Uri | undefined;

    constructor(context: vscode.ExtensionContext) {
        this._extensionPath = context.extensionUri;
        
        this._preview = new ManifestGeneratorPreview({
            viewColumn: vscode.ViewColumn.Two,
            preserveFocus: true,
            },
            {
                enableFindWidget: true,
                enableScripts: true,
            }
        );

        this._preview.initContent(this.getPreviewInitialContent());

        this._preview.sendMessage(
            async (message: Message<Manifest>) => {
                switch(message.command) {
                    case Command.generateManifest:
                        await this.generateManifest(message.payload);
                        return;
                    case Command.chooseBaseIcon:
                        await this.handleBaseIcon();
                        return;
                    default: 
                        console.error('Unknown command');
                }
            }
        );
    }

    async generateManifest(manifestOptions: Manifest) {

        const outputDir: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectMany: false,
            canSelectFolders: true,
            openLabel: 'Select manifest output directory',
        });

        const manifestDir: vscode.Uri | undefined = outputDir ? outputDir[0] : undefined;

        if (manifestDir) {
            const manifestObject: Manifest = {};

            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Progressify',
                cancellable: false,
            }, async (progress) => {
                progress.report({ message: "Generating Manifest..." });

                this.generateMainSection(manifestOptions, manifestObject);
                await this.generateIcons(manifestOptions, manifestObject, manifestDir);

                progress.report({ message: "Manifest generated successfully!" });

                const manifestPath = vscode.Uri.joinPath(manifestDir, '/manifest.json');

                await writeFile(
                    manifestPath.fsPath,
                    JSON.stringify(manifestObject, null, 2)
                );

                await vscode.window.showTextDocument(manifestPath);
            });
        } else {
            vscode.window.showErrorMessage(
                "You need to select output directory for manifest.json"
            );
        }
    }

    public generateMainSection(manifestOptions: Manifest, manifestObject: Manifest) {
        const { name, theme_color, background_color, start_url, display } = manifestOptions;
        
        manifestObject.name = name;
        manifestObject.theme_color = theme_color;
        manifestObject.background_color = background_color;
        manifestObject.start_url = start_url;
        manifestObject.display = display;
    }

    async generateIcons(manifestOptions: Manifest, manifestObject: Manifest, outputDir: vscode.Uri | undefined) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let iconFile: vscode.Uri[] | undefined;

                if (this.chosenIcon) {
                    iconFile = [this.chosenIcon];
                } else {
                    iconFile = await this.getBaseIcon();
                }
            
                const { manifestJsonContent } = await pwaAssetGenerator.generateImages(
                    iconFile ? iconFile[0].fsPath : null,
                    outputDir ? outputDir.fsPath : null,
                    {
                        scrape: false,
                        log: false,
                        iconOnly: true,
                        background: manifestOptions.icon_background_color || "transparent",
                        padding: manifestOptions.padding || "10%",
                        maskable: manifestOptions.generateMaskable || true,
                    }
                );

                manifestObject.icons = manifestJsonContent;
                manifestObject.icons?.forEach((icon: any) => {
                    icon.src = vscode.workspace.asRelativePath(icon.src);
                });

                resolve();
            }
            catch (err: any) {
                vscode.window.showErrorMessage(
                    `There was an error generaring manifest: ${err}`
                );
                reject(err);
            }
        });
    }

    async handleBaseIcon() {
        const icon = await this.getBaseIcon();

        const onDiskPath = vscode.Uri.file(
            icon![0].path
        );

        this.chosenIcon = icon![0];
        
        const goodIconSrc = this._preview.getPreviewSource().webview.asWebviewUri(onDiskPath);

        if (icon) {
            this._preview.postMessage({
                command: Command.updateBaseIcon,
                payload: goodIconSrc.toString(),
            });
        }
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

    private getPreviewInitialContent(): string {
        const toolkitPath = getUri(this._preview.getPreviewSource().webview, this._extensionPath, [
            "node_modules",
            "@vscode",
            "webview-ui-toolkit",
            "dist",
            "toolkit.js",
        ]);

        const stylesPath = getUri(this._preview.getPreviewSource().webview, this._extensionPath, [ 'assets', 'styles', 'manifestGenerator.css' ]);
        const scriptsPath = getUri(this._preview.getPreviewSource().webview, this._extensionPath, [ 'assets', 'scripts', 'manifestGenerator.js' ]);

        return manifestGeneratorTemplate(stylesPath, toolkitPath, scriptsPath);
    }
}