import { DadosAtleta } from "../../src/types/DadosAtleta";
import { TipoAtleta } from "../../src/types/TipoAtleta";
import { mock1 } from "./DatabaseMock";

export class AtletaDataBaseMock {
    public registrar = async (parametro: TipoAtleta) => {
        const dados: TipoAtleta = {
            competicaoId: '5721b389-4e6e-44d1-ab40-ef3f54905dcf',
            nome: "dados",
            value: 12.3
        }

        if(dados === parametro) {
            return 'certo'
        }
    }

    public getAtletaByCompeticaoId = async () => {
        return mock1
    }

    public getByName = async (name: string) => {
        if(name === "joao almeida") {
            return [{name: "joao almeida"}]
        } else {
            return []
        }
    }

    public getAll = async () => {
        return []
    }
}