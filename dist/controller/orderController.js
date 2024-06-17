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
const orderService_1 = __importDefault(require("../services/orderService"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRET_KEY;
const generateAnOrderURL = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield orderService_1.default.createAnOrder(req.body, req.user._id);
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Order URL Generated Successfully.',
        data
    });
}));
const checkPaymentCode = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield orderService_1.default.checkPaymentCode(req.body.code);
    console.log(data, "data");
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Order URL Generated Successfully.',
        data
    });
}));
const checkOrderStatus = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = crypto_1.default.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const data = req.body;
        const status = yield orderService_1.default.updateOrderStatus(data);
    }
    return res.send(200);
}));
exports.default = {
    generateAnOrderURL,
    checkPaymentCode,
    checkOrderStatus
};
