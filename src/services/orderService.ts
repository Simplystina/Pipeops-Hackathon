import { ErrorResponse } from "../core";
import OrderModel from "../models/Order";
import generateUniqueInvitationCode from "../util/uniqueCode";
import dotenv from "dotenv"
const https = require('https')
import { Request, Response, NextFunction } from "express";

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
     if (getCode.hasPaid) {
        throw new ErrorResponse(404, 'This order has been paid for')
     }
        const params = JSON.stringify({
        "email": "customer@email.com",
        "amount": "20000"
        })

        const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer SECRET_KEY',
            'Content-Type': 'application/json'
        }
        }

try {
        const response  = await new Promise((resolve, reject) => {
            const req = https.request(options, (res:Response) => {
                let data = '';

                res.on('data', (chunk: Buffer) => {
                    data += chunk.toString(); 
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on('error', (error: Error) => {
                reject(error);
            });

            req.write(params);
            req.end();
        });
    
        console.log(response,"response")
        return response;
    } catch (error) {
        console.error(error);
        throw new ErrorResponse(500, 'Payment initialization failed');
    }
};

export default {
    createAnOrder,
    checkPaymentCode
}