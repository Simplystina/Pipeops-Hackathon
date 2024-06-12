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
const User_1 = __importDefault(require("../models/User"));
const core_1 = require("../core");
const HttpStatusCodes_1 = __importDefault(require("../constants/HttpStatusCodes"));
const misc_1 = require("../util/misc");
const QRCode = require('qrcode-generator');
/**
 * Get All Users in the system
 * @param limit
 * @param page
 * @param role
 * @param sortBy
 * @returns
 */
const getAllUsers = (limit, page, role, sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse limit and page to integers
    const parsedLimit = limit || 10;
    const parsedPage = page || 1;
    const skip = (parsedPage - 1) * parsedLimit;
    const query = {};
    if (role) {
        query.role = role;
    }
    const sort = {};
    if (sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    const users = yield User_1.default.find(query)
        .limit(parsedLimit)
        .skip(skip)
        .sort(sort);
    const totalCount = yield User_1.default.countDocuments(query);
    return {
        data: users,
        pagination: {
            total: totalCount,
            limit: parsedLimit,
            page: parsedPage,
            totalPages: Math.ceil(totalCount / parsedLimit)
        }
    };
});
/**
 * Invite a business
 * @param email
 * @returns
 */
const InviteBusiness = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if email already exist
    const findBusiness = yield User_1.default.findOne({ email: email });
    if (findBusiness) {
        throw new core_1.ErrorResponse(HttpStatusCodes_1.default.BAD_REQUEST, "User already exists");
    }
    //TODO:When domain is set up, password should be generated randomly with crpyto
    //generate qr code
    const qrCodeDataURL = (0, misc_1.generateQRCode)(email);
    console.log(qrCodeDataURL, "qrCodeDataURL");
    const business = yield User_1.default.create({
        email: email,
        role: "business",
        password: "password",
        businesQrCode: qrCodeDataURL
    });
    // console.log(user)
    // TODO://send email to users
    return business;
});
exports.default = {
    getAllUsers,
    InviteBusiness
};
