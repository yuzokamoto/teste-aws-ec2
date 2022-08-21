import { UserBusiness } from "../../src/business/UserBusiness"
import { ISignupInputDTO } from "../../src/models/User"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { BaseError } from "../../src/errors/BaseError"


describe("Testando signup da UserBusiness", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const input: ISignupInputDTO = {
            name: "alice",
            email: "alice@gmail.com",
            password: "alice99"
        }

        const result = await userBusiness.signup(input)

        expect(result.message).toEqual("Cadastro realizado com sucesso")
        expect(result.token).toEqual("token-mock")
    })

    test("Erro ao se cadastrar com email já registrado", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "astrodev",
                email: "astrodev@gmail.com",
                password: "bananinha"
            }
    
            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Email já cadastrado")
                expect(error.statusCode).toEqual(409)
            }
        }
    })

    test("Erro ao se cadastrar com uma senha menor que 6 caracteres", async () => {
        expect.assertions(2)
        try {
            const input: ISignupInputDTO = {
                name: "alice",
                email: "alice@gmail.com",
                password: "abc12"
            }
    
            await userBusiness.signup(input)
        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toEqual("Parâmetro 'password' inválido: mínimo de 6 caracteres")
                expect(error.statusCode).toEqual(400)
            }
        }
    })
})