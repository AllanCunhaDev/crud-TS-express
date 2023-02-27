import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                role: boolean;
                id: number,
                email: string
            }
        }
    }
}