"use strict";
/**
 * Miscellaneous shared classes go here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error with status code and message
 */
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.default = ErrorResponse;
