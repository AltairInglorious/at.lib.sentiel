const ERROR_MESSAGE = `
Invalid subject type!
Try manualy set objectType
`

export class InvalidSubjectError extends Error {
    constructor(message: string = ERROR_MESSAGE) {
        super(message)
        Object.setPrototypeOf(this, InvalidSubjectError.prototype)
    }
}