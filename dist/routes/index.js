"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperRoute = exports.BusinessRoute = exports.AuthRoute = void 0;
var authRoute_1 = require("./authRoute");
Object.defineProperty(exports, "AuthRoute", { enumerable: true, get: function () { return __importDefault(authRoute_1).default; } });
var businessRoute_1 = require("./businessRoute");
Object.defineProperty(exports, "BusinessRoute", { enumerable: true, get: function () { return __importDefault(businessRoute_1).default; } });
var superRoute_1 = require("./superRoute");
Object.defineProperty(exports, "SuperRoute", { enumerable: true, get: function () { return __importDefault(superRoute_1).default; } });
