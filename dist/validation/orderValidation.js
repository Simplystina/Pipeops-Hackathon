"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createAnOrder = {
    body: joi_1.default.object().keys({
        customerPhone: joi_1.default.string(),
        customerEmail: joi_1.default.string().required(),
        totalAmount: joi_1.default.number().required(),
        itemOrdered: joi_1.default.array().items(joi_1.default.object({
            item: joi_1.default.string().required(),
            total: joi_1.default.number().required()
        })),
        paidDelivery: joi_1.default.boolean().required(),
        deliveryPrice: joi_1.default.number(),
        customerLocation: joi_1.default.string(),
        address: joi_1.default.string(),
        customerAddress: joi_1.default.string(),
        customerStateOfResidence: joi_1.default.string(),
    })
};
const checkCode = {
    body: joi_1.default.object().keys({
        code: joi_1.default.string().required()
    })
};
exports.default = {
    createAnOrder,
    checkCode
};
