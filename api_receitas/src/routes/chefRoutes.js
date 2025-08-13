// GET    /api/chefs           - Listar todos os chefs OK
// GET    /api/chefs/:id       - Buscar chef por ID OK
// POST   /api/chefs           - Criar novo chef OK
// PUT    /api/chefs/:id       - Atualizar chef OK
// DELETE /api/chefs/:id       - Deletar chef OK 

import {Router} from "express";
import chefModel from "../models/chefModel.js";

const router = Router();

router.get("/", async (request, response) =>{
    try{
        const chefs = await chefModel.findAll();
        response.status(200).json(chefs);
    }catch(error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno ao listar chefs"})
    }
}) 

router.post("/", async (request, response) =>{
    const {nome, biografia, especialidade, experiencia, nacionalidade} = request.body;
    console.log(nome)
    if(!nome || nome.length < 2){
        response.status(400).json({mensagem: "Campo nome inválido, deve ter 2 ou mais caracteres"});
        return;
    }
    if(!biografia){
        response.status(400).json({mensagem: "Campo biografia é obrigatório"})
        return;
    }
    if(!especialidade){
        response.status(400).json({mensagem: "Campo especialidade é obrigatório"})
        return;
    }
    if(!experiencia){
        response.status(400).json({mensagem: "Campo experiencia é obrigatório"})
        return;
    }
    if(!nacionalidade){
        response.status(400).json({mensagem: "Campo nacionalidade é obrigatório"})
        return;
    }

    try{
        const chefCriado = await chefModel.create({
            nome,
            biografia,
            especialidade,
            experiencia,
            nacionalidade
        });
        response.status(201).json(chefCriado);

    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno ao cadastrar chef "})
    }
}) 
router.get("/:id", async (request, response) =>{
    const {id} = request.params;

    if(!id){
        response.status(400).json({mensagem: "id inválido"})
        return;
    }

    try{
        const chefSelecionado = await chefModel.findByPk(id);
        if(!chefSelecionado){
            response.status(404).json({mensagem: "Chef não identificado"})
            return;
        }

        response.status(200).json(chefSelecionado);
    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno ao buscar chef por id "})
    }
}) 
router.put("/:id", async (request, response) =>{
    const {id} = request.params;
    const {nome, biografia, especialidade, experiencia, nacionalidade} = request.body

    if(!id) {
        response.status(400).json({mensagem: "id inválido"})
        return;
    }

    try{
        const chefSelecionado = await chefModel.findByPk(id);
        if(!chefSelecionado){
            response.status(404).json({mensagem: "Chef não encontrado"})
            return;
        }

        if(nome !== undefined){
            chefSelecionado.nome = nome ; 
        }
        if(biografia !== undefined){
            chefSelecionado.biografia = biografia ; 
        }
        if(especialidade !== undefined){
            chefSelecionado.especialidade = especialidade ; 
        }
        if(experiencia !== undefined){
            chefSelecionado.experiencia = experiencia ; 
        }
        if(nacionalidade !== undefined){
            chefSelecionado.nacionalidade = nacionalidade ; 
        }

        await chefSelecionado.save();
        response.status(200).json({mensagem: "Chef atualizado com sucesso"})
    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno a atualizar chef"})
    }
}) 
router.delete("/:id", async (request, response) =>{
    const {id } = request.params;

    if(!id){
        response.status(400).json({mensagem: "id inválido"})
        return
    }

    try{
        const chefSelecionado = await chefModel.findByPk(id);
        if(!chefSelecionado){
            response.status(404).json({mensagem: "Chef não identificado"})
            return
        }

        await chefModel.destroy({
            where: {id: chefSelecionado.id}
        })

        response.status(204).send()
    }catch(error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno ao excluir chef"})
    }
}) 

export default router;