import { Request, Response } from "express";

import loginService from "../services/login/createLogin.services";

const createLoginController = async (request: Request, response: Response): Promise<Response> => {

    const newLogin = await loginService(request.body.email, request.body.password);

    return response.status(200).json(newLogin);

}



export {
    createLoginController,

}


