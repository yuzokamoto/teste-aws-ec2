import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateShowInputDTO, IDeleteTicketInputDTO, Show } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando deleteTicket da ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const input: IDeleteTicketInputDTO = {
            token: "token-astrodev",
            showId: "201"
        }

        const result = await showBusiness.deleteTicket(input)

        expect(result.message).toEqual("Ingresso cancelado com sucesso")
    })

    test("Erro ao tentar cancelar ingresso sem ter feito login", async () => {
        expect.assertions(2)
        try {
            const input: IDeleteTicketInputDTO = {
                token: "",
                showId: "201"
            }
    
            await showBusiness.buyTicket(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Token inválido ou faltando")
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})