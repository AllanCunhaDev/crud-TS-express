import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appErrors"

const ensureUserAdminMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const typeUser = request.user
    console.log(typeUser)

    if(typeUser.role === false){
        throw new AppError("Sem permissão de ADM",404)
    }

}
export default ensureUserAdminMiddleware