import { DataTypes } from "sequelize";
import { conn } from "../sequelize.js";

const chefModel = conn.define(
    "chefs",
    {
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        biografia:{
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidade:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        experiencia:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        nacionalidade:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'chefs',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default chefModel;