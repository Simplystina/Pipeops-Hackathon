"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const userSchema = new Schema<IUser>(userSchemaFields, { timestamps: true });
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your Email address'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'Please enter a valid Email address'
        ]
    },
    phone: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, 'Please A Valid Password is Required'],
        select: false
    },
    image: {
        type: String,
        default: null
    },
    thumbnail: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String
    },
    stateOfOrigin: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    localGovtOfOrigin: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    stateOfResidence: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    localGovtOfResidence: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    address: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        enum: {
            values: ['user', 'admin', 'super'],
            message: "Chose One ['user', 'admin','super']"
        },
        required: [true, 'Please User is Required'],
        default: 'user'
    },
    TokenExpire: {
        type: Number,
        select: false
    },
    isEmailVerified: {
        type: Boolean,
        required: [true, 'Used to Know If Email Is Verified, State is Required'],
        default: false
    },
    hasPasswordChanged: {
        type: Boolean,
        default: false
    },
    Token: {
        type: Number,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpire: { type: Number, select: false }
}, { timestamps: true });
// Encrypt password using Bcrypt
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto_1.default.randomBytes(20).toString('hex');
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto_1.default
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({
        user_id: this._id
    }, process.env.JWT_SECRET);
};
//const UserModel = mongoose.model<User>('Users', userSchema);
// Create the model
const UserModel = mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
