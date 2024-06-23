import 'colors';
import ChatRepository from "../repository/chat-repository";
import {User} from "@prisma/client";
import {LoggedInUserDto} from "../dto/user-dto";

const chatRepo = new ChatRepository();

class UserService {
    async createOrAccessChat(userId:number,loggedInUserId:number|undefined) {
        try {
            const response = await chatRepo.createP2P({userId,loggedInUserId});
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async createGroupChat(requestBody:{chatName:string,users:number[]},loggedInUser:LoggedInUserDto|undefined) {
        try {
            const {chatName,users} = requestBody;
            const response = await chatRepo.createGroup({chatName,users,loggedInUser});
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async fetchChats(userId:number|undefined) {
        try {
            const response = await chatRepo.fetchChats(userId);
            return response;
        } catch (error) {
            console.log(`Error occurred at chat service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}

export default UserService;
