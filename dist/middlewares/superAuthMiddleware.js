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
const HttpStatusCodes_1 = __importDefault(require("../constants/HttpStatusCodes"));
const jwt = require('jsonwebtoken');
const { ErrorResponse, asyncHandler } = require('../core');
const superAuth = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
        // Set token from cookie
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }
    // Make sure token exists
    if (!token) {
        throw new ErrorResponse(HttpStatusCodes_1.default.UNAUTHORIZED, 'Not authorized to access this route');
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = yield User_1.default.findById(decoded.user_id);
        if (req.user && req.user.role == 'super') {
            next();
        }
        else {
            return next(new ErrorResponse(HttpStatusCodes_1.default.FORBIDDEN, "You are forbidden to access this route. You don't have super rights"));
        }
    }
    catch (err) {
        return next(new ErrorResponse(401, 'Not authorized to access this route'));
    }
}));
exports.default = superAuth;
