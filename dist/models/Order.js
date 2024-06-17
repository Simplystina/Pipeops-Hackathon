"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        default: null,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    itemOrdered: [
        {
            item: { type: String, required: true },
            total: { type: Number, required: true },
        },
    ],
    thumbnail: {
        type: String,
        default: null,
    },
    paidDelivery: {
        type: Boolean,
        required: false,
    },
    deliveryPrice: {
        type: Number,
    },
    customerLocation: {
        type: String,
        default: null,
    },
    customerName: {
        type: String,
        default: null,
    },
    customerEmail: {
        type: String,
        default: null,
    },
    customerAddress: {
        type: String,
        default: null,
    },
    customerStateOfResidence: {
        type: String,
        default: null,
    },
    hasPaid: {
        type: Boolean,
        default: false,
    },
    paymentCode: {
        type: String,
        default: null,
    },
    paymentUrl: {
        type: String,
        default: null,
    },
    isCodeActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const OrderModel = mongoose_1.default.model('Order', orderSchema);
exports.default = OrderModel;
