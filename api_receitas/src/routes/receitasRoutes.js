// GET    /api/receitas            - Listar todas as receitas
// GET    /api/receitas/:id        - Buscar receita por ID
// GET    /api/receitas?chef=:id   - Filtrar receitas por chef
// POST   /api/receitas            - Criar nova receita
// PUT    /api/receitas/:id        - Atualizar receita
// DELETE /api/receitas/:id        - Deletar receita

import {Router} from "express";
import chefModel from "../models/chefModel.js";
import receitasModel from "../model/receitasModel.js"

const router = Router();

router.get("/", async (request, response) =>{
    try{
        const receitas = await receitasModel.findAll();
        response.status(200).json(receitas);
    }catch(error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno ao listar receitas"})
    }
}) 
router.post("/", async (request, response) =>{
    const {titulo, descricao, ingredientes, modoPreparo, tempoPreparo, porcoes, dificuldade, chef_id} = request.body;

    if(!titulo || titulo.length < 2){
        response.status(400).json({mensagem: "Campo titulo inválido, deve ter 2 ou mais caracteres"});
        return;
    }
    if(!descricao){
        response.status(400).json({mensagem: "Campo descricao é obrigatório"})
        return;
    }
    if(!ingredientes){
        response.status(400).json({mensagem: "Campo ingredientes é obrigatório"})
        return;
    }
    if(!modoPreparo){
        response.status(400).json({mensagem: "Campo modoPreparo é obrigatório"})
        return;
    }
    if(!tempoPreparo){
        response.status(400).json({mensagem: "Campo tempoPreparo é obrigatório"})
        return;
    }
    if(!porcoes){
        response.status(400).json({mensagem: "Campo porcoes é obrigatório"})
        return;
    }
    if(!dificuldade){
        response.status(400).json({mensagem: "Campo dificuldade é obrigatório"})
        return;
    }
    if(!chef_id){
        response.status(400).json({mensagem: "Campo chefs é obrigatório"})
        return;
    }

    try{
        const receitaCriada = await receitasModel.create({
           titulo, 
           descricao, 
           ingredientes, 
           modoPreparo, 
           tempoPreparo, 
           porcoes, 
           dificuldade, 
           chefs
        });
        response.status(201).json(receitaCriada);

    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno ao cadastrar receita "})
    }
}) 
router.get("/:id", async (request, response) =>{
    const {id} = request.params;

    if(!id){
        response.status(400).json({mensagem: "id inválido"})
        return;
    }

    try{
        const receitaSelecionada = await receitasModel.findByPk(id);
        if(!receitaSelecionada){
            response.status(404).json({mensagem: "Receita não identificado"})
            return;
        }

        response.status(200).json(receitaSelecionada);
    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno ao buscar receitas por id "})
    }
}) 
router.put("/:id", async (request, response) =>{
    const {id} = request.params;
    const {titulo, descricao, ingredientes, modoPreparo, tempoPreparo, porcoes, dificuldade, chefs} = request.body

    if(!id) {
        response.status(400).json({mensagem: "id inválido"})
        return;
    }

    try{
        const receitaSelecionada = await receitasModel.findByPk(id);
        if(!receitaSelecionada){
            response.status(404).json({mensagem: "Receitas não encontrado"})
            return;
        }

        if(titulo !== undefined){
            receitaSelecionada.titulo = titulo ; 
        }
        if(descricao !== undefined){
            receitaSelecionada.descricao = descricao ; 
        }
        if(ingredientes !== undefined){
            receitaSelecionada.ingredientes = ingredientes ; 
        }
        if(modoPreparo !== undefined){
            receitaSelecionada.modoPreparo = modoPreparo ; 
        }
        if(tempoPreparo !== undefined){
            receitaSelecionada.tempoPreparo = tempoPreparo ; 
        }
        if(porcoes !== undefined){
            receitaSelecionada.porcoes = porcoes ; 
        }
        if(dificuldade !== undefined){
            receitaSelecionada.dificuldade = dificuldade ; 
        }
        if(chefs !== undefined){
            receitaSelecionada.chefs = chefs ; 
        }

        await receitaSelecionada.save();
        response.status(200).json({mensagem: "Receita atualizado com sucesso"})
    }catch(error){
        console.log(error);
        response.status(500).json({mensagem: "Erro interno a atualizar receita"})
    }
}) 
router.delete("/:id", async (request, response) =>{
    const {id } = request.params;

    if(!id){
        response.status(400).json({mensagem: "id inválido"})
        return
    }

    try{
        const receitaSelecionada = await chefModel.findByPk(id);
        if(!receitaSelecionada){
            response.status(404).json({mensagem: "Receita não identificado"})
            return
        }

        await receitasModel.destroy({
            where: {id: receitaSelecionada.id}
        })

        response.status(204).send()
    }catch(error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno ao excluir receita"})
    }
}) 

export default router;