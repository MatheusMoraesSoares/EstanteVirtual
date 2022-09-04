import { textSpanEnd } from "typescript";
import { AtletaBusiness } from "../src/business/AtletaBusiness";
import { CompeticaoBusiness } from "../src/business/CompeticaoBusiness";
import { DadosCompeticao } from "../src/types/Dados";
import { DadosAtleta } from "../src/types/DadosAtleta";
import { AtletaDataBaseMock } from "./mocks/AtletaDataBaseMock";
import { CompeticaoDataBaseMock } from "./mocks/CompeticaoDataBaseMock";
import { mock1, mock2 } from "./mocks/DatabaseMock";

const competicaoBusinessMock = new CompeticaoBusiness(
    new CompeticaoDataBaseMock(),
    new AtletaDataBaseMock()
)

const atletaBusinessMock = new AtletaBusiness(
    new AtletaDataBaseMock(),
    new CompeticaoDataBaseMock()
)

describe("testando a competicao signup", () => {
    test("Deve retornar erro quando nome da competicao esta vazio", async () => {
        try {

            const competicao: DadosCompeticao = {
                competicao: "",
                unidade: 's'
            }

            await competicaoBusinessMock.registrar(competicao)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid input. All inputs are required")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("Deve retornar erro quando nome da competicao esta vazio", async () => {
        try {

            const competicao: DadosCompeticao = {
                competicao: '100m rasos',
                unidade: ''
            }

            await competicaoBusinessMock.registrar(competicao)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid input. All inputs are required")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("deve retornar erro quando unidade é diferente de 's' ou 'm'.", async () => {
        try {

            const competicao: DadosCompeticao = {
                competicao: '100m rasos',
                unidade: 'k'
            }

            await competicaoBusinessMock.registrar(competicao)

        } catch (error: any) {
            expect(error.message).toEqual("Unidade must be 's' or 'm'.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso no cadastro", async () => {

        const competicao: DadosCompeticao = {
            competicao: "100m rasos",
            unidade: "s"
        }

        const token = await competicaoBusinessMock.registrar(competicao)

        expect(token).toBeDefined()
        expect(typeof token == 'string').toBeTruthy()

    })
})

describe("testando getById de competiçao", () => {

    test("retorna erro no caso de Id nao ser passada", async () => {
        try {
            const id = ""

            const token = await competicaoBusinessMock.getById(id)

        } catch (error: any) {
            expect(error.message).toBe("Id is required.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso ", async () => {

        const id = { id: "5721b389-4e6e-44d1-ab40-ef3f54905dcf" }

        const token = await competicaoBusinessMock.getById(id)
        expect(token).toEqual({"boolean": "TRUE", "unidade": "s"})
    })
})

describe("testando pegar vencedor da competicao", () => {
    test("retorna erro no caso de Id nao ser passada", async () => {
        try {
            const id = ""
            const definitivo = "TRUE"

            const token = await competicaoBusinessMock.getWinner(definitivo, id)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid input. All inputs are required")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("retorna erro no caso de o resultado definitivo ou nao, nao ser passado", async () => {
        try {
            const id = "5721b389-4e6e-44d1-ab40-ef3f54905dcf"
            const definitivo = ""

            const token = await competicaoBusinessMock.getWinner(definitivo, id)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid input. All inputs are required")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("retorna erro no caso de 'definitivo' ser passado diferente de TRUE ou FALSE.", async () => {
        try {
            const id = "id"
            const definitivo = "algo"

            const token = await competicaoBusinessMock.getWinner(definitivo, id)

        } catch (error: any) {
            expect(error.message).toEqual("Definitivo must be TRUE or FALSE.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("retorna erro no caso de a id ser passada de forma incorreta", async () => {
        try {
            const id = "id"
            const definitivo = "FALSE"

            const token = await competicaoBusinessMock.getWinner(definitivo, id)

        } catch (error: any) {
            expect(error.message).toEqual("Invalid Id.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("Sucesso ", async () => {

        const id = "5721b389-4e6e-44d1-ab40-ef3f54905dcf"
        const definitivo = "FALSE"

        const token: any = await competicaoBusinessMock.getWinner(definitivo, id)

        expect(token).toStrictEqual(mock2)
    })
})

describe("testando cadastrar o atleta", () => {
    test("retorna erro no caso de um dos valores nao ser passado", async () => {
        try {

            const dados: DadosAtleta = {
                competicaoId: "4a7bc8b7-a674-42c7-8401-70a938d60c67",
                nome: "",
                value1: 12.3,
                value2: 12.4,
                value3: 13.1
            }

            await atletaBusinessMock.registrar(dados)

        } catch (error: any) {
            expect(error.message).toBe("Invalid input. All inputs are required")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("retorna erro no caso de o nome ja existir no banco de dados", async() => {
        try {
            
            const dados: DadosAtleta = {
                competicaoId: '5721b389-4e6e-44d1-ab40-ef3f54905dcf',
                nome: "joao almeida",
                value1: 12.3,
                value2: 12.4,
                value3: 13.1
            }

            await atletaBusinessMock.registrar(dados)
        } catch (error: any) {
            expect(error.message).toBe("There's alreary a atlete registered with that name.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("retorna erro se a competiçao ja tiver sido encerrada", async() => {
        try {
            
            const dados: DadosAtleta = {
                competicaoId: '5721b389-4e6e-44d1-ab40-ef3f54905dcfl',
                nome: "alguem",
                value1: 12.3,
                value2: 12.4,
                value3: 13.1
            }

            await atletaBusinessMock.registrar(dados)

        } catch (error: any) {
            expect(error.message).toBe("Competition already been closed.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })

    test("sucesso no cadastro", async() => {
        
        const dados: DadosAtleta = {
            competicaoId: '5721b389-4e6e-44d1-ab40-ef3f54905dcf',
            nome: "sdfgsdfgsdfg",
            value1: 12.3,
            value2: 12.4,
            value3: 13.1
        }

        const token = await atletaBusinessMock.registrar(dados)
        expect(token).toBe("Dados inseridos com sucesso")
    })
})

describe("testando pegar todos os atletas de uma competicao", () => {
    test("retorna erro no caso da id nao ser passada", async() => {
        try {

            const id = ""

            await atletaBusinessMock.getAtletasByCompeticaoId(id)

        } catch (error: any) {
            expect(error.statusCode).toBe(500)
            expect(error.message).toBe("Invalid input. Id is required.")
        } finally {
            expect.assertions(2)
        }
    })

    test("sucesso", async() => {
        const id = "4a7bc8b7-a674-42c7-8401-70a938d60c67"

        await atletaBusinessMock.getAtletasByCompeticaoId(id)

        
    })
})