import dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

export const PORT: number | string = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || "MyJWTSecret";
export const FRONTEND_URL = process.env.FRONTEND_URL;