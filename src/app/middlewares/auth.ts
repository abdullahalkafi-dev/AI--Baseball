import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../config';

import { jwtHelper } from '../../helpers/jwtHelper';
import AppError from '../errors/AppError';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.headers.authorization as string;
      console.log(tokenWithBearer);
      if (!tokenWithBearer || !tokenWithBearer?.startsWith('Bearer')) {
        return next( new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized'))
      }


      if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
        const token = tokenWithBearer.split(' ')[1];
 console.log(token);
        //verify token
        const verifyUser = jwtHelper.verifyToken(
          token,
          config.jwt.jwt_secret as Secret
        );
        //set user to header
        req.user = verifyUser;
        console.log(req.user);
         
         
        //guard user
        if (roles.length && !roles.includes(verifyUser.role)) {
          throw new AppError(
            StatusCodes.FORBIDDEN,
            "You don't have permission to access this api"
          );
        }

        next();
      }
    } catch (error) {
      next(error);
    }
  };

export default auth;


