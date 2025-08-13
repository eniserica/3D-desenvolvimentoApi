import express from "express";
import cors from "cors";

import { conn } from "./sequelize.js";

//Tabelas 
import chefModel from "./models/chefModel.js";
import receitasModel from "./model/receitasModel.js"

//Rotas 
import chefRoutes from "./routes/chefRoutes.js"
import receitasRouter from "./routes/receitasRoutes.js"

const PORT = 3333;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server http is running on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const logRoutes = (request, response, next) => {
  const { url, method } = request;
  const rota = `[${method.toUpperCase()}] - ${url}`;
  console.log(rota);
  next();
};

app.use(logRoutes);

//Utilizando as ROTAS importadas   
app.use('/chefs', chefRoutes)
app.use('/receitas', receitasRouter)

app.use((request, response) => {
  response.status(404).json({
    erro: "Erro de Rota",
    mensagem: "Rota não encontrada",
  });
});