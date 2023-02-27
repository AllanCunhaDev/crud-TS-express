import { Request, Response } from "express";
import { createUsersServices } from "../services/users/createUsers.services"
import { iUserRequest, iUserWithoutPassword } from "../interfaces/users.interface"
import retriveUserServices from "../services/users/retriveUsers.services"
import deleteUserService from "../services/users/deleteUsers.services"
import listUsersServices from "../services/users/listUsers.services";
import editUserService from "../services/users/editUsers.services";




const createUsersController = async (request: Request, response: Response): Promise<Response> => {


    const userData: iUserRequest = request.body


    const newUser: iUserWithoutPassword = await createUsersServices(userData);


    return response.status(201).json(newUser)




}
const listUsersControllers = async (request: Request, response: Response): Promise<Response> => {


    const data = await listUsersServices();

    return response.status(200).json(data);


}

const retriveUsersController = async (request: Request, response: Response): Promise<Response> => {


    const userId: number = request.user.id

    const user = await retriveUserServices(userId);

    return response.status(200).json(user)


}

const deleteUserController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = parseInt(request.params.id);

    await deleteUserService(userId);

    return response.status(204).send()
}
const editUserController = async (request: Request, response: Response): Promise<Response> => {
    
    const userId: number = parseInt(request.params.id);
    const userData : iUserRequest = request.body

    await editUserService(userId, userData);

    return response.status(204).send()
}
export {
    createUsersController,
    retriveUsersController,
    deleteUserController,
    listUsersControllers,
    editUserController
}