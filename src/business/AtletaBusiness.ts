import { AtletaDataBase } from "../data/AtletaDataBase"
import { CompeticaoDataBase } from "../data/CompeticaoDataBase"
import { DadosAtleta } from "../types/DadosAtleta"
import { Role } from "../types/Role"
import { TipoAtleta } from "../types/TipoAtleta"
import { CustomError } from "./errors/CustomError"
import { InvalidInputError } from "./errors/InvalidInputError"

export class AtletaBusiness {

    constructor(
        private atletaDataBase: AtletaDataBase,
        private competicaoDataBase : CompeticaoDataBase
    ) { }

    registrar = async (dados: DadosAtleta) => {
        try {
            if (!dados.competicaoId || !dados.nome || !dados.value1 || !dados.value2 || !dados.value3 ) {
                throw new InvalidInputError("Invalid input. All inputs are required")
            }
            let value
            const competicaoId: string = dados.competicaoId
            const nome: string = dados.nome
            console.log(competicaoId)
            const result = await this.competicaoDataBase.getById(competicaoId)
            const registeredAtlete = await this.atletaDataBase.getAll(nome)

            if(result.boolean === 'FALSE'){
                throw new CustomError(500, "Essa competiçao ja foi encerrada")
            }
            if(registeredAtlete){
                throw new CustomError(500, "There's alreary a atlete registered with that name.")
            }

            if (result.unidade === Role.metros) {
                value = dados.value1
                if (value < dados.value2) {
                    value = dados.value2
                }
                if (value < dados.value3) {
                    value = dados.value3
                }
                const data: TipoAtleta = { competicaoId, nome, value }
                return await this.atletaDataBase.registrar(data)
            }
            if(result.unidade === Role.segundos) {
                value = dados.value1
                if(value > dados.value2) {
                    value = dados.value2
                }
                if(value > dados.value3) {
                    value = dados.value3
                }
                const data: TipoAtleta = { competicaoId, nome, value }

                return await this.atletaDataBase.registrar(data)
            }

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}