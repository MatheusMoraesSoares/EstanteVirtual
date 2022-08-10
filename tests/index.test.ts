import { CompeticaoBusiness } from "../src/business/CompeticaoBusiness";
import { DadosCompeticao } from "../src/types/Dados";
import { Role } from "../src/types/Role";
import { AtletaDataBaseMock } from "./mocks/AtletaDataBaseMock";
import { CompeticaoDataBaseMock } from "./mocks/CompeticaoDataBaseMock";

const competicaoBusinessMock = new CompeticaoBusiness(
    new CompeticaoDataBaseMock(),
    new AtletaDataBaseMock()
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
        try {

            const competicao: DadosCompeticao = {
                competicao: "100m rasos",
                unidade: "s"
            }

            const token = await competicaoBusinessMock.registrar(competicao)
            expect(token).toBe("certo")

        } catch (error: any) {
            console.log(error)
        } finally {
            expect.assertions(1)
        }
    })

})

describe("testando getById de competiçao", () => {

    test("retorna erro no caso de Id nao ser passada", async () => {
        try {
            const id = ""

            const token = await competicaoBusinessMock.getById(id)

        } catch (error: any) {
            expect(error.message).toEqual("Id is required.")
            expect(error.statusCode).toBe(500)
        } finally {
            expect.assertions(2)
        }
    })
    test("Sucesso ", async () => {
        expect.assertions(1)
        try {

            const id = "5721b389-4e6e-44d1-ab40-ef3f54905dcf"

            const token = await competicaoBusinessMock.getById(id)
            expect(token).toBe("asdfasdf")//?????? sempre funciona

        } catch (error: any) {
            console.log(error)
        }
    })
})