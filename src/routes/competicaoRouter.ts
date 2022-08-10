import { CompeticaoBusiness } from "../business/CompeticaoBusiness";
import { CompeticaoController } from "../controller/CompeticaoController";
import { CompeticaoDataBase } from "../data/CompeticaoDataBase";
import express from 'express'
import { AtletaDataBase } from "../data/AtletaDataBase";

const competicaoController = new CompeticaoController(
    new CompeticaoBusiness(
        new CompeticaoDataBase(),
        new AtletaDataBase()
    )
)

export const competicaoRouter = express.Router()

competicaoRouter.post('/cadastro', competicaoController.registrar)
competicaoRouter.get('/get', competicaoController.getAll)
competicaoRouter.get('/getName', competicaoController.getById)
competicaoRouter.get('/getWinner', competicaoController.getWinner)