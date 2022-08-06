import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError';
import { JWT_SECRET } from '../config';
import User from '../models/user';
import ExpressRequestInterface from '../types/expressRequest.interface';

export default asyncHandler(
  async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    // 1) Check if token exist, if exist get
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new ApiError(
          'You are not login, Please login to get access this route',
          401
        )
      );
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new ApiError(
          'The user that belong to this token does no longer exist',
          401
        )
      );
    }

    req.user = currentUser;
    next();
  }
);
