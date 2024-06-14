import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import { CustomRequest } from "../middlewares/authMiddleware";
import { AuthService, BusinessService } from "../services";
import { Request, Response, NextFunction } from "express";
import orderService from "../services/orderService";

const generateAnOrderURL = asyncHandler(async (req:CustomRequest, res:Response) => {
  const data = await orderService.createAnOrder(req.body, req.user._id)
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Order URL Generated Successfully.',
    data
  })
})



export default {
  generateAnOrderURL
}