import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user';
import { UserDocument } from '../types/user.interface';
import { JWT_SECRET } from '../config';

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
