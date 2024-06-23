import { Response, NextFunction } from 'express';
import {AuthenticatedRequest} from "../../types";
import ChatService from "../services/chat-service";

const chatService = new ChatService();

async function createP2P(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const response = await chatService.createOrAccessChat(req.body.userId,req?.user?.id);
        return res.status(200).json({
            message: `Chat Created/Accessed successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function createGroup(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const response = await chatService.createGroupChat(req.body,req?.user);
        return res.status(201).json({
            message: `Group Chat created successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const response = await chatService.fetchChats(req?.user?.id);
        return res.status(200).json({
            message: `${response.length} chats fetched successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}
export default { createP2P,createGroup,getAll};