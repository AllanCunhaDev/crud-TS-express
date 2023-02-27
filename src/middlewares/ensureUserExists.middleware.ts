import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors/appErrors"
import { client } from "../database";

const ensureUserExistsMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const userId: number = parseInt(request.params.id);

    const queryStringUserExists: string = ` 
    SELECT 
    *
    FROM
    users
    WHERE
    id = $1;
    `
    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExists,
        values: [userId]
    }
    const queryResult: QueryResult = await client.query(queryConfigUserExists);

    if (queryResult.rowCount === 0) {
        throw new AppError("Usuario nao existente cara =/", 404)
    }
    return next()
}

export {
    ensureUserExistsMiddleware,
} 