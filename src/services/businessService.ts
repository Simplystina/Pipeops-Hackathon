import HttpStatusCodes from "../constants/HttpStatusCodes"
import { ErrorResponse, asyncHandler } from "../core"
import UserModel from "../models/User"
import { typeBusinessProfile } from "../types/businessResponse.dto"
import bcrypt from "bcrypt"

const updateBusinessProfile = async (data: typeBusinessProfile, id:string) => { 
    const updatedData = await UserModel.findByIdAndUpdate(id, data, { new: true })       
    return updatedData
}

const changeInitialPassword = async (id: string, password: string) => {
  console.log(password, "password")
    const user = await UserModel.findById(id)
    if (!user) {
      throw new ErrorResponse(404, 'Business not found')
    }

    if (user?.hasPasswordChanged) {
        throw new ErrorResponse(HttpStatusCodes.BAD_REQUEST, 'Password has already been changed')
    }
 
    user.password = password;
    user.hasPasswordChanged = true;
      // Save the updated business document
  await user.save();
}

const changeBusinessPassword = async (id: string, oldPassword: string, newPassword: string) => {
  // Find the business by ID
  const business = await UserModel.findById(id).select('+password')
  if (!business) {
    throw new ErrorResponse(404, 'This business is not found')
  }

  // Check if the old password matches
  console.log(oldPassword, business.password, business, "passwords")
  const isMatch = await bcrypt.compare(oldPassword, business.password);
  console.log(isMatch, "isMatch") 
  if (!isMatch) {
    throw new ErrorResponse(400, 'Old password is incorrect');
  }

  // Update the password and set HasPasswordChanged to true
  business.password = newPassword;

  // Save the updated business document
  await business.save();
};

export default {
  updateBusinessProfile,
  changeInitialPassword,
  changeBusinessPassword
}