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