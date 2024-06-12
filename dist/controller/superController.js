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
const core_1 = require("../core");
const superService_1 = __importDefault(require("../services/superService"));
const emailService_1 = __importDefault(require("../services/emailService"));
const getAllUsers = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = '10', page = '1', role, sortBy } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const data = yield superService_1.default.getAllUsers(parsedLimit, parsedPage, role, sortBy);
    res.status(200).json({
        message: "Successfully retrieved all Users",
        data
    });
}));
const InviteBusiness = (0, core_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    //TODO:generate the user's password
    const data = yield superService_1.default.InviteBusiness(email);
    emailService_1.default.sendInvitationBusinessEmail(email, "password");
    return res.status(200).json({
        success: true,
        status: 'success',
        message: 'Business Invited Successfully',
        data
    });
}));
exports.default = {
    getAllUsers,
    InviteBusiness
};
