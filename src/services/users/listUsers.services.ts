import {client} from "../../database";

const listUsersServices = async ()=>{
    const queryString = `
        SELECT * FROM users ;
    `
    const queryResult = await client.query(queryString);
    
    return queryResult.rows
}

export default listUsersServices
 
