//Instruções para conectar com o banco de dados 
import { Sequelize } from 'sequelize';
                            //Banco      //user  //senha 
export const conn = new Sequelize('tarefas3D', 'root', '123456789',{
    host: 'localhost',
    dialect: 'mysql',
    port: "3306"
})

//testar conexao 
// try {
//     await conn.authenticate()
//     console.log("MYSQL conectado com sucesso!")
// } catch (error) {
//     console.log("Erro ao conectar: ", error)
// }

// export default conn;