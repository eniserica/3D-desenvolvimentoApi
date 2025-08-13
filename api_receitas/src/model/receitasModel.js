import { DataTypes } from "sequelize";
import { conn } from "../sequelize.js";

import chefModel from "./chefModel.js"

const receitasModel = conn.define(
    "receitas",
    {
        titulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredientes:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        modoPreparo:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        tempoPreparo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        porcoes:{
            type: DataTypes.STRING,
            allowNull: false
        },
        dificuldade:{
            type: DataTypes.STRING,
            allowNull: false
        },
        chef_id:{
            type: DataTypes.STRING,
            allowNull: false,
                references:{
                    model: chefModel,
                    key: 'id'
                }
        }
    },
    {
        timestamps: true,
        tableName: 'receitas',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default receitasModel;