import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import tokenConfig from '../../../../../config/token';

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
    throw new AppError('Invalid JWT token.', 401);
  }
}

export default ensureAuthenticated;
