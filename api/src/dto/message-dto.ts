export type SendMessageDTO = {
    content: string,
    sender: number,
    chatId: number,
}

export type FetchMessagesDTO = {
    chatId:number,
}