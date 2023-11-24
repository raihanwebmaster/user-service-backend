"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code, description) {
        super(message);
        this.code = code;
        this.description = description;
    }
}
exports.CustomError = CustomError;
