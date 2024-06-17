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
const updateProfile = {
    body: joi_1.default.object().keys({
        phone: joi_1.default.string(),
        image: joi_1.default.string(),
        stateOfOrigin: joi_1.default.string(),
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        localGovtOfOrigin: joi_1.default.string(),
        stateOfResidence: joi_1.default.string(),
        localGovtOfResidence: joi_1.default.string(),
    })
};
exports.default = {
    updateProfile,
    getUsers
};
