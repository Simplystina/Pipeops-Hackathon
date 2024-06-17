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
const HttpStatusCodes_1 = __importDefault(require("../constants/HttpStatusCodes"));
const core_1 = require("../core");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateBusinessProfile = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = yield User_1.default.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
});
const changeInitialPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(password, "password");
    const user = yield User_1.default.findById(id);
    if (!user) {
        throw new core_1.ErrorResponse(404, 'Business not found');
    }
    if (user === null || user === void 0 ? void 0 : user.hasPasswordChanged) {
        throw new core_1.ErrorResponse(HttpStatusCodes_1.default.BAD_REQUEST, 'Password has already been changed');
    }
    user.password = password;
    user.hasPasswordChanged = true;
    // Save the updated business document
    yield user.save();
});
const changeBusinessPassword = (id, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the business by ID
    const business = yield User_1.default.findById(id).select('+password');
    if (!business) {
        throw new core_1.ErrorResponse(404, 'This business is not found');
    }
    // Check if the old password matches
    console.log(oldPassword, business.password, business, "passwords");
    const isMatch = yield bcrypt_1.default.compare(oldPassword, business.password);
    console.log(isMatch, "isMatch");
    if (!isMatch) {
        throw new core_1.ErrorResponse(400, 'Old password is incorrect');
    }
    // Update the password and set HasPasswordChanged to true
    business.password = newPassword;
    // Save the updated business document
    yield business.save();
});
exports.default = {
    updateBusinessProfile,
    changeInitialPassword,
    changeBusinessPassword
};
