import { TipoAtleta } from "../types/TipoAtleta";
import { BaseDataBase } from "./BaseDataBase";

const tableName = "atleta"

export class AtletaDataBase extends BaseDataBase {

    registrar = async (dados: TipoAtleta) => {
        try {
            await BaseDataBase.connection
                .insert({
                    nome: dados.nome,
                    value: dados.value,
                    competicao: dados.competicaoId
                })
                .into(tableName)
            
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }

    getAtletaByCompeticaoId = async (competicao: string) => {
        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(tableName)
                .where({competicao})

            return result
            
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }

    getAll = async (nome: string) => {
        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(tableName)
                .where({nome})

            return result[0]
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }
}