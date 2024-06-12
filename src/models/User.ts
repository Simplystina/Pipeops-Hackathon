
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  email: string,
  phone: string;
  password: string;
  image: string | null;
  thumbnail: string | null;
  role: 'user' | 'admin' | 'super'| 'business';
  stateOfOrigin: string | null; address: string | null;
  businesQrCode: string | null;
  businessName: string | null;
  businessLogo: string | null;
  localGovtOfOrigin: string | null;
  stateOfResidence: string | null;
  localGovtOfResidence: string | null;
  hasPasswordChanged: boolean
  TokenExpire: number | null;
  Token: number | null;
  resetPasswordToken: string | null;
  resetPasswordExpire: number | null;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
  getSignedJwtToken: () => string;
}
interface IUserMethods {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
  getSignedJwtToken: () => string;
}
type UserModel = IUser & IUserMethods;

//const userSchema = new Schema<IUser>(userSchemaFields, { timestamps: true });
const userSchema: Schema<IUser> = new Schema({
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
  businessName: {
    type: String,
    default: null
  },
   businesQrCode:{
    type: String
    },
  businessLogo: {
      type: String,
      default: null
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
      values: ['user', 'admin', 'super','business'],
      message: "Chose One ['user', 'admin','super','business']"
    },
    required: [true, 'Please User is Required'],
    default: 'business'
  },
  TokenExpire: {
    type: Number,
    select: false
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
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id
    },
    process.env.JWT_SECRET!
  );
};

//const UserModel = mongoose.model<User>('Users', userSchema);
// Create the model
const UserModel = mongoose.model<IUser>('User', userSchema)
export default UserModel
