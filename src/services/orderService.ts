import { date } from "joi";
import { ErrorResponse } from "../core";
import OrderModel from "../models/Order";
import { PaymentModel } from "../models/Payment";
import generateUniqueInvitationCode from "../util/uniqueCode";
import dotenv from "dotenv"
const https = require('https')
import { Request, Response, NextFunction } from "express";
import { PaystackResponse } from "../types/orderResponse.dto";

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
    const getOrder = await OrderModel.findOne({ paymentCode: code })
     if (!getOrder)  {
         throw new ErrorResponse(404, 'This code does not exist')
     }
    if (!getOrder.isCodeActive) {
        throw new ErrorResponse(404, 'This code is no longer active')
    }
     if (getOrder.hasPaid) {
        throw new ErrorResponse(404, 'This order has been paid for')
     }
    
    const getPayment = await PaymentModel.findOne({ orderId: getOrder.id })
    if (getPayment) {
        return getPayment.authorization_url
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
            Authorization: process.env.SECRET_KEY,
            'Content-Type': 'application/json'
        }
        }

    try {
        const response : PaystackResponse = await new Promise((resolve, reject) => {
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
        const createPayment = await PaymentModel.create({
            orderId: getOrder._id,
            amount: getOrder.totalAmount,
            paymentGeneratedDate: new Date(),
            reference: response.data.reference,
            access_code: response.data.access_code,
            authorization_url: response.data.authorization_url
        })
     return response.data.authorization_url
    } catch (error) {
        console.error(error);
        throw new ErrorResponse(500, 'Payment initialization failed');
    }
};

export default {
    createAnOrder,
    checkPaymentCode
}