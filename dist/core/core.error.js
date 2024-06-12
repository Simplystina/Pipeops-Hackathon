"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_errorResponse_1 = __importDefault(require("./core.errorResponse"));
const HttpStatusCodes_1 = __importDefault(require("../constants/HttpStatusCodes"));
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (process.env.MODE !== 'production') {
        console.log(err.name);
        // console.log(err);
    }
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `I am Not A Teapot ${Object.values(err.errors).map((val) => `${val.path} : ${val.value}`)}`;
        error = new core_errorResponse_1.default(HttpStatusCodes_1.default.BAD_REQUEST, message);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new core_errorResponse_1.default(400, message);
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new core_errorResponse_1.default(400, message[0]);
    }
    // Mongoose validation error Cause By Foregin Key (This would Over The Pervious Validation)
    //TODO: fix or implenment
    // if (err.name === 'ValidationError') {
    //   console.log(err.errors);
    //   const message = Object.values(err.errors).map((val) => val.message);
    //   error = new ErrorResponse(message, 400);
    // }
    return res.status(error.status || 500).json({
        success: false,
        status: 'error',
        error: error.message || 'Server Error'
    });
};
exports.default = errorHandler;
