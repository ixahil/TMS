import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/global/app.error';

const ISDEV = process.env.NODE_ENV === 'development';

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    const value = Object.values(err.keyValue).join(', ');
    const message = `${field}: ${value} already exists!`;
    error = new AppError(400, message, [], err.stack);
  } else if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    const message = `Validation failed: ${errors.join(', ')}`;
    error = new AppError(400, message, errors, err.stack);
  } else if (err instanceof mongoose.mongo.MongoError) {
    error = new AppError(400, err.message, [], err.stack);
  } else if (!(err instanceof AppError)) {
    error = new AppError(
      500,
      err.message || 'Something went wrong',
      [],
      err.stack,
    );
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(ISDEV && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};
