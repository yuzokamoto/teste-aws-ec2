import { ShowBusiness } from "../../src/business/ShowBusiness"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando getShows da ShowBusiness", () => {
    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("Caso de sucesso", async () => {
        const result = await showBusiness.getShows()

        expect(result.shows.length).toEqual(3)
        expect(result.shows[0].getId()).toEqual("201")
        expect(result.shows[0].getBand()).toEqual("Foo Fighters")
    })
})