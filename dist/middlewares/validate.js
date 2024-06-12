"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = __importDefault(require("../constants/HttpStatusCodes"));
const core_errorResponse_1 = __importDefault(require("../core/core.errorResponse"));
const pick_1 = __importDefault(require("../util/pick"));
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const obj = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(obj);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new core_errorResponse_1.default(HttpStatusCodes_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
