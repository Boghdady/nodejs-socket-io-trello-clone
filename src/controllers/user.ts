import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user';
import { UserDocument } from '../types/user.interface';
import { JWT_SECRET } from '../config';
import ApiError from '../utils/apiError';

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  return {
    username: user.username,
    email: user.email,
    id: user.id,
    token,
  };
};

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password });

    const savedUser = await user.save();
    res.send(normalizeUser(savedUser));
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    console.log(user);

    if (!user || !(await user.validatePassword(password))) {
      return next(new ApiError('Invalid email or password', 400));
    }

    res.status(200).send(normalizeUser(user));
  }
);
