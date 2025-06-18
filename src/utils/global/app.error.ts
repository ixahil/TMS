export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  data: any;
  success: boolean;
  errors: string[];

  constructor(
    statusCode: number,
    message: string,
    error: string[] = [],
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = null;
    this.success = false;
    this.errors = error;

    if (stack) {
      this.stack = stack;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
