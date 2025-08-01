import express from 'express';
import cors from 'cors';

import { conn }from './sequelizeAlunos.js';

//tabelas 
import Alunos from './Alunos.js';
import Endereco from './Endereco.js';
import Responsaveis from './Responsaveis.js';


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


//alunos -> TUDO OK 
//ok
app.get("/alunos",async (request, response)=>{
    try{
        const alunos = await Alunos.findAll()
        response.status(200).json(alunos)
    }catch(error){
        response.status(500).json({mensagem: "Erro ao listar alunos"})
    }
})
//ok
app.post("/alunos", async (request, response)=>{
    const {ra, nome, email} = request.body; 
    if(!nome || nome.length < 2){
        response.status(400).json({
            erro: "Campo nome inválido", 
            mensagem : "O campo nome deve ter 2 ou mais caracteres"
        })
        return 
    }
    if(!ra){
        response.status(400).json({
            erro: "Campo ra inválido",
            mensagem: "O campo ra é obrigatório"
        })
        return
    }
    if(!email || !email.includes("@")){
        response.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email deve ser um email válido"
        })
        return
    }
    
    const novoAluno = {
        ra, 
        nome, 
        email
    }

    try{
        const alunoCadastrado = await Alunos.create(novoAluno)
        response.status(201).json({mensagem: "Aluno cadastrado com sucesso", aluno: alunoCadastrado})
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao cadastrar aluno",
            mensagem: error.message
        })
    };
})
//ok
app.get("/alunos/:id", async (request, response)=>{
    const {id} = request.params ;

    if(!id){
        response.status(400).json({error: "ID inválido"});
        return;
    }
    try{
        const alunoSelecionado = await Alunos.findByPk(id)
        if(!alunoSelecionado){
            response.status(404).json({
               error: "Aluno não encontrado",
               mensagem: `ID ${id} não existe` 
            })
            return
        }
        response.status(200).json(alunoSelecionado)
    }catch(error){
        response.status(500).json({ 
            erro: "Erro interno ao listar um aluno",
        });
    }
})
//ok
app.put("/alunos/:id", async(request, response)=>{
    const {id} = request.params;
    const {ra, nome, email} = request.body;

    if(!id){
        response.status(400).json({
            erro: "ID inválido"
        });
        return;
    }
    try{
        const alunoSelecionado = await Alunos.findByPk(id)
        if(!alunoSelecionado){
            response.status(404).json({
                erro: "Aluno não encontrado",
                mensagem: `ID ${id} não existe`
            });
            return;
        }

        if(nome !== undefined){
            alunoSelecionado.nome = nome;
        }
        if(ra !== undefined){
            alunoSelecionado.ra = ra;
        }
        if(email !== undefined){
            alunoSelecionado.email = email;
        }
        await alunoSelecionado.save();
        response.status(200).json({
            mensagem: "Aluno atualizado com sucesso",
            aluno: alunoSelecionado
        })

    }catch(error){
        console.log(error);
        response.status(500).json({
            erro: "Erro interno ao listar um aluno",
        })
}
})
//ok
app.delete("/alunos/:id", async (request, response)=>{
    const id = request.params.id;

    if(!id){
        response.status(400).json({mensagem: "ID inválido"})
        return
    }
    try{
        const alunoSelecionado = await Alunos.findByPk(id)
        if(!alunoSelecionado){
            response.status(404).json({
                error: "Aluno não encontrado",
                mensagem: `ID ${id} não existe`
            })
            return
        }
        await alunoSelecionado.destroy({
            where: {id: alunoSelecionado.id}
        })
        response.status(204).send()
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao deletar uma tarefa"
        })
    }
});

