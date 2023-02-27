import app from "./app";
import "dotenv/config"
import { connectDatabase } from "./database"

app.listen(3000,async ()=>{
    await connectDatabase();
    console.log("Servidor rodando na 3000")
})