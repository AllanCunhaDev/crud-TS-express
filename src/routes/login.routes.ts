import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers"
import { validatedBodyMiddleware } from "../middlewares/validatedBodyUser.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router()

loginRoutes.post("",validatedBodyMiddleware(createLoginSchema), createLoginController);


export default loginRoutes;

