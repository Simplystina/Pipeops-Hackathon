"use strict";
/**
 * Setup express server.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("express-async-errors");
const EnvVars_1 = __importDefault(require("./constants/EnvVars"));
const misc_1 = require("./constants/misc");
const core_error_1 = __importDefault(require("./core/core.error"));
const routes_1 = require("./routes");
const orderController_1 = __importDefault(require("./controller/orderController"));
// **** Variables **** //
const app = (0, express_1.default)();
// **** Setup **** //
// Basic middleware
//Server Security Middlewre
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
// Show routes called in console during development
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Dev.valueOf()) {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Production.valueOf()) {
    //app.use(helmet());
}
app.all('/', (req, res) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
        success: true,
        status: 'success',
        message: `Welcome to ${process.env.NAME} Backend`,
        version: '0.0.1',
        developer: 'https://github.com/Simplystina/Pipeops-Hackathon-Backend',
        health: "Completely Set Up!, 100% We're Ready To Go",
        server_time: `${new Date()}`,
        data: Object.assign(Object.assign({}, req.body), req.query)
    });
});
app.post('/paystack/webhook', orderController_1.default.checkOrderStatus);
// Add APIs, must be after middleware
app.use('/v1/auth', routes_1.AuthRoute);
app.use('/v1/super', routes_1.SuperRoute);
app.use('/v1/business', routes_1.BusinessRoute);
app.use('/v1/order', routes_1.OrderRoute);
app.use('/v1/users', routes_1.UserRoute);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        status: 'Resource Not Found',
        error: '404 Content Do Not Exist Or Has Been Deleted'
    });
});
app.use(core_error_1.default);
process.on('uncaughtException', (err) => {
    console.error(err);
    console.log('Node NOT Exiting...'); // Override Grace full exist [EXPERIMENTAL]
});
module.exports = app;
exports.default = app;
