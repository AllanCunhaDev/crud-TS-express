import { Router } from "express";
import {
    createUsersController,
    deleteUserController,
    editUserController,
    listUsersControllers,
    retriveUsersController
} from "../controllers/user.controllers";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { validatedBodyMiddleware } from "../middlewares/validatedBodyUser.middleware"
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import verifyTokenMiddleware from "../middlewares/verifyTokenExists.middlware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserAdminMiddleware from "../middlewares/ensureUserAdmin.middleware";


const userRoutes: Router = Router();

userRoutes.post("", validatedBodyMiddleware(createUserSchema), createUsersController);
userRoutes.get("", ensureTokenIsValidMiddleware, ensureUserAdminMiddleware, listUsersControllers)
userRoutes.get("/profile", ensureTokenIsValidMiddleware, retriveUsersController)
userRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureUserExistsMiddleware,validatedBodyMiddleware(updateUserSchema),editUserController)
userRoutes.delete("/:id", ensureUserExistsMiddleware, ensureUserExistsMiddleware, deleteUserController)
userRoutes.put("/:id/recover", ensureTokenIsValidMiddleware, ensureUserAdminMiddleware, ensureUserExistsMiddleware)


export default userRoutes 