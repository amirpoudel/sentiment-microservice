class ApiError extends Error {
    statusCode: number;
    message: string;
    error: any;
    errors: any[];
    success: boolean;
    isError: boolean;
    stack?: string;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        error: any = null,
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.errors = errors;
        this.success = false;
        this.isError = true;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
