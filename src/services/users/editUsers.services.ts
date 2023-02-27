import { QueryConfig } from "pg";
import { object } from "zod";
import { client } from "../../database";
import { AppError } from "../../errors/appErrors";
import { iUserRequest, iUserResult, iUserWithoutPassword } from "../../interfaces/users.interface";



const editUserService = async (userId: number, userData: iUserRequest): Promise<void> => {

    const keys = Object.keys(userData)
    const values = Object.values(userData)
    console.log(keys, values)

    if (Object.keys(userData).length === 0) {
        throw new AppError("No body data found", 401)
    }

    const setValues = keys.map((key, index) => `${key}=$${index + 2}`).join(', ')

    const queryString: string = ` 
    UPDATE
        users
    SET
        ${setValues}
    WHERE 
        id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId, ...values]
    }

    const queryResult: iUserResult = await client.query(queryConfig);
    console.log(queryResult)


}

export default editUserService