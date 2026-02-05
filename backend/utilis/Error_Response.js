

export class Error_Response extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}

export default Error_Response;