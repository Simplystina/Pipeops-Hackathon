"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const validate_1 = __importDefault(require("../middlewares/validate"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const orderValidation_1 = __importDefault(require("../validation/orderValidation"));
const orderController_1 = __importDefault(require("../controller/orderController"));
router.post('/generate-url', authMiddleware_1.default, (0, validate_1.default)(orderValidation_1.default.createAnOrder), orderController_1.default.generateAnOrderURL);
router.post('/check-code', authMiddleware_1.default, (0, validate_1.default)(orderValidation_1.default.checkCode), orderController_1.default.checkPaymentCode);
exports.default = router;
