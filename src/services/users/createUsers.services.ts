import { iUserRequest, iUserResult, iUserWithoutPassword } from "../../interfaces/users.interface"
import { client } from "../../database"
import format from "pg-format"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../errors/appErrors"
import { createUserSchema, returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";


const createUsersServices = async (userData: iUserRequest): Promise<iUserWithoutPassword> => {

    const validadeUserData = createUserSchema.parse(userData);
    

    const queryStringUserExists: string = `
    SELECT *
    FROM
    users
    WHERE
    email = $1;
    
    `
    const queryConfigUserExists: QueryConfig = {
        text: queryStringUserExists,
        values: [validadeUserData.email]
    }

    const queryResultUserExists: QueryResult = await client.query(queryConfigUserExists)
    if (queryResultUserExists.rowCount > 0) {
        throw new AppError( "E-mail already registered =(" , 409)
    }

    const queryString: string = format(
        `
        INSERT INTO
            users(%I)
        VALUES (%L)
            RETURNING *    
        `,
        Object.keys(validadeUserData),
        Object.values(validadeUserData)

    )
    const queryResult: iUserResult = await client.query(queryString);
    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

    return newUser

}
export { createUsersServices }