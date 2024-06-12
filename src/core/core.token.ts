import HttpStatusCodes from "../constants/HttpStatusCodes";
import { IUser } from "../types/userResponse.dto";
import { Response } from "express";

/**
 * Get token from model, create cookie and send response
 * @param { Object} user The Mongoose Object
 * @param { Number } statusCode The Status Key `[201, 200, 203]`
 * @param { Function } res The Response Function
 */
const sendTokenResponse = async (user : IUser | IUser[], statusCode :HttpStatusCodes, res : Response) : Promise<void> => {
  // Create token
  const token = Array.isArray(user)
    ? user[0].getSignedJwtToken()
      : user.getSignedJwtToken();
    
   const options : { expires: Date; httpOnly: boolean; secure?: boolean }= {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') {
      options.secure = true;
  }

     let data = Array.isArray(user) ? user[0].toJSON() : user.toJSON();

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: Array.isArray(data)
        ? {
            ...data[0],
            Token: undefined,
            TokenExpire: undefined,
            password: undefined
          }
        : {
            ...data,
            Token: undefined,
            TokenExpire: undefined,
            password: undefined
          }
    });
};


export default sendTokenResponse;