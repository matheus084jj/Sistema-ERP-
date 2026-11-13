import {Router} from 'express'
import {criarFuncionario} from '../controllers/funcionario.js'
import {DeletaFuncionario} from "../controllers/deletefuncionario.js"


const router = Router()

router.post("/", criarFuncionario)
router.delete("/", DeletaFuncionario)

export default router