import { ErrorResponse } from "../core";
import OrderModel from "../models/Order";
import generateUniqueInvitationCode from "../util/uniqueCode";



const createAnOrder = async (data: any, id: string) => {
    console.log(data)
    const code = await generateUniqueInvitationCode()
    const dataToCreate = {
        ...data,
        paymentCode: code,
        userId: id
    }
    const createdData = OrderModel.create(dataToCreate)
    console.log(createdData)
    return createdData
};

export default {
  createAnOrder
}