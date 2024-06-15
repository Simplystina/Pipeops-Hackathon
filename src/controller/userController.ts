import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import UserModel from "../models/User";
import { AuthService } from "../services";
import { generateOTP } from "../core/core.utils";
import emailService from "../services/emailService";
import { CustomRequest } from "../middlewares/authMiddleware";

/**
 * Update User Profile
 */
const updateProfile = asyncHandler(async (req: CustomRequest,res, next) => {
   const { _id } = req.user;
  const updateData = req.body;

  const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    { $set: updateData },
    { new: true, runValidators: true } 
  );

  res.status(200).json({
    message: 'Successfully updated User Profile',
    data: updatedUser
  })
})

export {
 updateProfile
}