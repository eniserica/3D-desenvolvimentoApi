import express from 'express';
import {conn} from './conn.js';

//Tabelas 
import Usuario from './model/Usuario.js';
import Restaurante from './model/Restaurante.js';
import Produtos from './model/Produtos.js';
import Pedidos from './model/Pedidos.js';
import Avaliacao from './model/Avaliacao.js';
import Entregador from './model/Entregador.js';
import Entrega from './model/Entrega.js'
const PORT = 3333

const app = express();

conn.sync();


app.listen(PORT, ()=>{
    console.log("Servidor ON")
})