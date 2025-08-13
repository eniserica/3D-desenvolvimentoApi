import autorModel from "../models/autorModel.js"

//cadastro de autor 
export const cadastrarAutor = async(request, response) =>{
    const {nome, biografia, data_nascimento, nacionalidade} = request.body

    if(!nome){
        response.status(400).json({
            erro: "Campo nome incorreto",
            mensagem: "Nome não pode ser nulo"
        })
        return
    }
    if(!biografia){
        response.status(400).json({
            erro: "Campo biografia incorreto",
            mensagem: "Biografia não pode ser nulo"
        })
        return
    }
    if(!data_nascimento){
        response.status(400).json({
            erro: "Campo data_nascimento incorreto",
            mensagem: "data_nascimento não pode ser nulo"
        })
        return
    }
    if(!nacionalidade){
        response.status(400).json({
            erro: "Campo nacionalidade incorreto",
            mensagem: "nacionalidade não pode ser nulo"
        })
        return
    }

    // 1992-02-18
    // 25-12-2009 - 2025-30-80 Date() 
    const validaData = new Date(data_nascimento)
    if(validaData == 'Invvalid Date'){
        response.status(400).json({
            erro: "Data inválida",
            mensagem: "Formato da data inválido"
        })
        return
    }

    const autor = {
        nome,
        biografia,
        data_nascimento,
        nacionalidade
    }

    try{
        const novoAutor = await autorModel.create(autor)
        response.status(201).json({mensagem: "Autor cadastrado com sucesso", novoAutor})
    }catch (error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno do servidor ao cadastrar autor"})
    }
}

//listar os autores com paginação
export const listarTodosAutores = async (request, response) =>{
    //pagina 10 itens, 2 
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page-1) * limit

    try{
        const autores = await autorModel.findAll({
            offset,
            limit
        })
        console.log("Total: ",autores.count)
        console.log("Dados: ",autores.rows)

        const totalPaginas = Math.ceil(autores.count/limit)
        response.status(200).json({
            totalAutores: autores.count,
            totalPaginas,
            paginaAtual: page, 
            autoresPorPagina : limit, 
            autores: autores.rows
        })
    }catch (error){
        console.log(error)
        response.status(500).json({mensagem: "Erro interno no servidor ao listar autores"})
    }
}