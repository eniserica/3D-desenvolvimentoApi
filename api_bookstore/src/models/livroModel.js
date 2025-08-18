import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const livroModel = conn.define(
    //nome da tabela
    "livros",
    //colunas da tabela
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ano_publicacao: {
            type: DataTypes.DATEONLY, //so o ano exemplo: 2025-08-18 
            allowNull: false
        },
        genero :{
            type: DataTypes.STRING,
            allowNull: false
        },
        quantidade_total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade_disponivel:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    //algumas configurações da tabela 
    {
        tableName: 'livros',
        timestamps: true,
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
);

export default livroModel; 