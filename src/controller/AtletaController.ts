import { Request, Response } from "express"
import { AtletaBusiness } from "../business/AtletaBusiness"
import { DadosAtleta } from "../types/DadosAtleta"

export class AtletaController {

    constructor(
        private atletaBusiness: AtletaBusiness
    ){}

    public registrar = async (req: Request, res: Response) => {
        try {
            const { competicaoId, nome, value1, value2, value3 } = req.body
            const dados: DadosAtleta = { competicaoId, nome, value1, value2, value3 }

            await this.atletaBusiness.registrar(dados)

            res.status(201).send({ message: "Dados inseridos" })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}