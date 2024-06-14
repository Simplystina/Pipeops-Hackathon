// Function to generate a random invitation code
import OrderModel from "../models/Order";
import { randomBytes } from "crypto";

function generateInvitationCode(length = 8) {
  return randomBytes(Math.ceil(length / 2)) // Use ceil to ensure enough bytes
               .toString('hex') // Convert to hexadecimal string
               .substring(0, length); // Trim to the specified length
}

// Function to generate a unique invitation code
const generateUniqueInvitationCode= async(length = 8)=>{
    const orders = await OrderModel.find();
    const allCodes = orders.map(item => item.paymentCode).filter(item => item !== null);
    const usedCodes = new Set(allCodes);

    let code;
    do {
        code = generateInvitationCode(length);
    } while (usedCodes.has(code) && code);

    return code;
}

export default generateUniqueInvitationCode