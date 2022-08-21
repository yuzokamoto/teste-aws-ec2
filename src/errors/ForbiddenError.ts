import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string = "Não autorizado"
    ) {
        super(403, message)
    }
}