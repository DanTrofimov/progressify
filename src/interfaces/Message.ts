export enum Command {
    update ='update_preview',
    updateBaseIcon = 'update-base-icon',
    
}

export interface IMessage {
    command: Command
    payload: string
}