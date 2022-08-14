import { Request, Response } from "express";
import { CompeticaoBusiness } from "../business/CompeticaoBusiness";
import { DadosCompeticao } from "../types/Dados";

export class CompeticaoController {

    constructor(
        private competicaoBusiness: CompeticaoBusiness
    ){}

    public registrar = async (req: Request, res: Response) => {
        try {
            const { competicao, unidade } = req.body
            const dados: DadosCompeticao = { competicao, unidade }

            const id = await this.competicaoBusiness.registrar(dados)

            res.status(201).send({ message: `Dados inseridos. id: ${id}` })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getAll  = async (req: Request, res: Response) => {
        try {
            const result = await this.competicaoBusiness.getAll()
            res.status(201).send({ message: result })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.body
            const result = await this.competicaoBusiness.getById(id)

            res.status(201).send({ message: result })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public getWinner = async (req: Request, res: Response) => {
        try {
            const { definitivo, id } = req.body

            const result = await this.competicaoBusiness.getWinner(definitivo, id)
            console.log(result)

            res.status(201).send({ message: result })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}