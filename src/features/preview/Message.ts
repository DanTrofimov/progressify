export enum Command {
    update ='update_preview'
}

export interface IMessage {
    command: Command
    payload: string
}