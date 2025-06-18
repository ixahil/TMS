import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../models/user.model';
import { AppError } from '../utils/global/app.error';

interface JwtPayload {
  id: string;
  email: string;
  iat?: number; // issued at (optional)
  exp?: number; // expiry (optional)
}

export const cookieOptions = {
  expires: new Date(Date.now() + 900000), // 15Min
  maxAge: 900000, // 15M
  httpOnly: true,
};

export const signToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.jwtSecret,
    { expiresIn: '1d' },
  );
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, config.jwtSecret);

  if (typeof decoded === 'string') {
    throw new AppError(401, 'Invalid token payload');
  }

  if (!decoded) throw new AppError(401, 'unauthorized request, login first');

  return decoded as JwtPayload;
};
