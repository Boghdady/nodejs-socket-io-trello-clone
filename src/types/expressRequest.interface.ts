import { Request } from 'express';
import { UserDocument } from './user.interface';

export default interface ExpressRequestInterface extends Request {
  user?: UserDocument;
}
