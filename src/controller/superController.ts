import { Request, Response } from 'express';
import {asyncHandler} from "../core"
import UserModel from '../models/User'; 
import superService from '../services/superService';
import emailService from '../services/emailService';

interface QueryParams {
  limit?: string;
  page?: string;
  role?: string;
  sortBy?: string;
}

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { limit = '10', page = '1', role, sortBy } = req.query;
    
    const parsedLimit = parseInt(limit as string, 10);
    const parsedPage = parseInt(page as string, 10);

    const data = await superService.getAllUsers(parsedLimit, parsedPage, role as string, sortBy as string);
    res.status(200).json({
        message: "Successfully retrieved all Users",
        data
    });
});

const InviteBusiness = asyncHandler(async (req:Request, res: Response) => {
  const { email } = req.body;
  //TODO:generate the user's password
  const data = await superService.InviteBusiness(email)
  emailService.sendInvitationBusinessEmail(email, "password")
  return res.status(200).json({
    success: true,
    status:'success',
    message: 'Business Invited Successfully',
    data
  })
})

export default {
    getAllUsers,
    InviteBusiness
}
