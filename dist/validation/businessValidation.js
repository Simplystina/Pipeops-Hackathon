"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const updateBusinessProfile = {
    body: joi_1.default.object().keys({
        businessName: joi_1.default.string(),
        phone: joi_1.default.string(),
        image: joi_1.default.string(),
        businessLogo: joi_1.default.string(),
        stateOfResidence: joi_1.default.string(),
        localGovtOfResidence: joi_1.default.string(),
        address: joi_1.default.string(),
    })
};
const changeBusinessPassword = {
    body: joi_1.default.object().keys({
        oldPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string().required(),
    })
};
const changeInitialPassword = {
    body: joi_1.default.object().keys({
        newPassword: joi_1.default.string().required(),
    })
};
exports.default = {
    updateBusinessProfile,
    changeBusinessPassword,
    changeInitialPassword
};
