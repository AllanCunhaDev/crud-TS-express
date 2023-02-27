import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appErrors"
import jwt from "jsonwebtoken"
import "dotenv/config";


const verifyTokenMiddleware = (request: Request, response: Response, next: NextFunction) => {


    let token = request.headers.authorization
    if (!token) {
        throw new AppError("Falta o Token", 401)

    }
    token = token.split("")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (err, decode: any) => {
        if (err) {
            throw new AppError(err.message, 401)
        }
 
    })
    return next()
}

export default verifyTokenMiddleware