import prismaService from "../config/dbConfig";
import {
    AddOrRemoveInGroupChatDto,
    CreateGroupChatDto,
    CreateOrAccessChatDto,
    UpdateGroupChatDto
} from "../dto/chat-dto";
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

    async updateChat(data:UpdateGroupChatDto){
        try {
            console.log(data);
            const chat = await prismaService.chat.findFirst({
                where:{
                    AND:[
                        {id:data.chatId},
                        {groupAdminId:data.loggedInUserId}
                    ]
                }
            })
            if (!chat){
                throw new Error("Chat not found OR you are not the group admin");
            }

            const updatedGroupChat = await prismaService.chat.update({
                where:{
                    id:data.chatId
                },
                data:{
                    chatName:data.newChatName
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true
                        }
                    }
                }
            });
            return updatedGroupChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    async addToGroup(data:AddOrRemoveInGroupChatDto){
        try {
            const chat = await prismaService.chat.findFirst({
                where:{
                    AND:[
                        {isGroupChat:true},
                        {id:data.chatId},
                        {groupAdminId:data.loggedInUserId}
                    ]
                }
            });

            if (!chat){
                throw new Error("Group chat does not exist OR you are not the admin");
            }

            const updatedChat = await prismaService.chat.update({
                where:{
                    id:chat?.id
                },
                data:{
                    users:{
                        connect:{id:data.userId}
                    }
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true
                        }
                    }
                }
            });
            return updatedChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

    async removeFromGroup(data:AddOrRemoveInGroupChatDto){
        try {
            const chat = await prismaService.chat.findFirst({
                where:{
                    AND:[
                        {isGroupChat:true},
                        {id:data.chatId},
                        {groupAdminId:data.loggedInUserId}
                    ]
                }
            });

            if (!chat){
                throw new Error("Group chat does not exist OR you are not the admin");
            }

            const updatedChat = await prismaService.chat.update({
                where:{
                    id:chat?.id
                },
                data:{
                    users:{
                        disconnect:{id:data.userId}
                    }
                },
                include:{
                    users:{
                        select:{
                            id:true,username:true,email:true,pic:true,isVerified:true
                        }
                    }
                }
            });
            return updatedChat;
        } catch (error) {
            console.log("Error occurred at chat repository layer ", (error as Error).message);
            throw error;
        }
    }

}

export default ChatRepository;