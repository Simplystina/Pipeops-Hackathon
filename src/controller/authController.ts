import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import UserModel from "../models/User";
import { AuthService } from "../services";
import { generateOTP } from "../core/core.utils";
import emailService from "../services/emailService";

/**
 * @description Registeration using Form Input For user
 * @route `/v1/authentication/register`
 * @access Public
 * @type POST
 */
const register = asyncHandler(async (req, res, next) => {
  const { email } = req.body
  try {
   
    const checkAccount = await UserModel.findOne({
      email: email
    });

    if (checkAccount) {
      return next(
        new ErrorResponse(
          400,`Email Address already exist, \n Please Login or Reset password if Forgotten` )
      );
    }
   

    const incoming = {
      ...req.body,
      Token: generateOTP(6),
      TokenExpire: Date.now() + 10 * 60 * 1000
    };
    incoming.totalPointsEarned = 0;
    const newUser = await UserModel.create([incoming]);
    
    //Check if invitation code is part of the request
   
    
    // emailService.sendEmail(
    //    incoming.email,
    //  'One More Step',
    //  `thanks for signing up, click the link to verify your account ${incoming.Token}, ${incoming.first_name})'`
    // );
    console.log(incoming.Token,"token")
    sendTokenResponse(newUser, 201, res);

  } catch (error) {
    next(error);
  }
});

/**
 * 
 */
const login = asyncHandler(async (req,res, next) => {
   const { email, password } = req.body;
   const user = await UserModel.findOne({ email: email })
     .select('+password')
     .select('+email')

   if (!user) {
     throw new ErrorResponse(401,'Invalid credentials')
   }
   // Check if password matches
   const isMatch = await user.matchPassword(password);
   if (!isMatch) {
     throw next(new ErrorResponse(401,'Invalid credentials'));
   }
   sendTokenResponse(user, 200, res);
})

export {
 register,
  login
}