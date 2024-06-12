import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import UserModel from "../models/User";
import { AuthService } from "../services";

export const login = asyncHandler(async (req,res, next) => {
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