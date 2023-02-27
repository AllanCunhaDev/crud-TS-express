import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureTokenIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    let token = request.headers.authorization;

    if (!token) {
        throw new AppError("Token is Missing", 401)
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {

        if (error) {
            throw new AppError(error.message, 401);

        }
        request.user = {
            id: parseInt(decoded.sub),
            role: (decoded.role),
            email: decoded.email
        }
        console.log(decoded)
    })

    return next();

}

export default ensureTokenIsValidMiddleware