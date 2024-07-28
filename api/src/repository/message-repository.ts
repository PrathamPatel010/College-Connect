import prismaService from "../config/dbConfig";
import {FetchMessagesDTO, SendMessageDTO} from "../dto/message-dto";

export class MessageRepository {
    async send(messageData:SendMessageDTO) {
        try {
            const response = await prismaService.message.create({
                data:{
                    content:messageData.content,
                    chatId:messageData.chatId,
                    senderId:messageData.sender,
                },
                select:{
                    id:true,content:true,chatId:true,senderId:true,
                    sender:true,
                    chat:{
                        select:{
                            users:true,
                        }
                    }
                }
            });
            await prismaService.chat.update({
                where:{
                    id:messageData.chatId,
                },
                data:{
                    latestMessage:response.id,
                }
            });
            return response;
        } catch (error) {
            console.log("Error occurred at message repository layer ", (error as Error).message);
            throw error;
        }
    }


    // return messages based on chat id
    async fetch(data: FetchMessagesDTO) {
        try {
            const messages = await prismaService.message.findMany({
                where: {
                    chatId: data.chatId,
                },
                select: {
                    id: true,
                    chatId: true,
                    content: true,
                    senderId: true,
                    sender: true,
                    chat: {
                        select: {
                            users: true,
                            latestMessage: true,
                        },
                    },
                },
            });
            const latestMessage = await prismaService.message.findUnique({
                where:{
                    id: messages[0].chat?.latestMessage || undefined,
                },
                select:{
                    id:true,sender:true,content:true
                }
            });
            return {messages,latestMessage};
        } catch (error) {
            console.log("Error occurred at message repository layer ", (error as Error).message);
            throw error;
        }
    }

}