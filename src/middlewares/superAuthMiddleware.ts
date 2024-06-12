import { Request, Response , NextFunction} from "express";
import UserModel from "../models/User";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { Jwt } from "jsonwebtoken";
const jwt = require('jsonwebtoken');
const { ErrorResponse, asyncHandler } = require('../core');

interface CustomRequest extends Request {
    user?: any; 
}
const superAuth = asyncHandler(async (req:  CustomRequest, res : Response, next: NextFunction) => {
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
    throw new ErrorResponse(HttpStatusCodes.UNAUTHORIZED,'Not authorized to access this route')
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.user_id);
    if (req.user && req.user.role =='super') {
       next();
    } else {
      return next(
        new ErrorResponse(HttpStatusCodes.FORBIDDEN,"You are forbidden to access this route. You don't have super rights")
      );
    }
  } catch (err) {
    return next(new ErrorResponse(401,'Not authorized to access this route'));
  }
});


export default superAuth