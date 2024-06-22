import { Response, NextFunction } from 'express';
import UserService from '../services/user-service';
import {AuthenticatedRequest} from "../../types";

const userService = new UserService();

async function searchUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const response = await userService.searchUsers(req.query,req.user);
        return res.status(200).json({
            message: `${response.length} Users fetched successfully`,
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}
export default { searchUsers };