//enderecos -> TUDO OK 
//ok
app.get("/enderecos",async (request, response)=>{
    try{
        const endereco = await Endereco.findAll()
        response.status(200).json(endereco)
    }catch(error){
        response.status(500).json({mensagem: "Erro ao listar endereços"})
    }
})
//ok
app.post("/enderecos", async (request, response)=>{
    const {cep, rua, numero, bairro, cidade, estado, responsavel_id} = request.body; 
    if(!cep){
        response.status(400).json({
            erro: "Campo cep inválido",
            mensagem: "O campo cep é obrigatório"
        })
        return
    }
    if(!rua || rua.length < 2){
        response.status(400).json({
            erro: "Campo Rua inválido", 
            mensagem : "O campo rua deve ter 2 ou mais caracteres"
        })
        return 
    }
    if(!numero){
        response.status(400).json({
            erro: "Campo numero inválido",
            mensagem: "O campo numero é obrigatório"
        })
        return
    }
     if(!cidade){
        response.status(400).json({
            erro: "Campo cidade inválido",
            mensagem: "O campo cidade é obrigatório"
        })
        return
    }
     if(!estado){
        response.status(400).json({
            erro: "Campo estado inválido",
            mensagem: "O campo estado é obrigatório"
        })
        return
    }
     if(!bairro){
        response.status(400).json({
            erro: "Campo bairro inválido",
            mensagem: "O campo bairro é obrigatório"
        })
        return
    }
     if(!responsavel_id){
        response.status(400).json({
            erro: "Campo responsavel_id inválido",
            mensagem: "O campo responsavel_id é obrigatório"
        })
        return
    }

    
    const novoEndereco = {
        cep, 
        rua, 
        numero, 
        bairro, 
        cidade, 
        estado,
        responsavel_id
    }

    try{
        const enderecoCadastrado = await Endereco.create(novoEndereco)
        response.status(201).json({mensagem: "Endereco cadastrado com sucesso", endereco: enderecoCadastrado})
    }catch(error){
        console.log(error)
        response.status(500).json({
            erro: "Erro interno ao cadastrar endereco",
            mensagem: error
        })
    };
})
//ok
app.get("/enderecos/:id", async (request, response)=>{
    const {id} = request.params ;

    if(!id){
        response.status(400).json({error: "ID inválido"});
        return;
    }
    try{
        const enderecoSelecionado = await Endereco.findByPk(id)
        if(!enderecoSelecionado){
            response.status(404).json({
               error: "Endereco não encontrado",
               mensagem: `ID ${id} não existe` 
            })
            return
        }
        response.status(200).json(enderecoSelecionado)
    }catch(error){
        response.status(500).json({ 
            erro: "Erro interno ao listar um endereco",
        });
    }
})
//ok
app.put("/enderecos/:id", async(request, response)=>{
    const {id} = request.params;
    const {cep, rua, numero, bairro, cidade, estado, responsavel_id} = request.body;

    if(!id){
        response.status(400).json({
            erro: "ID inválido"
        });
        return;
    }
    try{
        const enderecoSelecionado = await Endereco.findByPk(id)
        if(!enderecoSelecionado){
            response.status(404).json({
                erro: "Endereco não encontrado",
                mensagem: `ID ${id} não existe`
            });
            return;
        }

        if(cep !== undefined){
            enderecoSelecionado.cep = cep;
        }
        if(rua !== undefined){
            enderecoSelecionado.rua = rua;
        }
        if(numero !== undefined){
            enderecoSelecionado.numero = numero;
        }
        if(bairro !== undefined){
            enderecoSelecionado.bairro = bairro;
        }
        if(cidade !== undefined){
            enderecoSelecionado.cidade = cidade;
        }
        if(estado !== undefined){
            enderecoSelecionado.estado = estado;
        }
        if(responsavel_id !== undefined){
            enderecoSelecionado.responsavel_id = responsavel_id;
        }

        await enderecoSelecionado.save();
        response.status(200).json({
            mensagem: "Endereco atualizado com sucesso",
            endereco: enderecoSelecionado
        })

    }catch(error){
        console.log(error);
        response.status(500).json({
            erro: "Erro interno ao listar um endereco",
        })
}
})
//ok
app.delete("/enderecos/:id", async (request, response)=>{
    const id = request.params.id;

    if(!id){
        response.status(400).json({mensagem: "ID inválido"})
        return
    }
    try{
        const enderecoSelecionado = await Endereco.findByPk(id)
        if(!enderecoSelecionado){
            response.status(404).json({
                error: "Endereco não encontrado",
                mensagem: `ID ${id} não existe`
            })
            return
        }
        await enderecoSelecionado.destroy({
            where: {id: enderecoSelecionado.id}
        })
        response.status(204).send()
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao deletar um endereco"
        })
    }
});

