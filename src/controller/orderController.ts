import { sendTokenResponse ,ErrorResponse, asyncHandler} from "../core"
import { CustomRequest } from "../middlewares/authMiddleware";
import { AuthService, BusinessService } from "../services";
import { Request, Response, NextFunction } from "express";
import orderService from "../services/orderService";
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env.SECRET_KEY

const generateAnOrderURL = asyncHandler(async (req:CustomRequest, res:Response) => {
  const data = await orderService.createAnOrder(req.body, req.user._id)
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Order URL Generated Successfully.',
    data
  })
})

const checkPaymentCode = asyncHandler(async (req: CustomRequest, res: Response) => {
  const data = await orderService.checkPaymentCode(req.body.code)
  console.log(data, "data")
   return res.status(200).json({
    success: true,
    status:'success',
    message: 'Order URL Generated Successfully.',
    data
  })
})

const checkOrderStatus = asyncHandler(async (req: CustomRequest, res: Response) => {
  const hash = crypto.createHmac('sha512', secret as string).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
      const event = req.body;
       const data = req.body
      const status = await orderService.updateOrderStatus(data)
      console.log(data, "data")
    // Do something with event  
    }
 
   return res.send(200)
})


export default {
  generateAnOrderURL,
  checkPaymentCode,
  checkOrderStatus
}