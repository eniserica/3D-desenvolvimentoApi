import express from 'express';
import cors from 'cors';

import { conn }from './sequelize.js';
import tabelaTarefas from './tarefaTabela.js';

const PORT = 3333;

const app = express();

app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

})
);
app.use(express.json());

//estabelecer conexao e criar as tabelas 
conn
    .sync()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server http is running on PORT: ${PORT}`);
        });
    })
    .catch((error)=>console.log(error))


    const logRoutes = (request, response, next ) =>{
        const {url, method} = request
        const rota = `[${method.toUpperCase()}] - ${url}`
        console.log(rota)
        next()
    }

//middleware global 
app.use(logRoutes);

    //middlewares LOCAL -> NA ROTA 
app.get("/tarefas", logRoutes, async (request, response)=>{
    try{
        const tarefas = await tabelaTarefas.findAll()
        response.status(200).json(tarefas)
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao listar tarefas"
        })
    }
});
app.post("/tarefas",async (request, response)=>{
    const {tarefa, descricao} = request.body;
    if(!tarefa || tarefa.length < 2){
        response.status(400).json({
            erro: "Campo tarefa inválido", 
            mensagem : "O campo tarefa deve ter 2 ou mais caracteres"
        })
        return
    }
    if(!descricao){
        response.status(400).json({
            erro: "Campo descricao inválido", 
            mensagem: "O descricao não pode ser nulo"
        });
        return; 
    }

    const novaTarefa = {
        tarefa,
        descricao
    }
    try{
        const tarefaCadastrada = await tabelaTarefas.create(novaTarefa)
        response.status(201).json({mensagem: "Tarefa cadastrada com sucesso!", tarefa: tarefaCadastrada})
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao cadastrar tarefa",
            mensagem: error.message
        })
    };
})
app.get("/tarefas/:id",(request, response)=>{
    //listar uma tarefa .findOne .findByPk 
    const { id } = request.params; 

    if(!id){
        response.status(400).json({error: "ID inválido"});
        return;
    }
    try {
        const tarefaSelecionada = tabelaTarefas.findByPk(id)
        if(!tarefaSelecionada){
            response.status(404).json({
                error: "Tarefa não encontrada",
                mensagem: `ID ${id} não existe`
            })
            return
        }
        response.status(200).json(tarefaSelecionada)
    } catch (error) {
        response.status(500).json({
            erro: "Erro interno ao listar uma tarefa",
        });
    }
})
app.put("/tarefas/:id",async (request, response)=>{
    const {id}  = request.params;
    const {tarefa, descricao, situacao}= request.body;

      if(!id){
        response.status(400).json({
            erro: "ID inválido"
        });
        return;
    }
    try {
         const tarefaSelecionada = tabelaTarefas.findByPk(id)
        if(!tarefaSelecionada){
            response.status(404).json({
                erro: "Tarefa não encontrada",
                mensagem: `ID ${id} não existe`
            });
            return;
        }

        //Salvar somente as informações que o usuário mandar 
        if(tarefa !== undefined){
            tarefaSelecionada.tarefa = tarefa;
        }
        if(descricao !== undefined){
            tarefaSelecionada.descricao = descricao;
        }
        if(situacao !== undefined){
            tarefaSelecionada.situacao = situacao;
        }
        await tarefaSelecionada.save(); //pra salvar automaticamente as alterações no banco de dados
        response.status(200).json({
            mensagem: "Tarefa selecionada",
            tarefa: tarefaSelecionada
        })
    } catch (error) {
        response.status(500).json({
            erro: "Erro interno ao listar uma tarefa",
        });
    }
})
app.delete("/tarefas/:id",async(request, response)=>{
    const id = request.params.id // {id: 45}
    // const {id} = request.params; // {id: 45}
    if(!id){
        response.status(400).json({mensagem: "ID Parâmetro inválido"})
        return
    }
    try{
        const tarefaSelecionada = await tabelaTarefas.findByPk(id) //na tabela tarefas procurar o id por chave primaria -> retorna um objeto {id, tarefa,descricao, situacao, dtCriacao,dtAtualizacao}
        //verificar se a tarefa existe no banco de dados 
        if(!tarefaSelecionada){
            response.status(404).json({
                erro: "Tarefa não encontrada",
                mensagem: `ID ${id} não existe no banco de dados`
            })
            return
        }
        // se a tarefa existir...

        await tabelaTarefas.destroy({
            where: {id:tarefaSelecionada.id}
        })
        response.status(204).send() //204 é o código de sucesso para deletar algo, não retorna nada no body
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao deletar uma tarefa"
        });
    }
});

//middlewares 
app.use((request, response)=>{
    response.status(404).json({
        erro: "Erro de Rota",
        mensagem: "Rota não encontrada"
    })
})


app.listen(PORT, ()=>{
    console.log(`Server http is running on PORT: ${PORT}`)
})















































































