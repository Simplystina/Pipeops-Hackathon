"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const Order_1 = __importDefault(require("../models/Order"));
const Payment_1 = require("../models/Payment");
const uniqueCode_1 = __importDefault(require("../util/uniqueCode"));
const dotenv_1 = __importDefault(require("dotenv"));
const https = require('https');
dotenv_1.default.config();
const createAnOrder = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const code = yield (0, uniqueCode_1.default)();
    const dataToCreate = Object.assign(Object.assign({}, data), { paymentCode: code, userId: id });
    const createdData = yield Order_1.default.create(dataToCreate);
    console.log(createdData);
    return {
        generatedurl: `${process.env.FRONTEND_URL}/order/${createdData.paymentCode}`,
        order: createdData
    };
});
const checkPaymentCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const getOrder = yield Order_1.default.findOne({ paymentCode: code });
    if (!getOrder) {
        throw new core_1.ErrorResponse(404, 'This code does not exist');
    }
    if (getOrder.hasPaid) {
        throw new core_1.ErrorResponse(404, 'This order has been paid for');
    }
    if (!getOrder.isCodeActive) {
        throw new core_1.ErrorResponse(404, 'This code is no longer active');
    }
    const getPayment = yield Payment_1.PaymentModel.findOne({ orderId: getOrder.id });
    if (getPayment) {
        return getPayment.authorization_url;
    }
    const params = JSON.stringify({
        "email": getOrder.customerEmail,
        "amount": getOrder.totalAmount * 100,
        metadata: {
            orderId: getOrder._id,
        }
    });
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = yield new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk.toString();
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on('error', (error) => {
                reject(error);
            });
            req.write(params);
            req.end();
        });
        console.log(response, "response");
        const createPayment = yield Payment_1.PaymentModel.create({
            orderId: getOrder._id,
            amount: getOrder.totalAmount,
            paymentGeneratedDate: new Date(),
            reference: response.data.reference,
            access_code: response.data.access_code,
            authorization_url: response.data.authorization_url
        });
        return response.data.authorization_url;
    }
    catch (error) {
        console.error(error);
        throw new core_1.ErrorResponse(500, 'Payment initialization failed');
    }
});
const updateOrderStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.event === "charge.success") {
        const getOrder = yield Order_1.default.findOne({ _id: data.data.metadata.orderId });
        if (!getOrder) {
            throw new core_1.ErrorResponse(404, 'This order does not exist');
        }
        if (getOrder.hasPaid) {
            throw new core_1.ErrorResponse(404, 'This order has been paid for');
        }
        //update Order and render order code as inactive
        const updateOrder = yield Order_1.default.updateOne({ _id: data.data.metadata.orderId }, {
            hasPaid: true,
            isCodeActive: false
        });
        //update payment
        const updatePayment = yield Payment_1.PaymentModel.updateOne({ orderId: data.data.metadata.orderId }, {
            paymentStatus: data.data.status,
            paymentMadeDate: new Date()
        });
    }
});
exports.default = {
    createAnOrder,
    checkPaymentCode,
    updateOrderStatus
};
