import {DataTypes} from "sequelize";
import {conn} from "../conn.js";
import Restaurante from "./Restaurante.js";

const Produtos = conn.define(
    "produtos",
    {
        nome:{
            type: DataTypes.STRING,
            allowNull:false
        },
        restaurante_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Restaurante, 
                key: "id" 
            } 
        }
        
    },
    {
        tableName: "produtos"
    }
)

//Associacao 1:N 
Restaurante.hasMany(Produtos, {foreignKey: "restaurante_id"})
Produtos.belongsTo(Restaurante, {foreignKey: "restaurante_id"})
export default Produtos;