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
exports.connectDB = exports.connect = void 0;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.connect = mongoose.connection;
mongoose.set('strictQuery', true);
const MODE = process.env.NODE_ENV === 'production';
const serverURl = process.env.MONGO_URL || 'mongodb://localhost:27017/my_database';
/**
 * Mongodb Connector
 * @param {string} [url] Mongodb Url `Optional`
 */
const connectDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (serverUrl = serverURl) {
    exports.connect.on('connected', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('MongoDB Connection Established, Running in ' + process.env.NODE_ENV);
    }));
    exports.connect.on('reconnected', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('MongoDB Connection Reestablished');
    }));
    exports.connect.on('disconnected', () => {
        console.log('Mongo Connection Disconnected');
        console.log('Trying to reconnect to Mongo ...');
        setTimeout(() => {
            mongoose.connect(serverUrl, {
                useUnifiedTopology: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            });
        }, 3000);
    });
    exports.connect.on('close', () => {
        console.log('Mongo Connection Closed');
    });
    exports.connect.on('error', (error) => {
        console.log('Mongo Connection ERROR: ' + error);
    });
    yield mongoose
        .connect(serverUrl, {
        useUnifiedTopology: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000
    })
        .catch((error) => console.log(error));
});
exports.connectDB = connectDB;
exports = { connectDB: exports.connectDB, connect: exports.connect };
