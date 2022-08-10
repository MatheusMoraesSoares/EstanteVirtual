import { DadosCompeticao } from "../../src/types/Dados";

export class CompeticaoDataBaseMock {
    public registrar = async (dados: DadosCompeticao, id: string) => {

    }

    public getAll = async (): Promise<any[]> => {
        return []
    }

    public getById = async (id: string) => {
        switch (id) {
            case "5721b389-4e6e-44d1-ab40-ef3f54905dcf":
                return "certo"
            default: 
                return undefined
        }
    }

    public encerrarCompeticao = async () => {

    }
}