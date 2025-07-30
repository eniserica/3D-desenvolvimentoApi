import {DataTypes} from "sequelize";
import {conn} from "../conn.js";
import Usuario from "./Usuario.js";

const Restaurante = conn.define(
    "restaurante", 
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Usuario, 
                key: "id" 
            } 
        }
        
    },
    {
        tableName:"restaurante"
    }
)

//Associacao 1:N 
Usuario.hasMany(Restaurante, {foreignKey: "usuario_id"})
Restaurante.belongsTo(Usuario, {foreignKey: "usuario_id"})
export default Restaurante;