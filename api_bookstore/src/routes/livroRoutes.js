import {Router} from 'express';
import { cadastrarLivro } from '../controllers/livroController.js';

const router = Router();

router.post("/", cadastrarLivro)

export default router;