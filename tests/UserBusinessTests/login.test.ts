import { UserBusiness } from "../../src/business/UserBusiness"
import { ILoginInputDTO, ISignupInputDTO } from "../../src/models/User"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { BaseError } from "../../src/errors/BaseError"


describe("Testando login da UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const input: ILoginInputDTO = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const result = await userBusiness.login(input)

        expect(result.message).toEqual("Login realizado com sucesso")
        expect(result.token).toEqual("token-astrodev")
    })

    test("Erro ao se logar com um email não cadastrado", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "alice@gmail.com",
                password: "alice99"
            }
    
            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email não cadastrado")
                expect(error.statusCode).toEqual(404)
            }
        }
    })

    test("Erro ao se logar com a senha incorreta", async () => {
        expect.assertions(2)
        try {
            const input: ILoginInputDTO = {
                email: "astrodev@gmail.com",
                password: "bananin"
            }
    
            await userBusiness.login(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Password incorreto")
                expect(error.statusCode).toEqual(401)
            }
        }
    })
})