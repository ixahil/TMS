import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../lib/jwt';
import { IUserRole, User } from '../models/user.model';
import { AppError } from '../utils/global/app.error';

export const authenticate =
  (roles: IUserRole[] = ['USER']) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.AccessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

      if (!token) throw new AppError(401, 'unauthorized request, login first!');

      const decoded = verifyToken(token);

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.clearCookie('AccessToken');
        res.clearCookie('RefreshToken');

        throw new AppError(401, 'unauthorized request, login first');
      }

      if (!roles.includes(user.role)) {
        res.clearCookie('AccessToken');
        res.clearCookie('RefreshToken');

        throw new AppError(
          401,
          "unauthorized, you don't have permission to visit this route",
        );
      }
      req.user = user;
      next();
    } catch (error) {
      res.clearCookie('AccessToken');
      res.clearCookie('RefreshToken');
      throw new AppError(401, 'unauthorized request, login first');
    }
  };
