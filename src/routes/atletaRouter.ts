import { AtletaController } from '../controller/AtletaController'
import { AtletaBusiness } from '../business/AtletaBusiness'
import { AtletaDataBase } from '../data/AtletaDataBase'
import express from 'express'
import { CompeticaoDataBase } from '../data/CompeticaoDataBase'

const atletaController = new AtletaController(
    new AtletaBusiness(
        new AtletaDataBase(),
        new CompeticaoDataBase()
    )
)

export const atletaRouter = express.Router()

atletaRouter.post('/cadastro', atletaController.registrar)