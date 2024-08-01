import { Chat, User } from "../Context/ChatProvider";

export interface Error {
    message: string,
}

export interface Message {
    chat?: Chat,
    chatId?: number,
    content: string,
    id: number,
    sender: User,
    senderId: number,
}