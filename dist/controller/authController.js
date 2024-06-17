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
exports.login = exports.register = void 0;
const core_1 = require("../core");
const User_1 = __importDefault(require("../models/User"));
const core_utils_1 = require("../core/core.utils");
/**
 * @description Registeration using Form Input For user
 * @route `/v1/authentication/register`
 * @access Public
 * @type POST
 */
const register = (0, core_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const checkAccount = yield User_1.default.findOne({
            email: email
        });
        if (checkAccount) {
            return next(new core_1.ErrorResponse(400, `Email Address already exist, \n Please Login or Reset password if Forgotten`));
        }
        const incoming = Object.assign(Object.assign({}, req.body), { Token: (0, core_utils_1.generateOTP)(6), TokenExpire: Date.now() + 10 * 60 * 1000 });
        incoming.totalPointsEarned = 0;
        const newUser = yield User_1.default.create([incoming]);
        //Check if invitation code is part of the request
        // emailService.sendEmail(
        //    incoming.email,
        //  'One More Step',
        //  `thanks for signing up, click the link to verify your account ${incoming.Token}, ${incoming.first_name})'`
        // );
        console.log(incoming.Token, "token");
        (0, core_1.sendTokenResponse)(newUser, 201, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.register = register;
/**
 *
 */
const login = (0, core_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email: email })
        .select('+password')
        .select('+email');
    if (!user) {
        throw new core_1.ErrorResponse(401, 'Invalid credentials');
    }
    // Check if password matches
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        throw next(new core_1.ErrorResponse(401, 'Invalid credentials'));
    }
    (0, core_1.sendTokenResponse)(user, 200, res);
}));
exports.login = login;
