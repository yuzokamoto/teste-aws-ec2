import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateShowInputDTO, Show } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando createShow da ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const input: ICreateShowInputDTO = {
            token: "token-astrodev",
            band: "U2",
            startsAt: "2022/12/08",
        }

        const result = await showBusiness.createShow(input)

        expect(result.message).toEqual("Show criado com sucesso")
        expect(result.show.getId()).toEqual("id-mock")
        expect(result.show.getBand()).toEqual("U2")
    })

    test("Erro ao tentar criar show com conta não-admin", async () => {
        expect.assertions(2)
        try {
            const input: ICreateShowInputDTO = {
                token: "token-mock",
                band: "U2",
                startsAt: "2022/12/08"
            }
    
            await showBusiness.createShow(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Somente admins podem criar shows")
                expect(error.statusCode).toEqual(403)
            }
        }
    })
})