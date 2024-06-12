import { Request, Response, NextFunction } from 'express';
import ErrorResponse  from './core.errorResponse';
import HttpStatusCodes from '../constants/HttpStatusCodes';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error: ErrorResponse = {
    ...err
  } as ErrorResponse;
  error.message = err.message;
  if (process.env.MODE !== 'production') {
    console.log(err.name);
    // console.log(err);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `I am Not A Teapot ${Object.values((err as any).errors).map(
      (val: any) => `${val.path} : ${val.value}`
    )}`;
    error = new ErrorResponse(HttpStatusCodes.BAD_REQUEST,message);
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message);
    error = new ErrorResponse(400, message[0]);
  }

  // Mongoose validation error Cause By Foregin Key (This would Over The Pervious Validation)
  //TODO: fix or implenment
  // if (err.name === 'ValidationError') {
  //   console.log(err.errors);
  //   const message = Object.values(err.errors).map((val) => val.message);
  //   error = new ErrorResponse(message, 400);
  // }

  return res.status(error.status || 500).json({
    success: false,
    status: 'error',
    error: error.message || 'Server Error'
  });
};

export default errorHandler;
