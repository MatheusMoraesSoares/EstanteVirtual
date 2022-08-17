import { DadosAtleta } from "../../src/types/DadosAtleta";
import { TipoAtleta } from "../../src/types/TipoAtleta";

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
        return []
    }

    public getByName = async () => {
        return []
    }

    public getAll = async () => {
        return []
    }
}