import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types";
import { MessageService } from "../services/message-service";

const messageService = new MessageService();

async function sendMessage(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const response = await messageService.sendMessage(req.body);
        return res.status(200).json({
            message: `Message Sent successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function fetchMessages(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const data = {
            chatId:parseInt(req.params.chatId),
        };
        const response = await messageService.fetchMessages(data);
        return res.status(200).json({
            message: `Messages fetched successfully`,
            success: true,
            data:response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}
export default { sendMessage,fetchMessages };