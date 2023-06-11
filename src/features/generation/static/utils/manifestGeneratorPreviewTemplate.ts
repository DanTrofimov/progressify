import * as vscode from 'vscode';

export const manifestGeneratorTemplate = (stylesPath: vscode.Uri, toolkitUri: vscode.Uri, scriptsPath: vscode.Uri) => {
    return /*html*/ `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://glitch.com/favicon.ico" />
            <link rel="stylesheet" type="text/css" href="${stylesPath}" />
            <title>Manifest Generation</title>
            <script type="module" src="${toolkitUri}"></script>
            <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
        </head>
             <body>
                <div id="central">
                    <div id="submit-block">
                        <h1>Manifest Generation Options</h1>

                        <vscode-button id="generate">Generate</vscode-button>
                    </div>
            
                <main>
                    <form>
                    <h2>Main section</h2>

                        <div class="form-group">
                            <div class="form-item">
                                <label for="name">Name: is a string that represents the name of the web application as it is usually displayed to the user (e.g., amongst a list of other applications, or as a label for an icon).</label>
                                <vscode-text-field id="name" placeholder="Enter the name" type="text"></vscode-text-field>
                            </div>
            
                            <div class="form-item">
                                <label for="theme_color">Theme color: is the color that defines the default theme color for the application. This sometimes affects how the OS displays the site.</label>
                                <input class="form-control" id="theme_color" value="transparent" type="color">
                            </div>
            
                            <div class="form-item">
                                <label for="background_color">Background color: is the color that defines a placeholder background color for the application page to display before its stylesheet is loaded.</label>
                                <input class="form-control" id="background_color" value="transparent" type="color">
                            </div>
            
                            <div class="form-item">
                                <label for="start_url">Start URL: the preferred URL that should be loaded when the user launches the web application.</label>
                                <vscode-text-field id="start_url" placeholder="Enter the start url" type="text"></vscode-text-field>
                            </div>
            
                            <div class="form-item">
                                <label for="display">Display: is a string that determines the developers' preferred display mode for the website.</label>
                                <vscode-dropdown id="display">
                                    <vscode-option>fullscreen</vscode-option>
                                    <vscode-option>standalone</vscode-option>
                                    <vscode-option>minimal-ui</vscode-option>
                                    <vscode-option>browser</vscode-option>
                              </vscode-dropdown>
                            </div>
                        </div>

                        <h2>Icons section</h2>
                        <img id="base-icon" />
                        
                        <div class="form-group">
                            <label for="chooseBase">Choose an icon file to use as a base. 512x512 is preferred. EXtension will use this icon to generate icons that are the required sizes.</label>
                            <vscode-button id="chooseBase">Choose Base Icon</vscode-button>
                        </div>
    
                        <div class="form-group">
                            <div class="form-item">
                                <label for="icon_background_color">Background Color: The background color of your icons</label>
                                <input class="form-control" id="icon_background_color" value="transparent" type="color">
                            </div>
        
                            <div class="form-item">
                                <label for="padding">Icon Padding: The padding around your icon and the edge of the icon</label>
                                <vscode-text-field id="padding" placeholder="Enter padding" value="10" type="number"></vscode-text-field>
                            </div>
        
                            <div class="form-item">
                                <label for="generateMaskable">Generate Maskable Icon: Maskable icons allow your icon to fill the background and adapt to different icon shapes</label>
                                <vscode-checkbox id="generateMaskable" checked="true"></vscode-checkbox>
                            </div>
                        </div>
                    </form>
                </main>
            
                </div>
                <script type="text/javascript" src="${scriptsPath}"></script>
            </body>
        </html>
    `;
};