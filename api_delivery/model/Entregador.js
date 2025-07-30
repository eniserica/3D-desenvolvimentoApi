import {DataTypes} from "sequelize";
import {conn} from "../conn.js";
import Usuario from "./Usuario.js";

const Entregador = conn.define(
    "entregador",
    {
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                  model: Usuario,
                  key: 'id',
            },
        }
    },
    {
        tableName: "entregador"
    }
)

Usuario.hasOne(Entregador, {foreignKey: 'usuario_id'})
Entregador.belongsTo(Usuario, {foreignKey:'usuario_id'}) 

export default Entregador ;