export enum Command {
    update ='update_preview',
    updateBaseIcon = 'update-base-icon',
    chooseBaseIcon = 'choose-base-icon',
    generateManifest = 'generate-manifest'
}

export interface Message<Payload = string> {
    command: Command
    payload: any
}