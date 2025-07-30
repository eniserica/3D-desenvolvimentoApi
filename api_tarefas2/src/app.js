import express from "express";
import cors from "cors";

import { conn } from "./sequelize.js";

//Tabelas
import tabelaSetor from "./setorTarefa.js";
import tabelaTarefa from "./tarefaTabela.js";

const PORT = 3333;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

//estabelecer conexão e criar as tabelas
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server http is running on PORT:${PORT}`);
    });
  })
  .catch((error) => console.log(error));


  const logRoutes = (request, response, next) => {
    const {url, method} = request
    const rota = `[${method.toUpperCase()}] - ${url}`
    console.log(rota)
    next()
  }


//Middleware GLOBAL
app.use(logRoutes)

  //middleware LOCAL -> NA ROTA
app.get("/tarefas", logRoutes, async (request, response) => {
  try {
    const tarefas = await tabelaTarefa.findAll();
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar tarefas",
    });
  }
});

//atualizar rota 
app.post("/tarefas", async (request, response) => {
  const { tarefa, descricao, situacao, setor_id  } = request.body;

  if (!tarefa || tarefa.length < 2) {
    response.status(400).json({
      erro: "Campo tarefa inválido",
      mensagen: "O campo tarefa deve ter 2 ou mais caracteres",
    });
    return;
  }
  if (!descricao) {
    response.status(400).json({
      erro: "Campo descricao inválido",
      mensagen: "O descricao não pode ser nulo",
    });
    return;
  }

    if (!situacao) {
    response.status(400).json({
      erro: "Campo situacao inválido",
      mensagen: "O situacao não pode ser nulo",
    });
    return;
  }

   if (!setor_id) {
    response.status(400).json({
      erro: "Campo setorId inválido",
      mensagen: "O setorId não pode ser nulo",
    });
    return;
  }

  const novaTarefa = {
    tarefa,
    descricao,
    situacao,
    setor_id
  };

  try {
    const tarefaCadastrada = await tabelaTarefa.create(novaTarefa);
    response.status(201).json({
      mensagem: "Tarefa cadastrada com sucesso",
      tarefaCadastrada,
    });
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao cadastrar tarefa",
    });
  }
});

app.get("/tarefas/:id", async (request, response) => {
  //listar um tarefa .findOne .findByPk
  const { id } = request.params;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }
    response.status(200).json(tarefaSelecionada);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar uma tarefa",
    });
  }
});

//atualizar rota
app.put("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  const { tarefa, descricao, situacao, setor_id } = request.body;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }
  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id);
    if (!tarefaSelecionada) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }

    //Salvar somente as informações que o usuário mandar
    if (tarefa !== undefined) {
      tarefaSelecionada.tarefa = tarefa;
    }
    if (descricao !== undefined) {
      tarefaSelecionada.descricao = descricao;
    }
    if (situacao !== undefined) {
      tarefaSelecionada.situacao = situacao;
    }
    if (setor_id !== undefined) {
      tarefaSelecionada.setor_id = setor_id;
    }
    await tarefaSelecionada.save();
    response.status(200).json({
      mensagem: "Tarefa selecionada",
      tarefa: tarefaSelecionada,
    });
  } catch (error) {}
});


//ok
//deletar setor primeiro do que a tarefa 
app.delete("/setores/:id", async(request, response)=>{
  const { id } = request.params;
  if(!id){
    response.status(400).json({mensagem: "ID Parâmetro inválido"})
    return
  }

  try {
    const setorSelecionado = await tabelaSetor.findByPk(id) 
    if(!setorSelecionado){
      response.status(404).json({
        erro: "Setor não encontrado",
        mensagem: `ID ${id} não existe no banco`
      })
      return
    }

    await tabelaSetor.destroy({
      where: {id: setorSelecionado.id}
    })
    response.status(204).send()
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao deletar um setor",
    });
  }

})
//att
app.delete("/tarefas/:id", async (request, response) => {
  const { id } = request.params;
  if(!id){
    response.status(400).json({mensagem: "ID Parâmetro inválido"})
    return
  }

  try {
    const tarefaSelecionada = await tabelaTarefa.findByPk(id) //{id, tarefa, descricao, sit, dtC, dtU} || null
    if(!tarefaSelecionada){
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `ID ${id} não existe no banco`
      })
      return
    }

    await tabelaTarefa.destroy({
      where: {id: tarefaSelecionada.id}
    })
    response.status(204).send()
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao deletar uma tarefa",
    });
  }

});

//***********Rotas de setor *****************/
// ok
app.get("/setores", async(request, response)=>{
    try {
    const setores = await tabelaSetor.findAll();
    response.status(200).json(setores);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar setores",
    });
  }
})

//ok
app.post("/setores", async(request, response)=>{
   const { nome } = request.body;

  if (!nome || nome.length < 2) {
    response.status(400).json({
      erro: "Campo Nome inválido",
      mensagen: "O campo nome deve ter 2 ou mais caracteres",
    });
    return;
  }

  const novoSetor = {
    nome
  };

  try {
    const setorCadastrado = await tabelaSetor.create(novoSetor);
    response.status(201).json({
      mensagem: "Setor cadastrado com sucesso",
      setorCadastrado,
    });
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao cadastrar setor",
    });
  }
})

//ok
app.get("/setores/:id", async(request, response)=>{
   const { id } = request.params;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }

  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({
        erro: "Setor não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }
    response.status(200).json(setorSelecionado);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar um setor",
    });
  }
})

//ok
app.put("/setores/:id", async(request, response)=>{
  const { id } = request.params;
  const { nome } = request.body;

  if (!id) {
    response.status(400).json({
      erro: "Parâmetro id Inválido",
    });
    return;
  }
  try {
    const setorSelecionado = await tabelaSetor.findByPk(id);
    if (!setorSelecionado) {
      response.status(404).json({
        erro: "Setor não encontrada",
        mensagem: `ID ${id} não existe`,
      });
      return;
    }

    if (nome !== undefined) {
      setorSelecionado.nome = nome;
    }
    
    await setorSelecionado.save();
    response.status(200).json({
      mensagem: "Setor selecionada",
      tarefa: setorSelecionado,
    });
  } catch (error) {
     response.status(500).json({
      erro: "Erro interno ao atualizar um setor",
    });
  }
})

//ROTAS EXTRAS 

//listar todas as tarefas pendentes/concluidas 
app.get("/tarefas/situacao/:situacao", async(request, response)=>{
  const { situacao } = request.params;

  if (!situacao) {
    response.status(400).json({
      erro: "Parâmetro Situação Inválido",
    });
    return;
  }

  // findAll({where:{situacao}}) -> retorna todas as tarefas no banco de dados com situacao tendo o valor igual ao que foi passado 
  try {
    const tarefas = await tabelaTarefa.findAll({where:{situacao}});
    if (tarefas.length === 0) {
      response.status(404).json({
        erro: "Tarefa não encontrada",
        mensagem: `nenhuma tarefa com situacao ${situacao}`,
      });
    
    }
    response.status(200).json(tarefas);
  } catch (error) {
    response.status(500).json({
      erro: "Erro interno ao listar uma tarefa por situação",
    });
  }
})

//listar tarefas vinculadas a setor
app.get("/setor/:id/tarefa", async(request, response)=>{

})

//middlewares
app.use((request, response) => {
  response.status(404).json({
    erro: "Erro de Rota",
    mensagem: "Rota não encontrada",
  });
});
