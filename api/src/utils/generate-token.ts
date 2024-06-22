import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig';

function generateToken(tokenData: any): string {
    try {
        const token = jwt.sign(tokenData, JWT_SECRET);
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { generateToken };
