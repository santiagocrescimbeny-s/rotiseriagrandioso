export class CustomError extends Error {
    public readonly statusCode: number;
    public readonly details?: any; 

    constructor(message: string, statusCode: number, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestException extends CustomError {
    constructor(message: string = 'Bad Request', details?: any) {
        super(message, 400, details);
    }
}

export class UnauthorizedException extends CustomError {
    constructor(message: string = 'Unauthorized', details?: any) {
        super(message, 401, details);
    }
}

export class ForbiddenException extends CustomError {
    constructor(message: string = 'Access Forbidden', details?: any) {
        super(message, 403, details);
    }
}

export class NotFoundException extends CustomError {
    constructor(message: string = 'Resource Not Found', details?: any) {
        super(message, 404, details);
    }
}

export class InternalServerErrorException extends CustomError {
    constructor(message: string = 'Internal Server Error', details?: any) {
        super(message, 500, details);
    }
}