import { QueryConfig, QueryResult } from "pg";
import { iUserWithoutPassword, iUserResult } from "../../interfaces/users.interface";
import { client } from "../../database"



const retriveUsersController = async (userId: number): Promise<iUserWithoutPassword> => {

    const queryString: string = `
    SELECT id, name, email, admin, active
    FROM
    users
    WHERE
    id = $1
    ;
    `
    const queryConfig: QueryConfig = {

        text: queryString,
        values: [userId]
    }

    const queryResult: iUserResult = await client.query(queryConfig);
    return queryResult.rows[0];


}

export default retriveUsersController