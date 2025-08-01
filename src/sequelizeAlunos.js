import {Sequelize} from 'sequelize';

export const conn = new Sequelize('alunos3D_2', 'root', '123456789',{
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
})


//testar conexao
// try {
//     await conn.authenticate()
//     console.log("MYSQL conectado com sucesso!")
// } catch (error) {
//     console.log("Erro ao conectar: ", error)
// }

export default conn;