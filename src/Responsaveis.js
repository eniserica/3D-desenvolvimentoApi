import {DataTypes} from "sequelize";
import {conn} from "./sequelizeAlunos.js";
import Alunos from "./Alunos.js"


const Responsaveis = conn.define(
    "responsaveis",
    {
        nome:{
            type:DataTypes.STRING(200),
            allowNull:false,
        },

        idade:{
            type:DataTypes.INTEGER,
            allowNull:false,
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
        senha:{
            type: DataTypes.STRING(10),
            allowNull:false,
        },
        telefone:{
            type: DataTypes.STRING(15),
            allowNull:false,
        },
        grau_parentesco:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        dt_nascimento:{
            type:DataTypes.DATE,
            allowNull:false
        },
        aluno_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Alunos,
                key: "id",
            },
        }
        
    },
    {
        tableName: 'responsaveis',
    },
)

Alunos.hasOne(Responsaveis, {foreignKey: "aluno_id"});
Responsaveis.belongsTo(Alunos, {foreignKey: "aluno_id"});

Responsaveis.hasMany(Alunos, {foreignKey: "aluno_id"});
Alunos.belongsTo(Responsaveis, {foreignKey: "aluno_id"})


export default Responsaveis;


