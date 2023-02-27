import { client } from "../../database";
import { compare } from "bcryptjs";
import { iUserResponse } from "../../interfaces/users.interface"
import { AppError } from "../../errors/appErrors"
import jwt from "jsonwebtoken";
import "dotenv/config";



const loginService = async (email: string, password: string) => {
    const queryString: string = ` 
        SELECT
            *
        FROM
            users
        WHERE
            email = $1    
    
    `
  
    const queryResult: iUserResponse = await client.query(queryString, [email]);

    if (queryResult.rowCount === 0) {
        throw new AppError("Wrong email/password", 401)
    }
    const matchPassword: boolean = await compare(password, queryResult.rows[0].password);
   
    if (matchPassword) {
        throw new AppError("Wrong email/password", 401)
    }
    const token: string = jwt.sign({
        role: queryResult.rows[0].admin
    },
        process.env.SECRET_KEY!,
        {
            subject: queryResult.rows[0].id.toString(),
            expiresIn: "30m"
        })

    return {token}
}

export default loginService