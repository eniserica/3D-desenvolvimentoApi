import {DataTypes} from "sequelize";
import {conn} from "./sequelizeAlunos.js";

const Alunos = conn.define(
    "alunos",
    {     
        ra: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        nome:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100] //tamanho do nome
            }
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true 
            }
        },
    },
    {
        tableName: "alunos",
    }
)


export default Alunos;


