import {DataTypes} from "sequelize";
import {conn} from "./sequelizeAlunos.js";
import Responsaveis from "./Responsaveis.js";


const Endereco = conn.define(
    "endereco",
    {
        cep: {
            type: DataTypes.INTEGER,
            allowNull:false, 
            unique: true
            },

        rua:{
            type: DataTypes.STRING(100),
            allowNull:false, 
        },

        numero:{
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        
        bairro:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        cidade:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        estado:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        responsavel_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Responsaveis,
                key: "id",
            },
        },
    },
    {
        tableName: 'endereco',
    },
)
    
Responsaveis.hasMany(Endereco, {foreignKey:"responsavel_id"});
Endereco.belongsTo(Responsaveis, {foreignKey:"responsavel_id"});


export default Endereco;


