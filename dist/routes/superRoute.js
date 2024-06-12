"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const superController_1 = __importDefault(require("../controller/superController"));
const authValidation_1 = __importDefault(require("../validation/authValidation"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const validation_1 = require("../validation");
const superAuthMiddleware_1 = __importDefault(require("../middlewares/superAuthMiddleware"));
router.get('/users', (0, validate_1.default)(validation_1.userValidation.getUsers), superController_1.default.getAllUsers);
router.post('/invite-business', superAuthMiddleware_1.default, (0, validate_1.default)(authValidation_1.default.InviteBusiness), superController_1.default.InviteBusiness);
exports.default = router;
