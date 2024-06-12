"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const validate_1 = __importDefault(require("../middlewares/validate"));
const validation_1 = require("../validation");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const businessController_1 = __importDefault(require("../controller/businessController"));
router.put('/', authMiddleware_1.default, (0, validate_1.default)(validation_1.businessValidation.updateBusinessProfile), businessController_1.default.businessUpdateProfile);
router.put('/change-password', authMiddleware_1.default, (0, validate_1.default)(validation_1.businessValidation.changeBusinessPassword), businessController_1.default.changeBusinessPassword);
router.put('/change-initial-password', authMiddleware_1.default, (0, validate_1.default)(validation_1.businessValidation.changeInitialPassword), businessController_1.default.changeInitialPassword);
exports.default = router;
