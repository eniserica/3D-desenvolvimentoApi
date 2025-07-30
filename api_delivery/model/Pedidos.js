import {DataTypes} from "sequelize";
import {conn} from "../conn.js";
import Usuario from "./Usuario.js";
import Restaurante from "./Restaurante.js";

const Pedidos = conn.define(
    "pedidos",
    {
        pedido:{
            type: DataTypes.STRING,
            allowNull:false 
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                  model: Usuario,
                  key: 'id',
            },
          
        },
        restaurante_id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            references:{
                model: Restaurante,
                key: "id",
            },
        },
    },
    {
        tableName: "pedidos"
    }
);
//1:N
Usuario.hasMany(Pedidos, {foreignKey: 'usuario_id'})
Pedidos.belongsTo(Usuario, {foreignKey: 'usuario_id'})

Restaurante.hasMany(Pedidos, {foreignKey: 'restaurante_id'})
Pedidos.belongsTo(Restaurante, {foreignKey: 'restaurante_id'})

export default Pedidos; 