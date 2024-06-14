import { ErrorResponse } from "../core";
import generateUniqueInvitationCode from "../util/uniqueCode";



const createAnOrder = async (data: any, id: string) => {
    console.log(data)
    const code = await generateUniqueInvitationCode()
   
};

export default {
  createAnOrder
}