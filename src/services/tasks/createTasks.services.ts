import format from "pg-format";
import { client } from "../../database";
import { iLoginRequest } from "../../interfaces/login.interface"
import { createLoginSchema } from "../../schemas/login.schemas";




const createLoginServices = async (LoginData: iLoginRequest) => {

    const validatedLoginData = createLoginSchema.parse(LoginData)

    const queryString: string = format(
        `
          
        `,
        Object.keys(validatedLoginData),
        Object.values(validatedLoginData)
    )
    const queryResult = await client.query(queryString);

    return queryResult.rows[0];
}

export default createLoginServices