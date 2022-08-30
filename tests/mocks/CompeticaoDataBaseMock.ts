import { DadosCompeticao } from "../../src/types/Dados";
import { IdGeneratorMock } from "./IdGeneratorMock";

export class CompeticaoDataBaseMock {
    public registrar = async (dados: DadosCompeticao) => {
        return "id"
    }


    public getAll = async (): Promise<any[]> => {
        return []
    }

    public getById = async (id: string) => {
        switch (id) {
            case "5721b389-4e6e-44d1-ab40-ef3f54905dcf":
                return { unidade: 's', boolean: "TRUE"}
            case "5721b389-4e6e-44d1-ab40-ef3f54905dcfl":
                return { boolean: "FALSE" }
            default:
                return undefined
        }
    }

    public encerrarCompeticao = async (id: string, resposta: string) => {

        switch (id) {
            case "5721b389-4e6e-44d1-ab40-ef3f54905dcf":
                return "certo"
            default:
                return undefined
        }
    }
}