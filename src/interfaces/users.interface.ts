import { QueryResult } from "pg";
import { createUserSchema, returnUserSchema } from "../schemas/users.schemas";
import { z } from "zod";


type iUserRequest = z.infer<typeof createUserSchema>
type iUser = z.infer<typeof returnUserSchema>
type iUserWithPassword = z.infer<typeof returnUserSchema>


type iUserWithoutPassword = Omit<iUser, "password">;
type iUserResult = QueryResult<iUserWithoutPassword>;
type iUserResponse = QueryResult <iUserWithPassword>

export {

    iUserRequest,
    iUser,
    iUserWithoutPassword,
    iUserResult,
    iUserResponse
}





// interface iUserRequest {
//     name: string,
//     email: string,
//     password: string,
//     admin: boolean,
//     active: boolean
// }

// interface iUser extends iUserRequest {
//     id: number,

// }