//responsaveis -> TUDO OK
//ok
app.get("/responsaveis",async (request, response)=>{
    try{
        const responsaveis = await Responsaveis.findAll()
        response.status(200).json(responsaveis)
    }catch(error){
        response.status(500).json({mensagem: "Erro ao listar responsaveis"})
    }
})
//ok
app.post("/responsaveis", async (request, response)=>{
    const {nome, idade, email, senha, telefone, grau_parentesco, dt_nascimento, aluno_id} = request.body; 
    if(!nome || nome.length < 2){
        response.status(400).json({
            erro: "Campo nome inválido", 
            mensagem : "O campo nome deve ter 2 ou mais caracteres"
        })
        return 
    }
    if(!idade){
        response.status(400).json({
            erro: "Campo idade inválido",
            mensagem: "O campo idade é obrigatório"
        })
        return
    }
    if(!email || !email.includes("@")){
        response.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email deve ser um email válido"
        })
        return
    }
    if(!senha){
        response.status(400).json({
            erro: "Campo senha inválido",
            mensagem: "O campo senha é obrigatório"
        })
        return
    }
    
    if(!telefone){
        response.status(400).json({
            erro: "Campo telefone inválido",
            mensagem: "O campo telefone é obrigatório"
        })
        return
    }

    if(!grau_parentesco){
        response.status(400).json({
            erro: "Campo grau_parentesco inválido",
            mensagem: "O campo grau_parentesco é obrigatório"
        })
        return
    }
    if(!dt_nascimento){
        response.status(400).json({
            erro: "Campo dt_nascimento inválido",
            mensagem: "O campo dt_nascimento é obrigatório"
        })
        return
    }
    if(!aluno_id){
        response.status(400).json({
            erro: "Campo aluno_id inválido",
            mensagem: "O campo aluno_id é obrigatório"
        })
        return
    }
    const novoResponsavel = {
       nome, 
       idade, 
       email, 
       senha, 
       telefone, 
       grau_parentesco, 
       dt_nascimento,
       aluno_id
    }

    try{
        const responsavelCadastrado = await Responsaveis.create(novoResponsavel)
        response.status(201).json({mensagem: "Responsavel cadastrado com sucesso", responsavel: responsavelCadastrado})
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao cadastrar responsavel",
            mensagem: error
        })
    };
})
//ok
app.get("/responsaveis/:id", async (request, response)=>{
    const {id} = request.params ;

    if(!id){
        response.status(400).json({error: "ID inválido"});
        return;
    }
    try{
        const responsavelSelecionado = await Responsaveis.findByPk(id)
        if(!responsavelSelecionado){
            response.status(404).json({
               error: "Responsavel não encontrado",
               mensagem: `ID ${id} não existe` 
            })
            return
        }
        response.status(200).json(responsavelSelecionado)
    }catch(error){
        response.status(500).json({ 
            erro: "Erro interno ao listar um resoonsavel",
        });
    }
})
//ok
app.put("/responsaveis/:id", async(request, response)=>{
    const {id} = request.params;
    const {nome, idade, email, senha, telefone, grau_parentesco, dt_nascimento, aluno_id} = request.body;

    if(!id){
        response.status(400).json({
            erro: "ID inválido"
        });
        return;
    }
    try{
        const responsavelSelecionado = await Responsaveis.findByPk(id)
        if(!responsavelSelecionado){
            response.status(404).json({
                erro: "Responsavel não encontrado",
                mensagem: `ID ${id} não existe`
            });
            return;
        }

        if(nome !== undefined){
            responsavelSelecionado.nome = nome;
        }
        if(idade !== undefined){
            responsavelSelecionado.idade = idade;
        }
        if(email !== undefined){
            responsavelSelecionado.email = email;
        }
        if(senha !== undefined){
            responsavelSelecionado.senha = senha;
        }
        if(telefone !== undefined){
            responsavelSelecionado.telefone = telefone;
        }
        if(grau_parentesco !== undefined){
            responsavelSelecionado.grau_parentesco = grau_parentesco;
        }

        if(dt_nascimento !== undefined){
            responsavelSelecionado.dt_nascimento = dt_nascimento;
        }

         if(aluno_id !== undefined){
            responsavelSelecionado.aluno_id = aluno_id;
        }
       

        await responsavelSelecionado.save();
        response.status(200).json({
            mensagem: "Responsavel atualizado com sucesso",
            responsavel: responsavelSelecionado
        })

    }catch(error){
        console.log(error);
        response.status(500).json({
            erro: "Erro interno ao listar um responsavel",
        })
}
})
//ok
app.delete("/responsaveis/:id", async (request, response)=>{
    const id = request.params.id;

    if(!id){
        response.status(400).json({mensagem: "ID inválido"})
        return
    }
    try{
        const responsavelSelecionado = await Responsaveis.findByPk(id)
        if(!responsavelSelecionado){
            response.status(404).json({
                error: "Responsavel não encontrado",
                mensagem: `ID ${id} não existe`
            })
            return
        }
        await responsavelSelecionado.destroy({
            where: {id: responsavelSelecionado.id}
        })
        response.status(204).send()
    }catch(error){
        response.status(500).json({
            erro: "Erro interno ao deletar um responavel"
        })
    }
});

//Transferir alunos entre responsáveis
app.put("/alunos/:id/transferir", async(request, response)=>{
    const {id} = request.params;
    const {aluno_id} = request.body;

    if (!id){
        response.status(400).json({
            erro: "ID do responsavel esta errado"
        })
    }
    if (!aluno_id){
        response.status(400).json({
            erro: "ID do aluno esta errado"
        })
    }

        try {
        const responsavelDestino = await Responsaveis.findByPk(id);
        if (!responsavelDestino) {
            response.status(404).json({
                erro: "Responsável não encontrado",
                mensagem: `ID ${id} não existe`
            });
            return;
        }

        responsavelDestino.aluno_id = aluno_id;
        await responsavelDestino.save();

        response.status(200).json({
            mensagem: "Aluno transferido com sucesso para o novo responsável",
            responsavel: responsavelDestino
        });
    } catch (error) {
        response.status(500).json({
            erro: "Erro interno ao transferir aluno"
        });
    }
})

app.use((request, response)=>{
    console.log(request)
    response.status(404).json({
        erro: "Erro de Rota",
        mensagem: "Rota não encontrada"
    })
})
app.listen(PORT, ()=>{
    console.log(`Server http is running on PORT: ${PORT}`)
})