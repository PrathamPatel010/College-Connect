import prismaService from "../config/dbConfig";

export async function getChat(chatId: number) {
    const chat = await prismaService.chat.findUnique({
        where: {
            id: chatId,
        },
        include: {
            users: true, // Ensure users are included
        },
    });
    return chat;
}
