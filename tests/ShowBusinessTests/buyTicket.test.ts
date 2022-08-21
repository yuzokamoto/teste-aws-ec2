import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { IBuyTicketInputDTO, ICreateShowInputDTO, Show } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando buyTicket da ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const input: IBuyTicketInputDTO = {
            token: "token-mock",
            showId: "201"
        }

        const result = await showBusiness.buyTicket(input)

        expect(result.message).toEqual("Ingresso reservado com sucesso")
        expect(result.band).toEqual("Foo Fighters")
        expect(result.showDate).toEqual(new Date("2022/12/05"))
    })

    test("Erro ao tentar reservar ingresso sem ter feito login", async () => {
        expect.assertions(2)
        try {
            const input: IBuyTicketInputDTO = {
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