export type IUser = {
    email: string,
    phone: string;
    password: string;
    image: string | null;
    thumbnail: string | null;
    role: 'user' | 'admin' | 'super'| 'business';
    TokenExpire: number | null;
    Token: number | null;
    resetPasswordToken: string | null;
    resetPasswordExpire: number | null;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    getResetPasswordToken: () => string;
    getSignedJwtToken: () => string;
    toJSON: () => any; 
}