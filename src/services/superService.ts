import UserModel from "../models/User";
import { ErrorResponse } from "../core";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateQRCode } from "../util/misc";
const QRCode = require('qrcode-generator');

/**
 * Get All Users in the system
 * @param limit 
 * @param page 
 * @param role 
 * @param sortBy 
 * @returns 
 */
const getAllUsers = async(limit: number, page:number, role:string, sortBy:string) => {
      // Parse limit and page to integers
  const parsedLimit = limit || 10
  const parsedPage = page || 1

  const skip = (parsedPage - 1) * parsedLimit;

  const query: any = {};

  if (role) {
    query.role = role;
  }

  const sort: any = {};
  if (sortBy) {
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  const users = await UserModel.find(query)
    .limit(parsedLimit)
    .skip(skip)
    .sort(sort);

    const totalCount: number = await UserModel.countDocuments(query);
    return {
        data: users,
        pagination: {
        total: totalCount,
        limit: parsedLimit,
        page: parsedPage,
        totalPages: Math.ceil(totalCount / parsedLimit)
        }
    }
}

/**
 * Invite a business
 * @param email 
 * @returns 
 */
const InviteBusiness = async (email: string) => {
    //Check if email already exist
    const findBusiness = await UserModel.findOne({ email: email })
    if (findBusiness) {
        throw new ErrorResponse(HttpStatusCodes.BAD_REQUEST, "User already exists")
    }
    //TODO:When domain is set up, password should be generated randomly with crpyto

    //generate qr code
    const qrCodeDataURL = generateQRCode(email)
    console.log(qrCodeDataURL, "qrCodeDataURL")
    const business = await UserModel.create({
        email: email,
        role: "business",
        password: "password",
        businesQrCode: qrCodeDataURL
    })

    // console.log(user)
    // TODO://send email to users
    return business
}


export default {
    getAllUsers,
     InviteBusiness 
}