import { BaseError } from "./BaseError";

export class UnprocessableError extends BaseError {
    constructor(
        message: string = "Argumento inválido"
    ) {
        super(422, message)
    }
}