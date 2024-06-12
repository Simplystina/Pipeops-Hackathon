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
/**
 * Get token from model, create cookie and send response
 * @param { Object} user The Mongoose Object
 * @param { Number } statusCode The Status Key `[201, 200, 203]`
 * @param { Function } res The Response Function
 */
const sendTokenResponse = (user, statusCode, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create token
    const token = Array.isArray(user)
        ? user[0].getSignedJwtToken()
        : user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    let data = Array.isArray(user) ? user[0].toJSON() : user.toJSON();
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
        success: true,
        token,
        user: Array.isArray(data)
            ? Object.assign(Object.assign({}, data[0]), { Token: undefined, TokenExpire: undefined, password: undefined }) : Object.assign(Object.assign({}, data), { Token: undefined, TokenExpire: undefined, password: undefined })
    });
});
exports.default = sendTokenResponse;
