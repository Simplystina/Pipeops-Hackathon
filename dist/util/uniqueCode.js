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
// Function to generate a random invitation code
const Order_1 = __importDefault(require("../models/Order"));
const crypto_1 = require("crypto");
function generateInvitationCode(length = 8) {
    return (0, crypto_1.randomBytes)(Math.ceil(length / 2)) // Use ceil to ensure enough bytes
        .toString('hex') // Convert to hexadecimal string
        .substring(0, length); // Trim to the specified length
}
// Function to generate a unique invitation code
const generateUniqueInvitationCode = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (length = 8) {
    const orders = yield Order_1.default.find();
    const allCodes = orders.map(item => item.paymentCode).filter(item => item !== null);
    const usedCodes = new Set(allCodes);
    let code;
    do {
        code = generateInvitationCode(length);
    } while (usedCodes.has(code) && code);
    return code;
});
exports.default = generateUniqueInvitationCode;
