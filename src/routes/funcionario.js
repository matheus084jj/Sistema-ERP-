import {Router} from 'express'
import {criarFuncionario} from '../controllers/funcionario.js'

const router = Router()

router.post("/", criarFuncionario)

export default router