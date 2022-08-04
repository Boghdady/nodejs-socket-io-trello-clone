import { Document } from 'mongoose';

// This interface will use everywhere
export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// This interface will use in user schema
export interface UserDocument extends User, Document {
  validatePassword(pass: string): Promise<boolean>;
}
