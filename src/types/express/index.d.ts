import { IUser } from '../../models/user'; // Your User interface

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or whatever type your user object is
    }
  }
}
