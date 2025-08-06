import { Router } from "express";
import { cadastrarAutor } from "../controllers/autorController.js";


const router = Router()

router.post("/", cadastrarAutor)

export default router;