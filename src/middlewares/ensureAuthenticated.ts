import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import tokenConfig from '../config/token';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validation token JWT
  const auth = request.headers.authorization;

  if (!auth) {
    throw new AppError('JWT token is missing.');
  }

  const [, token] = auth.split(' ');

  try {
    const decodedToken = verify(token, tokenConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.');
  }
}

export default ensureAuthenticated;
