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
            const result = await this.competicaoDataBase.getById(competicaoId)
            const registeredAtlete = await this.atletaDataBase.getByName(nome)

            if(result.boolean === 'FALSE'){
                throw new CustomError(500, "Competition already been closed.")
            }
            if(registeredAtlete.length>0){
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

                await this.atletaDataBase.registrar(data)

                return "Dados inseridos com sucesso"
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

                await this.atletaDataBase.registrar(data)
                
                return "Dados inseridos com sucesso"
                
            }

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    getAll = async () => {
        try {
            return await this.atletaDataBase.getAll()
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    getAtletasByCompeticaoId = async (id: string) => {
        try {
            if(!id) {
                throw new InvalidInputError("Invalid input. Id is required.")
            }
            return await this.atletaDataBase.getAtletaByCompeticaoId(id)
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}