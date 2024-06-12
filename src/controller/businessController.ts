import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import { CustomRequest } from "../middlewares/authMiddleware";
import { AuthService, BusinessService } from "../services";
import { Request, Response, NextFunction } from "express";

const businessUpdateProfile = asyncHandler(async (req:CustomRequest, res:Response) => {
  const data = await BusinessService.updateBusinessProfile(req.body, req.user._id)
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Business Profile Updated Successfully',
    data
  })
})


const changeBusinessPassword = asyncHandler(async (req: CustomRequest, res: Response) => { 
const data = await BusinessService.changeBusinessPassword(req.user._id,req.body.oldPassword,req.body.newPassword)
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Password Updated Successfully',
    data
  })
})

const changeInitialPassword = asyncHandler(async (req: CustomRequest, res: Response) => { 
  const data = await BusinessService.changeInitialPassword(req.user._id, req.body.newPassword)
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Password Updated Successfully',
    data
  })
})

export default {
  businessUpdateProfile,
  changeInitialPassword,
  changeBusinessPassword 
}