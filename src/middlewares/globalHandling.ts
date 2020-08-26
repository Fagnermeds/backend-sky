import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

function globalHandling(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    message: 'Internal server error',
  });
}

export default globalHandling;
