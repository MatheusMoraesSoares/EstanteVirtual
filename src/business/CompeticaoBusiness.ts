import { AtletaDataBase } from "../data/AtletaDataBase";
import { CompeticaoDataBase } from "../data/CompeticaoDataBase";
import IdGenerator from "../services/IdGenerator";
import { DadosCompeticao } from "../types/Dados";
import { Role } from "../types/Role";
import { CustomError } from "./errors/CustomError";
import { InvalidInputError } from "./errors/InvalidInputError";

export class CompeticaoBusiness {

    constructor(
        private competicaoDataBase: CompeticaoDataBase,
        private atletaDataBase: AtletaDataBase
    ) { }

    public registrar = async (dados: DadosCompeticao) => {
        try {
            if (!dados.competicao || !dados.unidade) {
                throw new InvalidInputError("Invalid input. All inputs are required")
            }
            if(dados.unidade !== Role.metros && dados.unidade !== Role.segundos){
                throw new InvalidInputError("Unidade must be 's' or 'm'.")
            }
            const competicao = dados.competicao
            const unidade = dados.unidade

            const id = IdGenerator.idGenerator()

            const data: DadosCompeticao = { competicao, unidade }
            
            await this.competicaoDataBase.registrar(data, id)

            return id

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    public getAll = async  () => {
        try {
            return await this.competicaoDataBase.getAll()
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    public getById = async (id: string) => {
        try {
            if(!id){
                throw new InvalidInputError("Id is required.")
            }
            const result = await this.competicaoDataBase.getById(id)
            return result 
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    public getWinner = async (resposta: string, id: string) => {
        try {
            const result = await this.atletaDataBase.getAtletaByCompeticaoId(id)
            const tipo = await this.competicaoDataBase.getById(id)

            if(resposta === 'FALSE') {
                await this.competicaoDataBase.encerrarCompeticao(resposta, id)
            }
            

            if(tipo.unidade === Role.segundos) {
                
                result.sort(function (a: any, b: any) {
                    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
                })
                const vencedores = [result[0], result[1], result[2]]
                
                return vencedores
            }
            if(tipo.unidade === Role.metros) {
                
                result.sort(function (a: any, b: any) {
                    return a.value > b.value ? -1 : a.value < b.value ? 1 : 0
                })
                const vencedores = [result[0], result[1], result[2]]
                
                return vencedores
            }

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}