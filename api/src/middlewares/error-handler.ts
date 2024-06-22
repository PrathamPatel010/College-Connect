import { Request, Response, NextFunction } from 'express';
import {AppError} from '../utils/error-handler/AppError';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        const appError = err as AppError;
        res.status(appError.statusCode).json({
            status: appError.status,
            message: appError.message,
            error: appError
        });
    } else {
        // Unknown or unexpected error, send generic error response
        console.error('Unhandled Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
            error: {
                message: err.message
            }
        });
    }
}

export default errorHandler;
