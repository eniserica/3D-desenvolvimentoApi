import { DataTypes } from "sequelize";
import {conn} from "./sequelize.js"; 

/**payload
 * {id, tarefa, descricao, situacao, created_at, updated_at}
 */

const tabelaTarefas = conn.define(
    "Tarefa",
    {
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tarefa: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true, 
                len: [2, 100]
            }

        },
        descricao:{
            type: DataTypes.STRING(255)
        },
        situacao: {
            type: DataTypes.ENUM("pendente", "concluido"),
            defaultValue: "pendente",
            allowNull: false
        },
    },
    {
        tableName: "tarefas",
        timestamps: true,
        createdAt: "create_at",
        updatedAt: "update_at",
    }
);

export default tabelaTarefas;