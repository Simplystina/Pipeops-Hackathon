"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const authController_1 = require("../controller/authController");
const authValidation_1 = __importDefault(require("../validation/authValidation"));
const validate_1 = __importDefault(require("../middlewares/validate"));
router.post('/login', (0, validate_1.default)(authValidation_1.default.login), authController_1.login);
exports.default = router;
