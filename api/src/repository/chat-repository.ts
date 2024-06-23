import prismaService from "../config/dbConfig";
import {CreateGroupChatDto, CreateOrAccessChatDto} from "../dto/chat-dto";
import {BadRequestError} from "../utils/error-handler/AppError";

class ChatRepository{
    async createP2P(data:CreateOrAccessChatDto){
        try {
            // check if P2P chat already exists
            const existingChat = await prismaService.chat.findFirst({
                where:{
                    AND:[
                        {isGroupChat:false},
                        {users:{some:{id:data?.loggedInUserId}}},
                        {users:{some:{id:data.userId}}}
                    ]
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true,
                        }
                    }
                }
            });

            if (existingChat){
                return existingChat;
            }

            const chat = await prismaService.chat.create({
                data:{
                    chatName:'sender',
                    isGroupChat:false,
                    users:{
                        connect:[
                            {id:data?.loggedInUserId},
                            {id:data.userId}
                        ]
                    }
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true,
                        }
                    }
                }
            });
            return chat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }


    // for creating group chat
    async createGroup(data:CreateGroupChatDto){
        try {
            if (data.users.length<3){
                throw new BadRequestError("Atleast 3 users are required to create group chat");
            }
            const groupChat = await prismaService.chat.create({
                data:{
                    chatName:data.chatName,
                    isGroupChat:true,
                    groupAdminId:data?.loggedInUser?.id,
                    users:{
                        connect: data.users.map(userId=>({id:userId}))
                    }
                },
                include:{
                    users:{
                        select:{
                            id:true,email:true,username:true,pic:true,isVerified:true
                        }
                    }
                }
            });
            return groupChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    // for fetching all chats of logged in user
    async fetchChats(userId:number|undefined){
        try {
            const chats = await prismaService.chat.findMany({
                where:{
                    users:{
                        some:{
                            id:userId
                        }
                    }
                },
                include:{
                    users:{
                        select: {
                            id: true, username: true, email: true, pic: true, isVerified:true
                        }
                    }
                }
            });
            return chats;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

}

export default ChatRepository;