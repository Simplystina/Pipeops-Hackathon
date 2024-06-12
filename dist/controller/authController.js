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
exports.login = void 0;
const core_1 = require("../core");
const User_1 = __importDefault(require("../models/User"));
exports.login = (0, core_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
