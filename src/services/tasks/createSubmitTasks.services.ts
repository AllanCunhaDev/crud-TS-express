import format from "pg-format";
import { client } from "../../database";
import { iLoginRequest } from "../../interfaces/login.interface"


const createSubmitTasksServices = async (payload: any, tasksId: number) => {

    payload = {
        ...payload,
        tasksId,
    }
    const queryString: string = format(
        `
            INSERT INTO 
            user_tasks(%I)
            VALUES
                (%L)
            RETURNING *;    
        `,

        Object.keys(payload),
        Object.values(payload)
    )
    const queryResult = await client.query(queryString);

    return queryResult.rows[0];

}

export default createSubmitTasksServices;