import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig';
import {BadRequestError} from '../utils/error-handler/AppError';
import prismaService from '../config/dbConfig';
import {AuthenticatedRequest} from "../../types";

const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        let token = req.headers.authorization.split(' ')[1];
        const payload: any = jwt.verify(token, JWT_SECRET);
        const user = await prismaService.user.findUnique({
            where: { id: payload.id },
            select: { id: true, email: true, username: true, pic: true, isVerified: true }
        });
        if (!user) {
            throw new BadRequestError('Invalid Token');
        }
        req.user = user; // Assign user to req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }
};

export default authenticateUser;
