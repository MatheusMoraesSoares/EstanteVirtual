import { DadosCompeticao } from "../types/Dados";
import { BaseDataBase } from "./BaseDataBase";

const tableName = "competicao"

export class CompeticaoDataBase extends BaseDataBase {

    registrar = async (dados: DadosCompeticao, id: string):Promise<any> => {
        try {
            await BaseDataBase.connection
                .insert({
                    id,
                    competicao: dados.competicao,
                    unidade: dados.unidade
                })
                .into(tableName);
                
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }

    getAll = async () => {
        try {
            return await BaseDataBase.connection
                .select("*")
                .from(tableName)
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }

    getById = async (id: string) => {
        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(tableName)
                .where({id})
            
            return result[0]
        } catch (error: any) {
            throw new Error( error.mysqlMessage || error.message )
        }
    }

    encerrarCompeticao = async (boolean: string, id: string):Promise<any> => {
        try {
            console.log(boolean, id)
            await BaseDataBase.connection
                .update('boolean', boolean)
                .into(tableName)
                .where('id', id)

        } catch (error: any) {
            console.log(error)
            throw new Error( error.mysqlMessage || error.message )
        }
    }
}