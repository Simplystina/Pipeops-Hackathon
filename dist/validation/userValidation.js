"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const getUsers = {
    query: joi_1.default.object().keys({
        role: joi_1.default.string(),
        sortBy: joi_1.default.string(),
        limit: joi_1.default.number().integer(),
        page: joi_1.default.number().integer()
    })
};
const InviteBusiness = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required()
    })
};
exports.default = {
    InviteBusiness,
    getUsers
};
