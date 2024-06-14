import UserModel from "../models/User";
import Jwt  from "jsonwebtoken";
import { ErrorResponse, asyncHandler } from  "../core"
import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
    user?: any; 
}
const Auth = asyncHandler(async (req :CustomRequest, res: Response, next :NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse(401,'Not authorized to access this route'));
  }

  try {
    // Verify token
   const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: string };
    req.user = await UserModel.findById(decoded.user_id)
    if (req.user) {
      return next();
      
    } else {
      return next(
        new ErrorResponse(401,'Not authorized to access this route')
      );
    }
  } catch (err) {
    console.log(err,"err")
    return next(new ErrorResponse(401,'Not authorized to access this route'));
  }
});

export default Auth
