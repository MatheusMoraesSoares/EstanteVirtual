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

            const result = await this.atletaBusiness.registrar(dados)

            res.status(201).send({ message: result })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.atletaBusiness.getAll()

            res.status(201).send({ message: result})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getAtletasByCompeticaoId = async (req: Request, res: Response) => {
        try {
            const { id } = req.body
            const result = await this.atletaBusiness.getAtletasByCompeticaoId(id)

            res.status(201).send({ message: result })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}