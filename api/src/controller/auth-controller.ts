import AuthService from "../services/auth-service";
import {NextFunction, Request, Response} from 'express';
const authService = new AuthService();

async function signUp(req: Request, res: Response,next:NextFunction) {
    try {
        const response = await authService.signUpUser(req.body);
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(`Error occurred at Auth controller in signup`);
        next(error);
    }
}

async function signIn(req: Request, res: Response,next:NextFunction) {
    try {
        const response = await authService.signInUser(req.body);
        return res.status(200).json({
            message: 'User Signed-in successfully',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(`Error occurred at Auth controller in signup`);
        next(error);
    }
}

export default {signUp,signIn};