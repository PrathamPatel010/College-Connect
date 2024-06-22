import dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

export const PORT: number | string = process.env.PORT || 4000;
