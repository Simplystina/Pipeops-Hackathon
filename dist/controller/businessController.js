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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const services_1 = require("../services");
const businessUpdateProfile = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield services_1.BusinessService.updateBusinessProfile(req.body, req.user._id);
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Business Profile Updated Successfully',
        data
    });
}));
const changeBusinessPassword = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield services_1.BusinessService.changeBusinessPassword(req.user._id, req.body.oldPassword, req.body.newPassword);
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Password Updated Successfully',
        data
    });
}));
const changeInitialPassword = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield services_1.BusinessService.changeInitialPassword(req.user._id, req.body.newPassword);
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Password Updated Successfully',
        data
    });
}));
exports.default = {
    businessUpdateProfile,
    changeInitialPassword,
    changeBusinessPassword
};
