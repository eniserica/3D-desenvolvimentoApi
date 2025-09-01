import { Router } from "express";
import { cadastrarLivro, 
        listarTodosLivros,
        buscarLivro,
        atualizarLivro,
        deletarLivro } 
        from "../controllers/livroController.js";

const router = Router();
//http://localhost:3333/livros

router.post("/", cadastrarLivro)
router.get("/", listarTodosLivros)
router.get("/:id", buscarLivro)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)

export default router;
