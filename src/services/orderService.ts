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

export default {
  createAnOrder
}