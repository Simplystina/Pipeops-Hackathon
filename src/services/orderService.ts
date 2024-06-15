import { ErrorResponse } from "../core";
import OrderModel from "../models/Order";
import generateUniqueInvitationCode from "../util/uniqueCode";
import dotenv from "dotenv"

dotenv.config()


const createAnOrder = async (data: any, id: string) => {
    console.log(data)
    const code:string = await generateUniqueInvitationCode()
    const dataToCreate = {
        ...data,
        paymentCode: code,
        userId: id
    }
    const createdData = await OrderModel.create(dataToCreate)
    console.log(createdData)
    return {
        generatedurl: `${process.env.FRONTEND_URL}/order/${createdData.paymentCode}`,
        order: createdData
    }
};

const checkPaymentCode = async (code:string) => {
    const getCode = await OrderModel.findOne({ paymentCode: code })
     if (!getCode) {
         throw new ErrorResponse(404, 'This code does not exist')
     }
    if (!getCode.isCodeActive) {
        throw new ErrorResponse(404, 'This code is no longer active')
    }
     if (!getCode.hasPaid) {
        throw new ErrorResponse(404, 'This order has been paid for')
     }
    

};

export default {
    createAnOrder,
    checkPaymentCode
}