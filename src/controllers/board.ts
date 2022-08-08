import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';
import Board from '../models/board';
import ExpressRequestInterface from '../types/expressRequest.interface';

export const getUserBoards = asyncHandler(
  async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError('Unauthorized user', 401));
    }

    const userBoards = await Board.find({ userId: req.user.id });
    res.status(200).send(userBoards);
  }
);
