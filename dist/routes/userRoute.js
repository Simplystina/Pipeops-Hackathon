"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const userController_1 = require("../controller/userController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validation_1 = require("../validation");
router.patch('/', authMiddleware_1.default, (0, validate_1.default)(validation_1.userValidation.updateProfile), userController_1.updateProfile);
exports.default = router;
