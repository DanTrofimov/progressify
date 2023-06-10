import * as vscode from "vscode";
const shell = require("shelljs");

const repositoryInputPrompt: string =
  "Выберите название репозитория для PWA";
const directoryInputPrompt: string = "Выберите директорию для PWA";
const repositoryInputPlaceholder: string = repositoryInputPrompt;
const noNameSelectedWarning: string =
  "Не выбрано название репозитория, процесс генерации базовой структуры приостановлен";
const noGitWarning: string =
  "Установка git обязательна, установить - https://git-scm.com/";
const noNpmWarning: string =
  "Установка npm обязательна, установить - https://www.npmjs.com/";
const starterRepositoryURI: string =
  "https://github.com/pwa-builder/pwa-starter.git";

let repositoryName: string | undefined = undefined;
let repositoryParentURI: vscode.Uri | undefined = undefined;

const terminal = vscode.window.createTerminal();
const gitFileWatcher = vscode.workspace.createFileSystemWatcher(
  `**/${repositoryName}/.git/**`
);

export async function setUpLocalPwaStarterRepository(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await getRepositoryInfoFromInput();

    if (repositoryName && repositoryParentURI) {
      try {
        initStarterRepository();
        openRepositoryWithCode();
        setupLocalRepository();

        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
}

async function getRepositoryInfoFromInput(): Promise<void> {
  await getRepositoryNameFromInputBox()
    .then(getRepositoryDirectoryFromDialog)
    .catch(inputCanelledWarning);
}

async function getRepositoryNameFromInputBox(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    repositoryName = await vscode.window.showInputBox({
      prompt: repositoryInputPrompt,
      placeHolder: repositoryInputPlaceholder,
    });

    repositoryName ? resolve() : reject();
  });
}

async function getRepositoryDirectoryFromDialog(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    let directories: vscode.Uri[] | undefined =
      await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        title: directoryInputPrompt,
      });

    if (directories) {
      repositoryParentURI = directories[0];
      resolve();
    } else {
      reject();
    }
  });
}

function initStarterRepository(): void {
  terminal.show();
  changeDirectory(repositoryParentURI?.path.slice(1));
  if (tryCloneFromGithub()) {
    tryNpmInstall();
  }
}

function openRepositoryWithCode(): void {
  let workspaceChangeDisposable: vscode.Disposable =
    vscode.workspace.onDidChangeWorkspaceFolders(removeGitFolderListener);

  gitFileWatcher.onDidDelete(() => {
    workspaceChangeDisposable.dispose();
    gitFileWatcher.dispose();
  });

  terminal.sendText(`code ${repositoryName}`);
}

function removeGitFolderListener(): any {
  if (vscode.workspace.workspaceFolders) {
    let i = 0;
    while (i < vscode.workspace.workspaceFolders.length) {
      if (vscode.workspace.workspaceFolders[i].name == repositoryName) {break;}
      i++;
    }
    vscode.workspace.fs.delete(
      vscode.Uri.file(
        `${vscode.workspace.workspaceFolders[i].uri.fsPath}/.git`
      ),
      { recursive: true }
    );
  }
}

function tryNpmInstall(): boolean {
  let didNpmInstall: boolean = true;
  if (isNpmInstalled()) {
    npmInstall();
  } else {
    noNpmInstalledWarning();
    didNpmInstall = false;
  }
  return didNpmInstall;
}

function npmInstall(): void {
  changeDirectory(repositoryName);
  terminal.sendText("npm install");
  changeDirectory("..");
}

function changeDirectory(pathToDirectory: string | undefined): void {
  terminal.sendText(`cd ${pathToDirectory}`);
}

export function isNpmInstalled(): boolean {
  let isNpmInstalled: boolean = true;

  if (!shell.which("npm")) {
    isNpmInstalled = false;
  }

  return isNpmInstalled;
}

function tryCloneFromGithub(): boolean {
  let wasCloned: boolean = true;
  if (isGitInstalled()) {
    cloneFromGithub();
  } else {
    noGitInstalledWarning();
    wasCloned = false;
  }

  return wasCloned;
}

function cloneFromGithub(): void {
  terminal.sendText(cloneCommand());
}

function setupLocalRepository(): void {
  changeDirectory(repositoryName);
  terminal.sendText("git init .");
  terminal.sendText("git add .");
  terminal.sendText('git commit -m "Инициализация PWA"');
}

function isGitInstalled(): boolean {
  let isGitInstalled: boolean = true;

  if (!shell.which("git")) {
    isGitInstalled = false;
  }

  return isGitInstalled;
}

function cloneCommand(): string {
  return `git clone ${starterRepositoryURI} ${repositoryName}`;
}

function inputCanelledWarning(): void {
  vscode.window.showWarningMessage(noNameSelectedWarning);
}

function noGitInstalledWarning(): void {
  vscode.window.showWarningMessage(noGitWarning);
}

export function noNpmInstalledWarning(): void {
  vscode.window.showWarningMessage(noNpmWarning);
}