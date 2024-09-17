type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload {
    messages: string
    errors: {
        field: string
        messages: string
    }[]
}

export class HttpError extends Error {
    status: number
    payload: any
    constructor(status: number, payload: any) {
        super()
        this.status = status
        this.payload = payload
    }
}