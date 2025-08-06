import express from "express"
import cors from "cors"
import {conn} from "./config/sequelize.js";


//Tabelas 
import autorModel from "./models/autorModel.js";

// Rotas 
import autorRoutes from "./routes/autorRoutes.js"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json())

conn
    .sync()
    .then(()=>{
        console.log("Banco de dados conectado ")
    })
    .catch((error)=> console.log(error))

//Utilizando a rota 
app.use("/api", autorRoutes)
app.get("/", (request, response)=>{
    response.status(200).json({mensagem: "Olá, Mundo"})
})

export default app;

