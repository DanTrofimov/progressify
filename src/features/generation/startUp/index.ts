import * as vscode from "vscode";
const shell = require("shelljs");

const REPO_INPUT_PROMPT: string =
  "Выберите название репозитория для PWA";
const DIR_INPUT_PROMPT: string = "Выберите директорию для PWA";
const REPO_INPUT_PLACEHOLDER: string = REPO_INPUT_PROMPT;
const NO_NAME_WARNING: string =
  "Не выбрано название репозитория";
const NO_GIT_WARNING: string =
  "Установка git обязательна, установить - https://git-scm.com/";
const NO_NPM_WARNING: string =
  "Установка npm обязательна, установить - https://www.npmjs.com/";
const STARTER_REPO_URI: string =
  "https://github.com/DanTrofimov/progressify-starter.git";

let repositoryName: string | undefined = undefined;
let repositoryParentURI: vscode.Uri | undefined = undefined;

const terminal = vscode.window.createTerminal();
const gitFileWatcher = vscode.workspace.createFileSystemWatcher(
  `**/${repositoryName}/.git/**`
);

export async function startUpPWA(): Promise<void> {
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
      prompt: REPO_INPUT_PROMPT,
      placeHolder: REPO_INPUT_PLACEHOLDER,
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
        title: DIR_INPUT_PROMPT,
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
  // for correct absolute paths
  changeDirectory('~/' + repositoryParentURI?.path.slice(1).split('/').slice(2).toString().replace(/,/g, '/'));
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
  return `git clone ${STARTER_REPO_URI} ${repositoryName}`;
}

function inputCanelledWarning(): void {
  vscode.window.showWarningMessage(NO_NAME_WARNING);
}

function noGitInstalledWarning(): void {
  vscode.window.showWarningMessage(NO_GIT_WARNING);
}

export function noNpmInstalledWarning(): void {
  vscode.window.showWarningMessage(NO_NPM_WARNING);
}