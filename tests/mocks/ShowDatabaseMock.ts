import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IShowDB, ITicketDB, Show } from "../../src/models/Show"

export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public toShowDBModel = (show: Show) => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }

        return showDB
    }

    public findShowByDate = async (date: Date): Promise<IShowDB | undefined> => {
        switch(date.getDate()) {
            case 5:
                return {
                    id: "201",
                    band: "Foo Fighters",
                    starts_at: new Date("2022/12/05")
                }
            default:
                return undefined 
        }
    }

    public createShow = async (show: Show): Promise<void> => {

    }

    public getShows = async (): Promise<IShowDB[]> => {
        return [
            {
                id: "201",
                band: "Foo Fighters",
                starts_at: new Date("2022/12/05")
            },
            {
                id: "202",
                band: "System of a Down",
                starts_at: new Date("2022/12/06")
            },
            {
                id: "203",
                band: "Evanescence",
                starts_at: new Date("2022/12/07")
            },
        ]
    }

    public getTicketsByShowId = async (showId: string): Promise<number> => {
        switch(showId) {
            case "201":
                return 3
            default:
                return 0
        }
    }

    public findShowById = async (showId: string): Promise<IShowDB | undefined> => {
        switch(showId) {
            case "201":
                return {
                    id: "201",
                    band: "Foo Fighters",
                    starts_at: new Date("2022/12/05")
                }
            default:
                return undefined
        }
    }

    public findTicket = async (showId: string, userId: string): Promise<ITicketDB | undefined> => {
        if (showId === "201") {
            switch (userId) {
                case "101":
                    return {
                        id: "301",
                        show_id: "201",
                        user_id: "101"
                    }
                default:
                    break
            }
        }

        return undefined
    }

    public createTicket = async (ticketDB: ITicketDB): Promise<void> => {

    }

    public deleteTicketById = async (ticketId: string): Promise<void> => {

    }
}