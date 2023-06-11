import * as vscode from "vscode";

export async function findManifest(manifestFile?: vscode.Uri[] | undefined) {

  let manifest: vscode.Uri | undefined;

  if (manifestFile && manifestFile.length > 0) {
    manifest = manifestFile[0];
  } else {
    const rootFolder = vscode.workspace.workspaceFolders?.[0];
    if (rootFolder) {

      const mani = await vscode.workspace.findFiles(
        new vscode.RelativePattern(rootFolder, 'manifest.json'),
        "/node_modules/"
      );

      if (mani.length > 0) {
        // check if file actually exists
        const info = await vscode.workspace;
        manifest = mani[0];
      } else {
        const maniTryTwo = await vscode.workspace.findFiles(
          new vscode.RelativePattern(rootFolder, 'web-manifest.json'),
          "/node_modules/"
        );

        if (maniTryTwo.length > 0) {
          manifest = maniTryTwo[0];
        } else {
          const maniTryThree = await vscode.workspace.findFiles(
            new vscode.RelativePattern(rootFolder, "*.webmanifest"),
            "/node_modules/"
          );

          if (maniTryThree.length > 0) {
            manifest = maniTryThree[0];
          }
          else {
            // dont use RelativePattern here
            const maniTryFour = await vscode.workspace.findFiles("public/manifest.json", "/node_modules/");

            if (maniTryFour.length > 0) {
              manifest = maniTryFour[0];
            }
          }
        }
      }
    }
  }
  
  return manifest;
}
