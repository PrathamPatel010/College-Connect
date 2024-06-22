import {Request} from "express";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        username: string;
        pic: string | null;
        isVerified: boolean;
    };
}
