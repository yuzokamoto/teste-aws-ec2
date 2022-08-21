import { BaseDatabase } from "../../src/database/BaseDatabase"
import { User, IUserDB, USER_ROLES } from "../../src/models/User"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "Lama_Users"

    public toUserDBModel = (user: User): IUserDB => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }

    public findByEmail = async (email: string): Promise<IUserDB | undefined> => {
        switch(email) {
            case "astrodev@gmail.com":
                return {
                    id: "101",
                    name: "Astrodev",
                    email: "astrodev@gmail.com",
                    password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined 
        }
    }

    public createUser = async (user: User): Promise<void> => {

    }
}