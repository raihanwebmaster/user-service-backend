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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const validateHobbiesLength = function (hobbies) {
    return hobbies.length >= 2;
};
const userFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'First Name can not be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        maxlength: [20, 'Last Name can not be more than 20 characters'],
    },
});
const userAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'street is required'],
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'city is required'],
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'country is required'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        maxlength: [25, 'productName can not be more than 25 characters'],
    },
    price: Number,
    quantity: Number,
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'User id  is required'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
    },
    password: { type: String, required: [true, 'password is requeired'] },
    fullName: {
        type: userFullNameSchema,
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is requried'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        required: [true, 'hobbies is required'],
        validate: [validateHobbiesLength, 'At least two hobbies are required'],
    },
    address: {
        type: userAddressSchema,
        required: [true, 'address is required'],
    },
    orders: [orderSchema],
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hashing password and save into DB
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
// export const User = model<IUser, UserModel>('User', userSchema);
