import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "./appErrors";


const handleErrors = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }
    if(error instanceof ZodError) {
        return response.status(400).json({
            message: error.flatten().fieldErrors
        })
    }
    console.log(error)
    return response.status(500).json({
        message: "Erro no servidor"
    })
}

export default handleErrors