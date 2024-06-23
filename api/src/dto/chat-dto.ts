import {User} from "@prisma/client";
import {LoggedInUserDto} from "./user-dto";

export type CreateOrAccessChatDto = {
    loggedInUserId:number|undefined,
    userId:number,
}

export type CreateGroupChatDto = {
    chatName: string,
    users: number[],
    loggedInUser:LoggedInUserDto|undefined,
}

export type UpdateGroupChatDto = {
    chatId:number,
    newChatName:string,
    loggedInUserId?:number,
}

export type AddOrRemoveInGroupChatDto = {
    chatId:number,
    userId:number,
    loggedInUserId:number|undefined
}