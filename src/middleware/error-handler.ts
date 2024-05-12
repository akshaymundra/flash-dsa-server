import { Request, Response, NextFunction } from "express";

class HttpException extends Error {
    status: number;
    error: {};

    constructor(status: number, message: string, error: {}) {
        super(message);
        this.status = status;
        this.error = error;
    }
}

const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = res.statusCode ? res.statusCode : (error.status ? error.status : 500);
    const message = error.message ? error.message : "Something went wrong";
    res.status(status).json({ status, message, success: false });
}

export default errorHandler;