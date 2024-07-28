import { MessageRepository } from "../repository/message-repository";
import {FetchMessagesDTO, SendMessageDTO} from "../dto/message-dto";

const repo = new MessageRepository();

export class MessageService {
    async sendMessage(requestBody:SendMessageDTO) {
        try {
            const response = await repo.send(requestBody);
            return response;
        } catch (error) {
            console.log(`Error occurred at message service layer ${(error as Error)}`.red);
            throw error;
        }
    }

    async fetchMessages(requestBody:FetchMessagesDTO) {
        try {
            const response = await repo.fetch(requestBody);
            return response;
        } catch (error) {
            console.log(`Error occurred at message service layer ${(error as Error)}`.red);
            throw error;
        }
    }
}
